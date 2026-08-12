import { useState } from "react";
import { ArrayOfObjectsInput, useClient, set } from "sanity";
import { Button } from "@sanity/ui";
import { resizeImage } from "../lib/resizeImage";

function randomKey() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export default function GalleryInput(props) {
  const { value, onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      setStatus(`Optimizing ${files.length} image${files.length > 1 ? "s" : ""}…`);
      const resized = await Promise.all(files.map(resizeImage));

      let completed = 0;
      const uploads = await Promise.all(
        resized.map((file) =>
          client.assets
            .upload("image", file, {
              filename: file.name,
              title: file.name,
            })
            .then((asset) => {
              completed += 1;
              setStatus(`Uploading ${completed} / ${resized.length}…`);
              return asset;
            })
        )
      );

      const newItems = uploads.map((asset) => ({
        _key: randomKey(),
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
      setStatus("");
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
          {uploading ? status || "Uploading…" : "Upload multiple images"}
        </Button>
      )}
    </div>
  );
}
