import React, { useEffect, useState } from "react";
import { tokens } from "../theme.js";
import { fmtHour } from "../data.js";
import { PREVIEW_MODE, getSettings, saveSettings, resetPreviewData } from "../api.js";
import { Button, Card, Field, Input, Notice, PageTitle, Select, TextArea, useToast, font } from "./ui.jsx";

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, h) => h);

export default function Settings() {
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [original, setOriginal] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    getSettings()
      .then((s) => {
        setForm(s);
        setOriginal(s);
      })
      .catch((err) => toast(err.message, "error"));
  }, [toast]);

  if (!form) return <p style={{ fontFamily: font, color: tokens.inkSoft }}>Loading…</p>;

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const dirty = JSON.stringify(form) !== JSON.stringify(original);

  const save = async () => {
    const e = {};
    const wa = String(form.whatsappNumber).replace(/\D/g, "");
    if (!/^234\d{10}$/.test(wa)) e.whatsappNumber = "Use the full number starting with 234 and no leading 0, e.g. 2348104870450.";
    if (!form.phoneDisplay.trim()) e.phoneDisplay = "Add the phone number customers should call.";
    if (!form.address.trim()) e.address = "Add the shop address.";
    if (Number(form.closeHour) <= Number(form.openHour)) e.closeHour = "Closing time should be after opening time.";
    setErrors(e);
    if (Object.keys(e).length) return toast("Some details need fixing.", "error");

    const clean = {
      ...form,
      whatsappNumber: wa,
      instagram: form.instagram.replace(/^@/, "").trim(),
      tiktok: form.tiktok.replace(/^@/, "").trim(),
      openHour: Number(form.openHour),
      closeHour: Number(form.closeHour),
    };
    setSaving(true);
    try {
      await saveSettings(clean);
      setForm(clean);
      setOriginal(clean);
      toast("Shop details saved");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Shop details"
        sub="What customers see across the website. Changes show after they refresh."
        action={
          <Button onClick={save} disabled={!dirty || saving}>
            {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </Button>
        }
      />

      <div style={{ display: "grid", gap: 18, maxWidth: 760 }}>
        <Card title="Announcement bar" hint="The pink strip across the top of every page. Leave it empty to hide it.">
          <Field label="Message" htmlFor="s-ann" hint={`${form.announcement.length}/70`}>
            <Input id="s-ann" value={form.announcement} maxLength={70} onChange={(e) => set({ announcement: e.target.value })} placeholder="e.g. Valentine's cakes — order by 12 February" />
          </Field>
        </Card>

        <Card title="How customers reach you">
          <div className="adm-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Phone number (as shown)" htmlFor="s-phone" error={errors.phoneDisplay}>
              <Input id="s-phone" type="tel" value={form.phoneDisplay} onChange={(e) => set({ phoneDisplay: e.target.value })} placeholder="0810 487 0450" />
            </Field>
            <Field label="WhatsApp number" htmlFor="s-wa" error={errors.whatsappNumber} hint="Starts with 234, no spaces. Orders go here.">
              <Input id="s-wa" type="tel" inputMode="numeric" value={form.whatsappNumber} onChange={(e) => set({ whatsappNumber: e.target.value })} placeholder="2348104870450" />
            </Field>
            <Field label="Instagram username" htmlFor="s-ig">
              <Input id="s-ig" value={form.instagram} onChange={(e) => set({ instagram: e.target.value })} placeholder="ceoanniecakes" />
            </Field>
            <Field label="TikTok username" htmlFor="s-tt">
              <Input id="s-tt" value={form.tiktok} onChange={(e) => set({ tiktok: e.target.value })} placeholder="anniecakes" />
            </Field>
          </div>
        </Card>

        <Card title="The shop">
          <Field label="Address" htmlFor="s-addr" error={errors.address}>
            <Input id="s-addr" value={form.address} onChange={(e) => set({ address: e.target.value })} />
          </Field>
          <Field label="How to find it" htmlFor="s-landmark" hint="A landmark or directions, shown next to the map.">
            <TextArea id="s-landmark" rows={2} value={form.landmark} onChange={(e) => set({ landmark: e.target.value })} />
          </Field>
          <div className="adm-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Opens at" htmlFor="s-open">
              <Select id="s-open" value={form.openHour} onChange={(e) => set({ openHour: Number(e.target.value) })}>
                {HOUR_OPTIONS.map((h) => (
                  <option key={h} value={h}>
                    {fmtHour(h)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Closes at" htmlFor="s-close" error={errors.closeHour}>
              <Select id="s-close" value={form.closeHour} onChange={(e) => set({ closeHour: Number(e.target.value) })}>
                {HOUR_OPTIONS.map((h) => (
                  <option key={h} value={h}>
                    {fmtHour(h)}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </Card>

        {PREVIEW_MODE && (
          <Card title="Preview data" hint="For testing only. Puts every product, setting and test order back to how the website shipped.">
            <Notice>This button disappears once the real backend is connected.</Notice>
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {confirmReset ? (
                <>
                  <Button
                    variant="dangerSolid"
                    onClick={() => {
                      resetPreviewData();
                      window.location.reload();
                    }}
                  >
                    Yes, reset everything
                  </Button>
                  <Button variant="secondary" onClick={() => setConfirmReset(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="danger" onClick={() => setConfirmReset(true)}>
                  Reset preview data
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
