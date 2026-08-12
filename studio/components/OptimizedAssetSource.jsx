import { useState } from "react";
import { useClient } from "sanity";
import { resizeImage } from "../lib/resizeImage";

// Custom asset source used for the native "Add item" (Browse) upload path.
// Pre-resizes the chosen file (longest edge 2000px, WebP 0.85) before handing
// it to Sanity, so images added this way are optimized just like the bulk upload.
export default function OptimizedAssetSource(props) {
  const { assetType = "image", onClose, onSelect } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const [busy, setBusy] = useState(false);

  const handleFiles = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    try {
      const resized = await resizeImage(file);
      const asset = await client.assets.upload(
        assetType === "file" ? "file" : "image",
        resized,
        {
          filename: resized.name,
          title: resized.name,
        }
      );
      onSelect([{ kind: "assetDocumentId", value: asset._id }]);
    } catch (err) {
      console.error("Optimized upload failed:", err);
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <p style={{ marginBottom: 12 }}>
        Upload an image — it&apos;s automatically optimized (resized to 2000px,
        WebP) before upload.
      </p>
      <input
        type="file"
        accept={assetType === "file" ? undefined : "image/*"}
        disabled={busy}
        onChange={handleFiles}
      />
      {busy && <p style={{ marginTop: 12 }}>Optimizing &amp; uploading…</p>}
    </div>
  );
}
