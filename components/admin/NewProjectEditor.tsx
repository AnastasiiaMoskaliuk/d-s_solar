
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/data/supabase/client";

type SelectedImage = {
  id: string;
  file: File;
  preview: string;
  alt: string;
};

const NewProjectEditor = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    shortTitle: "",
    handle: "",
    location: "",
    date: "",
    power: "",
    panels: "",
    panelType: "",
    inverter: "",
    battery: "",
    roofType: "",
    installationTime: "",
    description: "",
    details: "",
  });

  const [images, setImages] = useState<SelectedImage[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * CLEANUP IMAGE PREVIEWS
   */
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  /*
   * UPDATE FIELD
   */
  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
   * GENERATE HANDLE
   */
  const generateHandle = () => {
    const handle = form.title
      .toLowerCase()
      .trim()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    updateField("handle", handle);
  };

  /*
   * ADD IMAGES
   */
  const handleImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        invalidFiles.push(file.name);
        return;
      }

      if (!file.type.startsWith("image/")) {
        invalidFiles.push(file.name);
        return;
      }

      validFiles.push(file);
    });

    if (invalidFiles.length) {
      setError(
        `Diese Dateien sind ungültig oder größer als 10 MB: ${invalidFiles.join(
          ", ",
        )}`,
      );
    } else {
      setError("");
    }

    const newImages: SelectedImage[] = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      alt: form.title.trim() || file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);

    event.target.value = "";
  };

  /*
   * REMOVE IMAGE
   */
  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  /*
   * UPDATE IMAGE ALT
   */
  const updateImageAlt = (
    id: string,
    value: string,
  ) => {
    setImages((prev) =>
      prev.map((image) =>
        image.id === id
          ? {
              ...image,
              alt: value,
            }
          : image,
      ),
    );
  };

  /*
   * ADD FEATURE
   */
  const addFeature = () => {
    const value = featureInput.trim();

    if (!value) {
      return;
    }

    setFeatures((prev) => [...prev, value]);
    setFeatureInput("");
  };

  /*
   * ADD FEATURE WITH ENTER
   */
  const handleFeatureKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addFeature();
    }
  };

  /*
   * REMOVE FEATURE
   */
  const removeFeature = (index: number) => {
    setFeatures((prev) =>
      prev.filter((_, featureIndex) => featureIndex !== index),
    );
  };

  /*
   * MOVE FEATURE
   */
  const moveFeature = (
    index: number,
    direction: "up" | "down",
  ) => {
    setFeatures((prev) => {
      const newFeatures = [...prev];

      const targetIndex =
        direction === "up" ? index - 1 : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= newFeatures.length
      ) {
        return prev;
      }

      [newFeatures[index], newFeatures[targetIndex]] = [
        newFeatures[targetIndex],
        newFeatures[index],
      ];

      return newFeatures;
    });
  };

  /*
   * CREATE PROJECT
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Bitte geben Sie einen Titel ein.");
      return;
    }

    if (!form.handle.trim()) {
      setError("Bitte geben Sie einen Handle ein.");
      return;
    }

    if (!form.location.trim()) {
      setError("Bitte geben Sie einen Standort ein.");
      return;
    }

    if (!form.description.trim()) {
      setError("Bitte geben Sie eine Beschreibung ein.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();

    /*
     * 1. CREATE PROJECT
     */
    const projectData = {
      title: form.title.trim(),
      short_title: form.shortTitle.trim() || null,
      handle: form.handle.trim(),
      location: form.location.trim(),
      date: form.date.trim() || null,
      power: form.power.trim() || null,
      panels: form.panels ? Number(form.panels) : null,
      panel_type: form.panelType.trim() || null,
      inverter: form.inverter.trim() || null,
      battery: form.battery.trim() || null,
      roof_type: form.roofType.trim() || null,
      installation_time:
        form.installationTime.trim() || null,
      description: form.description.trim(),
      details: form.details.trim() || null,
    };

    const {
      data: project,
      error: projectError,
    } = await supabase
      .from("projects")
      .insert(projectData)
      .select("id")
      .single();

    if (projectError || !project) {
      console.error(
        "Create project error:",
        projectError,
      );

      if (projectError?.code === "23505") {
        setError("Dieser Handle existiert bereits.");
      } else {
        setError(
          projectError?.message ||
            "Projekt konnte nicht erstellt werden.",
        );
      }

      setLoading(false);
      return;
    }

    /*
     * 2. UPLOAD IMAGES
     */
    if (images.length > 0) {
      const uploadedImages = [];

      for (let index = 0; index < images.length; index++) {
        const image = images[index];

        const extension =
          image.file.name.split(".").pop() || "jpg";

        const fileName = `${crypto.randomUUID()}.${extension}`;

        const filePath = `${project.id}/${fileName}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from("projects")
          .upload(filePath, image.file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error(
            "Image upload error:",
            uploadError,
          );

          setError(
            `Fehler beim Hochladen von "${image.file.name}".`,
          );

          setLoading(false);
          return;
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);

        uploadedImages.push({
          project_id: project.id,
          image_url: publicUrlData.publicUrl,
          alt:
            image.alt.trim() ||
            form.title.trim() ||
            null,
          sort_order: index,
        });
      }

      /*
       * 3. SAVE IMAGE RECORDS
       */
      const {
        error: imagesError,
      } = await supabase
        .from("project_images")
        .insert(uploadedImages);

      if (imagesError) {
        console.error(
          "Save images error:",
          imagesError,
        );

        setError(
          "Die Bilder wurden hochgeladen, konnten aber nicht gespeichert werden.",
        );

        setLoading(false);
        return;
      }
    }

    /*
     * 4. SAVE FEATURES
     */
    if (features.length > 0) {
      const featureData = features.map(
        (text, index) => ({
          project_id: project.id,
          text,
          sort_order: index,
        }),
      );

      const {
        error: featuresError,
      } = await supabase
        .from("project_features")
        .insert(featureData);

      if (featuresError) {
        console.error(
          "Save features error:",
          featuresError,
        );

        setError(
          "Das Projekt wurde erstellt, aber die Merkmale konnten nicht gespeichert werden.",
        );

        setLoading(false);
        return;
      }
    }

    /*
     * 5. SUCCESS
     */
    router.push("/admin/projects?created=1");
    router.refresh();
  };

  return (
    <form
      id="project-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-[25px]"
    >
      {/* GRUNDDATEN */}
      <section className="rounded-[20px] bg-white p-[25px] shadow-sm md:p-[30px]">
        <h2 className="mb-[25px] text-[24px] font-bold text-[#154b4b]">
          Grunddaten
        </h2>

        <div className="grid gap-[20px] md:grid-cols-2">
          <Input
            label="Titel *"
            value={form.title}
            onChange={(value) =>
              updateField("title", value)
            }
            placeholder="Photovoltaikanlage für ein Einfamilienhaus"
            required
          />

          <Input
            label="Short Title"
            value={form.shortTitle}
            onChange={(value) =>
              updateField("shortTitle", value)
            }
            placeholder="Einfamilienhaus in Werdau"
          />

          <div className="md:col-span-2">
            <label className="mb-[7px] block text-[15px] font-semibold text-[#154b4b]">
              Handle *
            </label>

            <div className="flex flex-col gap-[10px] sm:flex-row">
              <input
                value={form.handle}
                onChange={(event) =>
                  updateField(
                    "handle",
                    event.target.value,
                  )
                }
                placeholder="photovoltaikanlage-einfamilienhaus-werdau"
                required
                className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
              />

              <button
                type="button"
                onClick={generateHandle}
                className="shrink-0 rounded-[10px] border border-[#154b4b] px-[15px] py-[12px] text-[13px] font-semibold text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white"
              >
                Generieren
              </button>
            </div>
          </div>

          <Input
            label="Standort *"
            value={form.location}
            onChange={(value) =>
              updateField("location", value)
            }
            placeholder="Werdau"
            required
          />

          <Input
            label="Datum"
            value={form.date}
            onChange={(value) =>
              updateField("date", value)
            }
            placeholder="August 2026"
          />
        </div>
      </section>

      {/* TECHNISCHE DATEN */}
      <section className="rounded-[20px] bg-white p-[25px] shadow-sm md:p-[30px]">
        <h2 className="mb-[25px] text-[24px] font-bold text-[#154b4b]">
          Technische Daten
        </h2>

        <div className="grid gap-[20px] md:grid-cols-2">
          <Input
            label="Leistung"
            value={form.power}
            onChange={(value) =>
              updateField("power", value)
            }
            placeholder="10,2 kWp"
          />

          <Input
            label="Anzahl Module"
            type="number"
            value={form.panels}
            onChange={(value) =>
              updateField("panels", value)
            }
            placeholder="24"
          />

          <Input
            label="Panel-Typ"
            value={form.panelType}
            onChange={(value) =>
              updateField("panelType", value)
            }
            placeholder="Jinko Solar 425 W"
          />

          <Input
            label="Wechselrichter"
            value={form.inverter}
            onChange={(value) =>
              updateField("inverter", value)
            }
            placeholder="Sungrow"
          />

          <Input
            label="Batteriespeicher"
            value={form.battery}
            onChange={(value) =>
              updateField("battery", value)
            }
            placeholder="10 kWh"
          />

          <Input
            label="Dachtyp"
            value={form.roofType}
            onChange={(value) =>
              updateField("roofType", value)
            }
            placeholder="Satteldach"
          />

          <Input
            label="Installationszeit"
            value={form.installationTime}
            onChange={(value) =>
              updateField(
                "installationTime",
                value,
              )
            }
            placeholder="2 Tage"
          />
        </div>
      </section>

      {/* BESCHREIBUNG */}
      <section className="rounded-[20px] bg-white p-[25px] shadow-sm md:p-[30px]">
        <h2 className="mb-[25px] text-[24px] font-bold text-[#154b4b]">
          Beschreibung
        </h2>

        <div className="flex flex-col gap-[20px]">
          <Textarea
            label="Beschreibung *"
            value={form.description}
            onChange={(value) =>
              updateField(
                "description",
                value,
              )
            }
            placeholder="Kurze Beschreibung des Projekts..."
            required
          />

          <Textarea
            label="Details"
            value={form.details}
            onChange={(value) =>
              updateField("details", value)
            }
            placeholder="Weitere Informationen zum Projekt..."
          />
        </div>
      </section>

      {/* PROJEKTBILDER */}
      <section className="rounded-[20px] bg-white p-[25px] shadow-sm md:p-[30px]">
        <div className="mb-[25px]">
          <h2 className="text-[24px] font-bold text-[#154b4b]">
            Projektbilder
          </h2>

          <p className="mt-[5px] text-[14px] text-[#787A80]">
            Mehrere Bilder auswählen. Maximale Größe pro
            Bild: 10 MB.
          </p>
        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-[15px] border-2 border-dashed border-[#d8d8d8] px-[20px] py-[35px] text-center transition hover:border-[#154b4b]">
          <span className="mb-[8px] text-[35px]">
            📷
          </span>

          <span className="font-semibold text-[#154b4b]">
            Bilder auswählen
          </span>

          <span className="mt-[5px] text-[13px] text-[#787A80]">
            JPG, PNG, WEBP
          </span>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="hidden"
          />
        </label>

        {images.length > 0 && (
          <div className="mt-[25px] grid gap-[15px] sm:grid-cols-2">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-[15px] border border-[#ddd] bg-[#fafafa]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#eee]">
                  <img
                    src={image.preview}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />

                  {index === 0 && (
                    <div className="absolute left-[10px] top-[10px] rounded-full bg-[#f7bd37] px-[10px] py-[5px] text-[11px] font-bold text-[#154b4b]">
                      Hauptbild
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(image.id)
                    }
                    className="absolute right-[10px] top-[10px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white text-[18px] text-red-500 shadow-md transition hover:bg-red-500 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="p-[12px]">
                  <p className="mb-[7px] truncate text-[12px] text-[#787A80]">
                    {image.file.name}
                  </p>

                  <input
                    value={image.alt}
                    onChange={(event) =>
                      updateImageAlt(
                        image.id,
                        event.target.value,
                      )
                    }
                    placeholder="Alt-Text"
                    className="w-full rounded-[8px] border border-[#ddd] px-[10px] py-[9px] text-[13px] outline-none focus:border-[#154b4b]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <p className="mt-[15px] text-[13px] text-[#787A80]">
            {images.length}{" "}
            {images.length === 1
              ? "Bild ausgewählt"
              : "Bilder ausgewählt"}
          </p>
        )}
      </section>

      {/* PROJEKTMERKMALE */}
      <section className="rounded-[20px] bg-white p-[25px] shadow-sm md:p-[30px]">
        <div className="mb-[25px]">
          <h2 className="text-[24px] font-bold text-[#154b4b]">
            Projektmerkmale
          </h2>

          <p className="mt-[5px] text-[14px] text-[#787A80]">
            Füge wichtige Merkmale des Projekts hinzu.
          </p>
        </div>

        <div className="flex flex-col gap-[10px] sm:flex-row">
          <input
            value={featureInput}
            onChange={(event) =>
              setFeatureInput(event.target.value)
            }
            onKeyDown={handleFeatureKeyDown}
            placeholder="z. B. 24 Solarmodule"
            className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
          />

          <button
            type="button"
            onClick={addFeature}
            className="rounded-[10px] bg-[#154b4b] px-[20px] py-[12px] font-semibold text-white transition hover:opacity-90"
          >
            + Hinzufügen
          </button>
        </div>

        {features.length > 0 && (
          <div className="mt-[20px] flex flex-col gap-[10px]">
            {features.map((feature, index) => (
              <div
                key={`${feature}-${index}`}
                className="flex items-center gap-[10px] rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] p-[10px]"
              >
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#f7bd37] text-[13px] font-bold text-[#154b4b]">
                  {index + 1}
                </span>

                <span className="min-w-0 flex-1 text-[14px] text-[#333]">
                  {feature}
                </span>

                <div className="flex shrink-0 items-center gap-[5px]">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() =>
                      moveFeature(index, "up")
                    }
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#ddd] text-[13px] transition hover:border-[#154b4b] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    disabled={
                      index === features.length - 1
                    }
                    onClick={() =>
                      moveFeature(index, "down")
                    }
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#ddd] text-[13px] transition hover:border-[#154b4b] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeFeature(index)
                    }
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-red-200 text-[16px] text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!features.length && (
          <div className="mt-[20px] rounded-[10px] bg-[#f7f7f5] px-[15px] py-[15px] text-[13px] text-[#787A80]">
            Noch keine Merkmale hinzugefügt.
          </div>
        )}
      </section>

      {/* ERROR */}
      {error && (
        <div className="rounded-[12px] border border-red-200 bg-red-50 px-[20px] py-[15px] text-[14px] text-red-600">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="rounded-[12px] border border-[#ddd] bg-white px-[20px] py-[15px] text-[14px] text-[#154b4b]">
          Projekt wird erstellt... Bitte warten.
        </div>
      )}
    </form>
  );
};

/*
 * INPUT
 */
type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: InputProps) => {
  return (
    <div>
      <label className="mb-[7px] block text-[15px] font-semibold text-[#154b4b]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        min={type === "number" ? 1 : undefined}
        className="w-full rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
      />
    </div>
  );
};

/*
 * TEXTAREA
 */
type TextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
};

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: TextareaProps) => {
  return (
    <div>
      <label className="mb-[7px] block text-[15px] font-semibold text-[#154b4b]">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        rows={5}
        className="w-full resize-y rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
      />
    </div>
  );
};

export default NewProjectEditor;

