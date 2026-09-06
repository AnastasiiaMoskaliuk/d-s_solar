"use client";

import { useState } from "react";
import { createClient } from "@/data/supabase/client";

type ProjectFeaturesProps = {
  projectId: number;
  initialFeatures: {
    id: number;
    text: string;
    sort_order: number;
  }[];
};

const ProjectFeatures = ({
  projectId,
  initialFeatures,
}: ProjectFeaturesProps) => {
  const supabase = createClient();

  const [features, setFeatures] = useState(
    [...initialFeatures].sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  );

  const [newFeature, setNewFeature] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addFeature = async () => {
    const text = newFeature.trim();

    if (!text) return;

    setSaving(true);
    setError("");

    const { data, error } = await supabase
      .from("project_features")
      .insert({
        project_id: projectId,
        text,
        sort_order: features.length,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      setError(error.message);
      setSaving(false);
      return;
    }

    setFeatures((prev) => [...prev, data]);
    setNewFeature("");
    setSaving(false);
  };

  const updateFeature = async (
    id: number,
    text: string,
  ) => {
    const { error } = await supabase
      .from("project_features")
      .update({ text })
      .eq("id", id);

    if (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const deleteFeature = async (id: number) => {
    const confirmed = window.confirm(
      "Möchtest du dieses Merkmal wirklich löschen?",
    );

    if (!confirmed) return;

    setError("");

    const { error } = await supabase
      .from("project_features")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    const remaining = features
      .filter((feature) => feature.id !== id)
      .map((feature, index) => ({
        ...feature,
        sort_order: index,
      }));

    setFeatures(remaining);

    await Promise.all(
      remaining.map((feature) =>
        supabase
          .from("project_features")
          .update({
            sort_order: feature.sort_order,
          })
          .eq("id", feature.id),
      ),
    );
  };

  const moveFeature = async (
    index: number,
    direction: "up" | "down",
  ) => {
    const newIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      newIndex < 0 ||
      newIndex >= features.length
    ) {
      return;
    }

    const updated = [...features];

    [updated[index], updated[newIndex]] = [
      updated[newIndex],
      updated[index],
    ];

    const reordered = updated.map(
      (feature, position) => ({
        ...feature,
        sort_order: position,
      }),
    );

    setFeatures(reordered);

    await Promise.all(
      reordered.map((feature) =>
        supabase
          .from("project_features")
          .update({
            sort_order: feature.sort_order,
          })
          .eq("id", feature.id),
      ),
    );
  };

  return (
    <section className="rounded-[20px] bg-white p-[25px] shadow-sm md:p-[30px]">
      <div className="mb-[25px]">
        <h2 className="text-[24px] font-bold text-[#154b4b]">
          Projektmerkmale
        </h2>

        <p className="mt-[5px] text-[14px] text-[#787A80]">
          Füge wichtige Merkmale und Vorteile des
          Projekts hinzu.
        </p>
      </div>

      {error && (
        <div className="mb-[20px] rounded-[12px] border border-red-200 bg-red-50 px-[15px] py-[12px] text-[14px] text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-[10px]">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="flex flex-col gap-[10px] rounded-[12px] border border-[#eee] bg-[#fafaf8] p-[10px] sm:flex-row sm:items-center"
          >
            <div className="flex gap-[5px]">
              <button
                type="button"
                disabled={index === 0}
                onClick={() =>
                  moveFeature(index, "up")
                }
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] border border-[#154b4b] text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
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
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] border border-[#154b4b] text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                ↓
              </button>
            </div>

            <input
              value={feature.text}
              onChange={(event) => {
                const value = event.target.value;

                setFeatures((prev) =>
                  prev.map((item) =>
                    item.id === feature.id
                      ? {
                          ...item,
                          text: value,
                        }
                      : item,
                  ),
                );
              }}
              onBlur={(event) =>
                updateFeature(
                  feature.id,
                  event.target.value.trim(),
                )
              }
              className="min-w-0 flex-1 rounded-[8px] border border-[#ddd] bg-white px-[12px] py-[10px] outline-none transition focus:border-[#154b4b]"
            />

            <button
              type="button"
              onClick={() =>
                deleteFeature(feature.id)
              }
              className="flex h-[38px] items-center justify-center rounded-[8px] bg-red-50 px-[15px] text-[14px] font-semibold text-red-600 transition hover:bg-red-100"
            >
              Löschen
            </button>
          </div>
        ))}
      </div>

      <div className="mt-[20px] flex flex-col gap-[10px] sm:flex-row">
        <input
          value={newFeature}
          onChange={(event) =>
            setNewFeature(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addFeature();
            }
          }}
          placeholder="z. B. Hochwertige Solarmodule"
          className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
        />

        <button
          type="button"
          onClick={addFeature}
          disabled={
            saving || !newFeature.trim()
          }
          className="rounded-[10px] bg-[#f7bd37] px-[20px] py-[12px] font-bold text-[#154b4b] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Merkmal hinzufügen
        </button>
      </div>
    </section>
  );
};

export default ProjectFeatures;