import { useState } from "react";
import { ArrayOfObjectsInput, useClient, set } from "sanity";
import { Button } from "@sanity/ui";

const MAX_EDGE = 2000;
const QUALITY = 0.85;

async function resizeImage(file) {
  if (!file.type.startsWith("image/")) return file;

  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file;
  }

  const { width, height } = bitmap;
  const longest = Math.max(width, height);
  if (longest <= MAX_EDGE) {
    bitmap.close?.();
    return file;
  }

  const scale = MAX_EDGE / longest;
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", QUALITY)
  );
  if (!blob) return file;

  const base = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${base}.webp`, { type: "image/webp" });
}

export default function GalleryInput(props) {
  const { value, onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const resized = await Promise.all(files.map(resizeImage));
      const uploads = await Promise.all(
        resized.map((file) =>
          client.assets.upload("image", file, {
            filename: file.name,
            title: file.name,
          })
        )
      );

      const newItems = uploads.map((asset) => ({
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        crop: { top: 0, bottom: 0, left: 0, right: 0 },
        hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 },
      }));

      const current = Array.isArray(value) ? value : [];
      onChange(set([...current, ...newItems]));
    } catch (err) {
      console.error("Gallery upload failed:", err);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  // Render the native array UI (reorder, captions, hotspot, delete) and
  // strip `components` so it doesn't recurse into this input again.
  const { components, ...rest } = props;

  return (
    <div>
      <ArrayOfObjectsInput {...rest} />
      {!readOnly && (
        <Button
          as="label"
          mode="ghost"
          tone="primary"
          disabled={uploading}
          style={{ marginTop: 8 }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            style={{ display: "none" }}
          />
          {uploading ? "Uploading…" : "Upload multiple images"}
        </Button>
      )}
    </div>
  );
}
