"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { createClient } from "@/data/supabase/client";

type ProjectImage = {
  id: number;
  image_url: string;
  alt: string | null;
  sort_order: number;
};

type ProjectImagesProps = {
  projectId: number;
  initialImages: ProjectImage[];
};

const ProjectImages = ({
  projectId,
  initialImages,
}: ProjectImagesProps) => {
  const supabase = createClient();

  const [images, setImages] = useState<ProjectImage[]>(
    [...initialImages].sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  );

  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState("");

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const newImages: ProjectImage[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          setError(
            `Die Datei "${file.name}" ist größer als 10 MB.`,
          );
          continue;
        }

const extension =
  file.name.split(".").pop()?.toLowerCase() || "jpg";

const fileName = `${crypto.randomUUID()}.${extension}`;

const storagePath = `${projectId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(storagePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("projects")
          .getPublicUrl(storagePath);

        const nextSortOrder =
          images.length +
          newImages.length;

        const { data: imageData, error: databaseError } =
          await supabase
            .from("project_images")
            .insert({
              project_id: projectId,
              image_url: publicUrlData.publicUrl,
              alt: file.name,
              sort_order: nextSortOrder,
            })
            .select()
            .single();

        if (databaseError) {
          await supabase.storage
            .from("projects")
            .remove([storagePath]);

          throw databaseError;
        }

        newImages.push(imageData);
      }

      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
      }
    } catch (uploadError) {
      console.error("Upload error:", uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Beim Hochladen ist ein Fehler aufgetreten.",
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  const getStoragePath = (imageUrl: string) => {
    const marker =
      "/storage/v1/object/public/projects/";

    const index = imageUrl.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return imageUrl.substring(
      index + marker.length,
    );
  };

  const handleDelete = async (image: ProjectImage) => {
    const confirmed = window.confirm(
      "Möchtest du dieses Bild wirklich löschen?",
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(image.id);
    setError("");

    try {
      const storagePath = getStoragePath(
        image.image_url,
      );

      if (storagePath) {
        const { error: storageError } =
          await supabase.storage
            .from("projects")
            .remove([storagePath]);

        if (storageError) {
          console.error(
            "Storage delete error:",
            storageError,
          );
        }
      }

      const { error: databaseError } =
        await supabase
          .from("project_images")
          .delete()
          .eq("id", image.id);

      if (databaseError) {
        throw databaseError;
      }

      setImages((prev) =>
        prev
          .filter((item) => item.id !== image.id)
          .map((item, index) => ({
            ...item,
            sort_order: index,
          })),
      );
    } catch (deleteError) {
      console.error(
        "Delete image error:",
        deleteError,
      );

      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Das Bild konnte nicht gelöscht werden.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const moveImage = async (
    index: number,
    direction: "left" | "right",
  ) => {
    const newIndex =
      direction === "left"
        ? index - 1
        : index + 1;

    if (
      newIndex < 0 ||
      newIndex >= images.length
    ) {
      return;
    }

    const newImages = [...images];

    [
      newImages[index],
      newImages[newIndex],
    ] = [
      newImages[newIndex],
      newImages[index],
    ];

    const updatedImages = newImages.map(
      (image, position) => ({
        ...image,
        sort_order: position,
      }),
    );

    setImages(updatedImages);

    try {
      await Promise.all(
        updatedImages.map((image) =>
          supabase
            .from("project_images")
            .update({
              sort_order: image.sort_order,
            })
            .eq("id", image.id),
        ),
      );
    } catch (updateError) {
      console.error(
        "Sort order error:",
        updateError,
      );

      setError(
        "Die Reihenfolge konnte nicht gespeichert werden.",
      );
    }
  };

  return (
    <section className="rounded-[20px] bg-white p-[25px] shadow-sm md:p-[30px]">
      <div className="mb-[25px]">
        <h2 className="text-[24px] font-bold text-[#154b4b]">
          Projektbilder
        </h2>

        <p className="mt-[5px] text-[14px] text-[#787A80]">
          Lade Bilder für dieses Projekt hoch.
          Das erste Bild wird als Hauptbild verwendet.
        </p>
      </div>

      {error && (
        <div className="mb-[20px] rounded-[12px] border border-red-200 bg-red-50 px-[15px] py-[12px] text-[14px] text-red-600">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="mb-[25px] grid grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-[15px] border border-[#eee] bg-[#f8f8f6]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.image_url}
                  alt={
                    image.alt ||
                    "Projektbild"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />

                {index === 0 && (
                  <div className="absolute left-[10px] top-[10px] rounded-full bg-[#f7bd37] px-[10px] py-[5px] text-[12px] font-bold text-[#154b4b]">
                    Hauptbild
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(image)
                  }
                  disabled={
                    deletingId === image.id
                  }
                  className="absolute right-[10px] top-[10px] flex h-[35px] w-[35px] items-center justify-center rounded-full bg-red-600 text-[18px] text-white shadow-md transition hover:bg-red-700 disabled:opacity-50"
                  aria-label="Bild löschen"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center justify-between gap-[10px] p-[10px]">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() =>
                    moveImage(index, "left")
                  }
                  className="flex h-[35px] flex-1 items-center justify-center rounded-[8px] border border-[#154b4b] text-[18px] text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ←
                </button>

                <span className="text-[12px] text-[#999]">
                  {index + 1}
                </span>

                <button
                  type="button"
                  disabled={
                    index === images.length - 1
                  }
                  onClick={() =>
                    moveImage(index, "right")
                  }
                  className="flex h-[35px] flex-1 items-center justify-center rounded-[8px] border border-[#154b4b] text-[18px] text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="mb-[20px] rounded-[15px] border border-dashed border-[#ccc] bg-[#fafaf8] px-[20px] py-[40px] text-center">
          <p className="text-[15px] text-[#999]">
            Noch keine Bilder vorhanden.
          </p>
        </div>
      )}

      <label
        className={`flex cursor-pointer items-center justify-center rounded-[12px] border-2 border-dashed border-[#154b4b] px-[20px] py-[20px] text-center transition hover:bg-[#f5f8f7] ${
          uploading
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={handleUpload}
          className="hidden"
        />

        <div>
          <div className="mb-[5px] text-[25px]">
            {uploading ? "⏳" : "＋"}
          </div>

          <p className="font-semibold text-[#154b4b]">
            {uploading
              ? "Bilder werden hochgeladen..."
              : "Bilder auswählen"}
          </p>

          <p className="mt-[3px] text-[12px] text-[#999]">
            Mehrere Bilder möglich · max. 10 MB pro Bild
          </p>
        </div>
      </label>
    </section>
  );
};

export default ProjectImages;