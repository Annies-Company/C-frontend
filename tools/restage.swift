// Lifts the subject out of a photo with Apple's Vision framework (the same
// model as "Lift subject from background" in Photos) and places it on a
// soft blush backdrop that matches the website.
//
// Run it through `npm run photos` (see tools/restage-photos.sh), or directly:
//   swift tools/restage.swift <input> <output.jpg> [blush|cream|white]
import AppKit
import CoreImage
import CoreImage.CIFilterBuiltins
import Vision

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("usage: swift tools/restage.swift <input> <output.jpg> [blush|cream|white]")
    exit(1)
}
let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])
let style = args.count > 3 ? args[3] : "blush"

guard let source = CIImage(contentsOf: inputURL, options: [.applyOrientationProperty: true]) else {
    print("Could not read \(args[1])"); exit(1)
}
let image = source.transformed(by: CGAffineTransform(translationX: -source.extent.origin.x, y: -source.extent.origin.y))

// 1. find the subject
let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: image)
do { try handler.perform([request]) } catch { print("Vision failed: \(error)"); exit(1) }
guard let result = request.results?.first, !result.allInstances.isEmpty else {
    print("No clear subject found in \(args[1]) — skipped"); exit(2)
}
let maskBuffer = try! result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
var mask = CIImage(cvPixelBuffer: maskBuffer)
// soften the cut edge a touch so it doesn't look pasted on
mask = mask.applyingGaussianBlur(sigma: 1.2).cropped(to: image.extent)

// 2. crop to the subject with breathing room, as a square
var bounds = CGRect.null
if let cg = CIContext().createCGImage(mask, from: mask.extent) {
    let w = cg.width, h = cg.height
    let data = CFDataGetBytePtr(cg.dataProvider!.data)!
    let bpp = cg.bitsPerPixel / 8, row = cg.bytesPerRow
    var minX = w, minY = h, maxX = 0, maxY = 0
    for y in stride(from: 0, to: h, by: 2) {
        for x in stride(from: 0, to: w, by: 2) where data[y * row + x * bpp] > 128 {
            minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y)
        }
    }
    // CGImage rows run top-down; CIImage y runs bottom-up
    bounds = CGRect(x: minX, y: h - maxY, width: maxX - minX, height: maxY - minY)
}
let side = max(bounds.width, bounds.height) * 1.22
let canvas = CGRect(x: bounds.midX - side / 2, y: bounds.midY - side / 2 - side * 0.02, width: side, height: side)

// 3. backdrop: a soft radial glow, lighter behind the subject
let colours: (CIColor, CIColor) = {
    switch style {
    case "cream": return (CIColor(red: 1.0, green: 0.976, blue: 0.953), CIColor(red: 0.984, green: 0.925, blue: 0.855))
    case "white": return (CIColor(red: 1, green: 1, blue: 1), CIColor(red: 0.992, green: 0.965, blue: 0.973))
    default: return (CIColor(red: 0.996, green: 0.953, blue: 0.969), CIColor(red: 0.957, green: 0.788, blue: 0.847))
    }
}()
let glow = CIFilter.radialGradient()
glow.center = CGPoint(x: canvas.midX, y: canvas.midY + side * 0.05)
glow.radius0 = Float(side * 0.15)
glow.radius1 = Float(side * 0.85)
glow.color0 = colours.0
glow.color1 = colours.1
let backdrop = glow.outputImage!.cropped(to: canvas)

// 4. a soft floor shadow under the subject
let shadow = CIFilter.radialGradient()
shadow.center = CGPoint(x: bounds.midX, y: bounds.minY + bounds.height * 0.02)
shadow.radius0 = 0
shadow.radius1 = Float(bounds.width * 0.55)
shadow.color0 = CIColor(red: 0.37, green: 0.07, blue: 0.2, alpha: 0.28)
shadow.color1 = CIColor(red: 0.37, green: 0.07, blue: 0.2, alpha: 0)
let squash = CGAffineTransform(translationX: 0, y: bounds.minY).scaledBy(x: 1, y: 0.16).translatedBy(x: 0, y: -bounds.minY)
let floor = shadow.outputImage!.transformed(by: squash).cropped(to: canvas)

// 5. composite
let blend = CIFilter.blendWithMask()
blend.inputImage = image
blend.backgroundImage = floor.composited(over: backdrop)
blend.maskImage = mask
let composed = blend.outputImage!.cropped(to: canvas)
let final = composed.transformed(by: CGAffineTransform(translationX: -canvas.minX, y: -canvas.minY))

let ctx = CIContext()
let out = min(1600.0, final.extent.width)
// drop the camera metadata — iPhone photos carry the GPS location they were taken at
let scaled = final.transformed(by: CGAffineTransform(scaleX: out / final.extent.width, y: out / final.extent.width)).settingProperties([:])
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB),
      let jpeg = ctx.jpegRepresentation(of: scaled, colorSpace: colorSpace, options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.88]) else {
    print("Could not encode"); exit(1)
}
try! jpeg.write(to: outputURL)
print("Saved \(args[2])")
