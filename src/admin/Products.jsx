import React, { useEffect, useMemo, useRef, useState } from "react";
import { tokens, img, naira } from "../theme.js";
import { CATEGORIES, TYPES, DIETARY, OCCASIONS } from "../data.js";
import { Plus, Search, ChevronLeft, ImagePlus, Trash2 } from "../icons.jsx";
import { listProducts, saveProduct, deleteProduct, uploadImage } from "../api.js";
import { Button, Card, Chips, Empty, Field, Input, Notice, PageTitle, Select, TextArea, Toggle, useToast, font } from "./ui.jsx";

const thumb = (photo, size) => (photo ? img(photo, size, size) : null);

/* ======================================================================== *
 * The list
 * ======================================================================== */

export function ProductList() {
  const toast = useToast();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [show, setShow] = useState("all"); // all | soldOut | hidden

  useEffect(() => {
    listProducts().then(setProducts).catch((err) => setError(err.message));
  }, []);

  // Switches save straight away; if the save fails the switch flips back.
  const quickSave = async (product, patch, message) => {
    const next = { ...product, ...patch };
    setProducts((list) => list.map((p) => (p.id === product.id ? next : p)));
    try {
      await saveProduct(next, { isNew: false });
      toast(message);
    } catch (err) {
      setProducts((list) => list.map((p) => (p.id === product.id ? product : p)));
      toast(err.message, "error");
    }
  };

  const shown = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (products || []).filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (show === "soldOut" && !p.soldOut) return false;
      if (show === "hidden" && !p.hidden) return false;
      return !term || p.title.toLowerCase().includes(term);
    });
  }, [products, query, category, show]);

  return (
    <>
      <PageTitle
        title="Products"
        sub={products ? `${products.length} on the menu` : "Loading…"}
        action={
          <Button as="a" href="#/admin/products/new">
            <Plus size={17} /> Add product
          </Button>
        }
      />

      {error && <Notice tone="pink">{error}</Notice>}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <Search size={17} color={tokens.inkSoft} style={{ position: "absolute", left: 13, top: 15 }} />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a product" aria-label="Find a product" style={{ paddingLeft: 40 }} />
        </div>
        <Select value={show} onChange={(e) => setShow(e.target.value)} aria-label="Show" style={{ flex: "0 1 190px" }}>
          <option value="all">Everything</option>
          <option value="soldOut">Only sold out</option>
          <option value="hidden">Only hidden</option>
        </Select>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 14 }}>
        {["All", ...CATEGORIES].map((c) => {
          const on = c === category;
          return (
            <button key={c} type="button" onClick={() => setCategory(c)} style={{ flexShrink: 0, fontFamily: font, fontWeight: 600, fontSize: 14, padding: "9px 15px", borderRadius: 999, cursor: "pointer", border: `1.5px solid ${on ? tokens.pink : tokens.line}`, background: on ? tokens.pink : tokens.paper, color: on ? tokens.onDark : tokens.ink }}>
              {c}
            </button>
          );
        })}
      </div>

      {products && shown.length === 0 && <Empty title="Nothing here">Try another category or search word.</Empty>}

      {shown.length > 0 && (
        <div style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, overflow: "hidden" }}>
          {shown.map((p, i) => (
            <div key={p.id} className="adm-row adm-prow" style={{ display: "grid", gridTemplateColumns: "60px 1fr auto auto", gap: "10px 16px", alignItems: "center", padding: "12px 16px", borderTop: i ? `1px solid ${tokens.base}` : "none", opacity: p.hidden ? 0.6 : 1 }}>
              <a href={`#/admin/products/${p.id}`} style={{ display: "block", width: 56, height: 56, borderRadius: 12, overflow: "hidden", background: tokens.pinkPale }}>
                {p.photo && <img src={thumb(p.photo, 120)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
              </a>
              <a href={`#/admin/products/${p.id}`} style={{ minWidth: 0, textDecoration: "none" }}>
                <span style={{ display: "block", fontFamily: font, fontWeight: 700, fontSize: 15, color: tokens.ink }}>{p.title}</span>
                <span style={{ display: "block", fontFamily: font, fontSize: 13, color: tokens.inkSoft, marginTop: 2 }}>
                  {p.category} · <strong style={{ color: tokens.pinkDeep }}>{naira(p.price)}</strong> {p.unit || ""}
                  {p.soldOut && <span style={{ marginLeft: 8, color: tokens.pinkDeep, fontWeight: 700 }}>SOLD OUT</span>}
                  {p.hidden && <span style={{ marginLeft: 8, fontWeight: 700 }}>HIDDEN</span>}
                </span>
              </a>
              <div className="adm-prow-switches" style={{ display: "flex", gap: 18, justifyContent: "flex-end" }}>
                <Toggle compact label="Sold out" checked={!!p.soldOut} onChange={(v) => quickSave(p, { soldOut: v }, v ? `${p.title} marked sold out` : `${p.title} is back on sale`)} />
                <Toggle compact label="On website" checked={!p.hidden} onChange={(v) => quickSave(p, { hidden: !v }, v ? `${p.title} is showing on the website` : `${p.title} is hidden from the website`)} />
              </div>
              <Button as="a" href={`#/admin/products/${p.id}`} variant="secondary" style={{ minHeight: 40, padding: "8px 16px", fontSize: 14 }}>
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ======================================================================== *
 * Add / edit
 * ======================================================================== */

const NOTICE_OPTIONS = [
  { days: 0, label: "Same day" },
  { days: 1, label: "1 day" },
  { days: 2, label: "2 days" },
  { days: 3, label: "3 days" },
  { days: 5, label: "5 days" },
  { days: 7, label: "1 week" },
  { days: 14, label: "2 weeks" },
];

const UNIT_SUGGESTIONS = ["each", "per tray", "per plate", "per bowl", "per dozen", "per tin", "per pack", "per cooler", "per bottle", "per loaf"];

const BLANK = {
  id: "",
  title: "",
  category: "Cakes",
  desc: "",
  price: "",
  compareAt: "",
  unit: "",
  photo: "",
  ratio: "1/1",
  tags: [],
  occasions: [],
  leadDays: 0,
  sameDay: true,
  personalisable: false,
  featured: false,
  soldOut: false,
  hidden: false,
};

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

const toggleIn = (list, v) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function ProductEditor({ id }) {
  const toast = useToast();
  const isNew = !id;
  const [form, setForm] = useState(isNew ? BLANK : null);
  const [original, setOriginal] = useState(isNew ? BLANK : null);
  const [allIds, setAllIds] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadError, setLoadError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    listProducts()
      .then((list) => {
        setAllIds(list.map((p) => p.id));
        if (!isNew) {
          const found = list.find((p) => p.id === id);
          if (!found) return setLoadError("We couldn't find that product. It may have been deleted.");
          const loaded = { ...BLANK, ...found, compareAt: found.compareAt ?? "" };
          setForm(loaded);
          setOriginal(loaded);
        }
      })
      .catch((err) => setLoadError(err.message));
  }, [id, isNew]);

  const dirty = form && original && JSON.stringify(form) !== JSON.stringify(original);

  // Warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  if (loadError) {
    return (
      <>
        <BackLink />
        <Empty title="Can't open this product">{loadError}</Empty>
      </>
    );
  }
  if (!form) return <p style={{ fontFamily: font, color: tokens.inkSoft }}>Loading…</p>;

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const isCake = form.category === "Cakes";

  const pickPhoto = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast("Please choose a photo.", "error");
    setUploading(true);
    try {
      set({ photo: await uploadImage(file) });
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Give the product a name.";
    const price = Number(form.price);
    if (!price || price <= 0) e.price = "Enter a price in naira, e.g. 25000.";
    if (form.compareAt !== "" && Number(form.compareAt) <= price) e.compareAt = "The old price should be higher than the new one, or leave it empty.";
    if (!form.photo) e.photo = "Add a photo — products without one look broken on the website.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return toast("Some details need fixing.", "error");
    setSaving(true);
    let productId = form.id;
    if (isNew) {
      const base = slugify(form.title) || "product";
      productId = base;
      for (let n = 2; allIds.includes(productId); n++) productId = `${base}-${n}`;
    }
    const product = {
      ...form,
      id: productId,
      title: form.title.trim(),
      desc: form.desc.trim(),
      unit: form.unit.trim() || undefined,
      price: Math.round(Number(form.price)),
      compareAt: form.compareAt === "" ? undefined : Math.round(Number(form.compareAt)),
      leadDays: Number(form.leadDays),
      sameDay: Number(form.leadDays) === 0,
      personalisable: isCake && form.personalisable,
    };
    try {
      await saveProduct(product, { isNew });
      const clean = { ...BLANK, ...product, compareAt: product.compareAt ?? "", unit: product.unit ?? "" };
      setOriginal(clean);
      setForm(clean);
      toast(isNew ? "Product added" : "Changes saved");
      if (isNew) window.location.hash = `/admin/products/${productId}`;
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    try {
      await deleteProduct(form.id);
      toast(`${form.title} deleted`);
      window.location.hash = "/admin/products";
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <>
      <PageTitle back={<BackLink />} title={isNew ? "Add a product" : form.title || "Edit product"} sub={isNew ? "Fill this in and it goes straight onto the website." : undefined} />

      <div className="adm-editor" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 18, alignItems: "start" }}>
        {/* ---- photo ---- */}
        <Card title="Photo" hint="A clear, bright photo on a plain background sells best. Photos from your phone are fine.">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              pickPhoto(e.dataTransfer.files[0]);
            }}
            onClick={() => fileRef.current?.click()}
            style={{ position: "relative", aspectRatio: "1/1", borderRadius: 14, overflow: "hidden", cursor: "pointer", background: tokens.pinkPale, border: `2px dashed ${errors.photo ? tokens.pink : tokens.line}`, display: "grid", placeItems: "center" }}
          >
            {form.photo ? (
              <img src={img(form.photo, 700, 700)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ textAlign: "center", fontFamily: font, fontSize: 14, color: tokens.inkSoft, padding: 20 }}>
                <ImagePlus size={34} color={tokens.pink} />
                <span style={{ display: "block", fontWeight: 700, color: tokens.ink, marginTop: 8 }}>Tap to add a photo</span>
                <span style={{ display: "block", marginTop: 2 }}>or drag one here</span>
              </span>
            )}
            {uploading && <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(255,255,255,0.8)", fontFamily: font, fontWeight: 700, color: tokens.ink }}>Uploading…</span>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pickPhoto(e.target.files[0])} />
          {errors.photo && <p style={{ fontFamily: font, fontSize: 12.5, color: tokens.pinkDeep, fontWeight: 600, margin: "8px 0 0" }}>{errors.photo}</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => fileRef.current?.click()} style={{ flex: 1 }}>
              <ImagePlus size={17} /> {form.photo ? "Change photo" : "Choose photo"}
            </Button>
            {form.photo && (
              <Button variant="danger" onClick={() => set({ photo: "" })} aria-label="Remove photo">
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        </Card>

        <div style={{ display: "grid", gap: 18 }}>
          {/* ---- basics ---- */}
          <Card title="The basics">
            <Field label="Name" htmlFor="p-title" error={errors.title}>
              <Input id="p-title" value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Red Velvet Birthday Cake" maxLength={60} />
            </Field>
            <div className="adm-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Category" htmlFor="p-cat">
                <Select id="p-cat" value={form.category} onChange={(e) => set({ category: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Notice needed" htmlFor="p-notice" hint="How far ahead customers must order.">
                <Select id="p-notice" value={form.leadDays} onChange={(e) => set({ leadDays: Number(e.target.value) })}>
                  {NOTICE_OPTIONS.map((o) => (
                    <option key={o.days} value={o.days}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field label="Description" htmlFor="p-desc" hint={`${form.desc.length}/220 — one or two sentences about taste, size or what's included.`}>
              <TextArea id="p-desc" value={form.desc} maxLength={220} onChange={(e) => set({ desc: e.target.value })} placeholder="Soft red velvet sponge with cream cheese frosting." />
            </Field>
          </Card>

          {/* ---- price ---- */}
          <Card title="Price" hint={isCake ? "For cakes, enter the 6-inch price. 8- and 10-inch prices are worked out automatically." : undefined}>
            <div className="adm-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <Field label="Price (₦)" htmlFor="p-price" error={errors.price}>
                <Input id="p-price" type="number" inputMode="numeric" min="0" step="50" value={form.price} onChange={(e) => set({ price: e.target.value })} placeholder="25000" />
              </Field>
              <Field label="Old price (₦)" htmlFor="p-compare" error={errors.compareAt} hint="Optional. Shows as a discount.">
                <Input id="p-compare" type="number" inputMode="numeric" min="0" step="50" value={form.compareAt} onChange={(e) => set({ compareAt: e.target.value })} />
              </Field>
              <Field label="Sold" htmlFor="p-unit" hint={isCake ? "Leave empty for cakes." : "e.g. each, per tray"}>
                <Input id="p-unit" list="unit-suggestions" value={form.unit} onChange={(e) => set({ unit: e.target.value })} placeholder={isCake ? "" : "per tray"} />
                <datalist id="unit-suggestions">
                  {UNIT_SUGGESTIONS.map((u) => (
                    <option key={u} value={u} />
                  ))}
                </datalist>
              </Field>
            </div>
            {Number(form.price) > 0 && (
              <p style={{ fontFamily: font, fontSize: 13.5, color: tokens.inkSoft, margin: 0 }}>
                Customers will see{" "}
                <strong style={{ color: tokens.pinkDeep }}>
                  {isCake ? "From " : ""}
                  {naira(Math.round(Number(form.price)))}
                </strong>{" "}
                {form.unit}
                {form.compareAt !== "" && Number(form.compareAt) > Number(form.price) && <s style={{ marginLeft: 6 }}>{naira(Math.round(Number(form.compareAt)))}</s>}
              </p>
            )}
          </Card>

          {/* ---- on the website ---- */}
          <Card title="On the website">
            <Toggle label="Sold out today" hint="Customers can still see it but can't add it to their order." checked={form.soldOut} onChange={(v) => set({ soldOut: v })} />
            <Toggle label="Show on the website" hint="Turn off to hide it completely without deleting it." checked={!form.hidden} onChange={(v) => set({ hidden: !v })} />
            <Toggle label="Feature it" hint="Gets a 'Featured' label and priority on the homepage." checked={form.featured} onChange={(v) => set({ featured: v })} />
            {isCake && <Toggle label="Customers can personalise it" hint="Lets them add a message and a reference photo." checked={form.personalisable} onChange={(v) => set({ personalisable: v })} />}
          </Card>

          {/* ---- tags ---- */}
          <Card title="Helps customers find it" hint="Tap everything that applies. These power the filters in the shop.">
            <Field label="Good for">
              <Chips options={OCCASIONS.map((o) => ({ value: o.id, label: o.label }))} selected={form.occasions} onToggle={(v) => set({ occasions: toggleIn(form.occasions, v) })} />
            </Field>
            <Field label="Type">
              <Chips options={TYPES} selected={form.tags} onToggle={(v) => set({ tags: toggleIn(form.tags, v) })} />
            </Field>
            <Field label="Dietary">
              <Chips options={DIETARY} selected={form.tags} onToggle={(v) => set({ tags: toggleIn(form.tags, v) })} />
            </Field>
          </Card>

          {!isNew && (
            <Card title="Delete this product" hint="This removes it for good. To take it off the website for a while, turn off 'Show on the website' instead.">
              {confirmDelete ? (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Button variant="dangerSolid" onClick={remove}>
                    <Trash2 size={16} /> Yes, delete {form.title}
                  </Button>
                  <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
                    Keep it
                  </Button>
                </div>
              ) : (
                <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                  <Trash2 size={16} /> Delete product
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* sticky save bar */}
      <div className="adm-savebar" style={{ position: "fixed", left: 248, right: 0, bottom: 0, zIndex: 250, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)", borderTop: `1px solid ${tokens.line}`, padding: "12px 16px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontFamily: font, fontSize: 13.5, fontWeight: 600, color: dirty ? tokens.goldDeep : tokens.inkSoft }}>{dirty ? "Unsaved changes" : isNew ? "" : "All changes saved"}</span>
          <div style={{ display: "flex", gap: 10 }}>
            <Button as="a" href="#/admin/products" variant="secondary">
              {dirty ? "Cancel" : "Done"}
            </Button>
            <Button onClick={save} disabled={saving || (!dirty && !isNew)}>
              {saving ? "Saving…" : isNew ? "Add product" : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function BackLink() {
  return (
    <a href="#/admin/products" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: font, fontWeight: 600, fontSize: 14, color: tokens.inkSoft, textDecoration: "none", marginBottom: 8 }}>
      <ChevronLeft size={16} /> All products
    </a>
  );
}
