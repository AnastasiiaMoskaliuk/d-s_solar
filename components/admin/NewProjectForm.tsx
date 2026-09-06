"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/data/supabase/client";

type ProjectData = {
  id?: number;
  title: string;
  shortTitle?: string;
  handle: string;
  location: string;
  date?: string;
  power?: string;
  panels?: number;
  panelType?: string;
  inverter?: string;
  battery?: string;
  roofType?: string;
  installationTime?: string;
  description: string;
  details?: string;
};

type ProjectFormProps = {
  project?: ProjectData;
};

const ProjectForm = ({ project }: ProjectFormProps) => {
  const router = useRouter();

  const isEditMode = Boolean(project);

  const [form, setForm] = useState({
    title: project?.title ?? "",
    shortTitle: project?.shortTitle ?? "",
    handle: project?.handle ?? "",
    location: project?.location ?? "",
    date: project?.date ?? "",
    power: project?.power ?? "",
    panels: project?.panels?.toString() ?? "",
    panelType: project?.panelType ?? "",
    inverter: project?.inverter ?? "",
    battery: project?.battery ?? "",
    roofType: project?.roofType ?? "",
    installationTime: project?.installationTime ?? "",
    description: project?.description ?? "",
    details: project?.details ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

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
      installation_time: form.installationTime.trim() || null,
      description: form.description.trim(),
      details: form.details.trim() || null,
    };

    /*
     * EDIT
     */
    if (isEditMode && project?.id) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", project.id);

      if (error) {
        console.error("Update project error:", error);

        if (error.code === "23505") {
          setError("Dieser Handle existiert bereits.");
        } else {
          setError(error.message);
        }

        setLoading(false);
        return;
      }

      router.push("/admin/projects");
      router.refresh();

      return;
    }

    /*
     * CREATE
     */
    const { error } = await supabase
      .from("projects")
      .insert(projectData);

    if (error) {
      console.error("Create project error:", error);

      if (error.code === "23505") {
        setError("Dieser Handle existiert bereits.");
      } else {
        setError(error.message);
      }

      setLoading(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <form
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
            onChange={(value) => updateField("title", value)}
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

            <div className="flex gap-[10px]">
              <input
                value={form.handle}
                onChange={(event) =>
                  updateField("handle", event.target.value)
                }
                placeholder="photovoltaikanlage-einfamilienhaus-werdau"
                required
                className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
              />

              <button
                type="button"
                onClick={generateHandle}
                className="shrink-0 rounded-[10px] border border-[#154b4b] px-[15px] text-[13px] font-semibold text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white"
              >
                Generieren
              </button>
            </div>
          </div>

          <Input
            label="Standort *"
            value={form.location}
            onChange={(value) => updateField("location", value)}
            placeholder="Werdau"
            required
          />

          <Input
            label="Datum"
            value={form.date}
            onChange={(value) => updateField("date", value)}
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
            onChange={(value) => updateField("power", value)}
            placeholder="10,2 kWp"
          />

          <Input
            label="Anzahl Module"
            type="number"
            value={form.panels}
            onChange={(value) => updateField("panels", value)}
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
              updateField("installationTime", value)
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
              updateField("description", value)
            }
            placeholder="Kurze Beschreibung des Projekts..."
            required
          />

          <Textarea
            label="Details"
            value={form.details}
            onChange={(value) => updateField("details", value)}
            placeholder="Weitere Informationen zum Projekt..."
          />
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="rounded-[12px] border border-red-200 bg-red-50 px-[20px] py-[15px] text-[14px] text-red-600">
          {error}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex flex-col-reverse gap-[10px] sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          disabled={loading}
          className="rounded-[10px] border border-[#154b4b] px-[25px] py-[13px] font-semibold text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Abbrechen
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-[10px] bg-[#f7bd37] px-[25px] py-[13px] font-bold text-[#154b4b] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Speichern..."
            : isEditMode
              ? "Änderungen speichern"
              : "Projekt erstellen"}
        </button>
      </div>
    </form>
  );
};

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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        min={type === "number" ? 1 : undefined}
        className="w-full rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
      />
    </div>
  );
};

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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="w-full resize-y rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
      />
    </div>
  );
};

export default ProjectForm;