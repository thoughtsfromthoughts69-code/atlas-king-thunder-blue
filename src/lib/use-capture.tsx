import { useNavigate } from "@tanstack/react-router";
import { useRef, type ReactNode } from "react";
import { readComposeTarget } from "@/lib/compose-target";
import { compressImageFile } from "@/lib/image-client";
import { useProjectStore } from "@/lib/store";

type CaptureOpts = {
  onImage?: (dataUrl: string) => void | Promise<void>;
};

export function useCapture(opts?: CaptureOpts): {
  pickGallery: () => void;
  pickCamera: () => void;
  pick: () => void;
  runImage: (file: File) => Promise<void>;
  input: ReactNode;
  busy: boolean;
} {
  const navigate = useNavigate();
  const createAndGenerate = useProjectStore((s) => s.createAndGenerate);
  const generatingId = useProjectStore((s) => s.generatingId);
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const runImage = async (file: File) => {
    if (generatingId) return;
    const dataUrl = await compressImageFile(file);
    if (opts?.onImage) {
      await opts.onImage(dataUrl);
      return;
    }
    const id = await createAndGenerate({
      name: "Capture",
      source: "image",
      sourcePreview: dataUrl,
      input: { mode: "image", imageDataUrl: dataUrl, target: readComposeTarget() },
    });
    void navigate({ to: "/studio/$projectId", params: { projectId: id } });
  };

  const onChange = (el: HTMLInputElement) => {
    const file = el.files?.[0];
    el.value = "";
    if (file) void runImage(file);
  };

  const input = (
    <>
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => onChange(e.currentTarget)}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => onChange(e.currentTarget)}
      />
    </>
  );

  return {
    pickGallery: () => galleryRef.current?.click(),
    pickCamera: () => cameraRef.current?.click(),
    pick: () => galleryRef.current?.click(),
    runImage,
    input,
    busy: Boolean(generatingId),
  };
}
