"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Upload } from "lucide-react";
import Sidebar from "@/app/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCertificates();

    const channel = supabase
      .channel("certificates-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "certificates",
        },
        () => {
          fetchCertificates();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCertificates = async () => {
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  setCertificates(data || []);
  setLoading(false);
};

  const resetForm = () => {
    setTitle("");
    setImage(null);
    setPreview("");
    setEditId(null);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);

    let imageUrl = preview;

    if (image) {
      const fileName = `certificate-${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("certificates")
        .upload(fileName, image);

      if (!uploadError) {
        const { data } = supabase.storage
          .from("certificates")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }
    }

    if (editId) {
      await supabase
        .from("certificates")
        .update({
          title,
          image_url: imageUrl,
        })
        .eq("id", editId);
    } else {
      await supabase.from("certificates").insert([
        {
          title,
          image_url: imageUrl,
        },
      ]);
    }

    setSaving(false);
setOpen(false);
resetForm();

fetchCertificates
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Certificate?",
      text: "Certificate yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      color: "#09090b",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#71717a",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase.from("certificates").delete().eq("id", id);

    if (!error) {
      setCertificates((prev) => prev.filter((item) => item.id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Certificate berhasil dihapus.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
        background: "#ffffff",
        color: "#09090b",
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: "Gagal menghapus certificate.",
        icon: "error",
        background: "#ffffff",
        color: "#09090b",
      });
    }
  };

  const handleEdit = (item: any) => {
    setTitle(item.title);
    setPreview(item.image_url);
    setEditId(item.id);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="lg:ml-[250px] min-h-screen px-4 sm:px-6 lg:px-8 pt-[90px] lg:pt-6 pb-6">
        <div className="py-6 lg:py-8">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Certificates</h1>

              <p className="text-sm text-zinc-500 mt-1">
                Manage your certificates
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 transition shadow-sm cursor-pointer font-medium"
            >
              <Plus size={16} />
              Add Certificate
            </button>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-zinc-400 text-sm">Loading certificates...</div>
          ) : certificates.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white h-[240px] flex items-center justify-center text-zinc-400 shadow-sm">
              No certificates found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-6">
              {certificates.map((item) => (
                <div
                  key={item.id}
                  className="border border-zinc-200 bg-white shadow-sm hover:shadow-md hover:border-zinc-300 rounded-2xl p-4 transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  {/* IMAGE */}
                  <div className="w-full h-[150px] rounded-xl overflow-hidden bg-zinc-100 mb-4">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-100" />
                    )}
                  </div>

                  {/* TITLE */}
                  <h2 className="font-semibold text-[15px] text-zinc-900 mb-3 line-clamp-2 min-h-[42px]">
                    {item.title}
                  </h2>

                  {/* DATE */}
                  <span className="text-[11px] text-zinc-400 mb-4">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "No Date"}
                  </span>

                  {/* ACTION */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 transition flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition flex items-center justify-center text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center px-3 sm:px-4 py-4">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white border border-zinc-200 shadow-xl p-5 sm:p-6 max-h-[92vh] overflow-y-auto text-zinc-900">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
                {editId ? "Edit Certificate" : "Add Certificate"}
              </h2>

              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {/* IMAGE */}
            <label className="border border-dashed border-zinc-300 rounded-2xl bg-zinc-50 hover:bg-zinc-100 h-44 sm:h-52 flex flex-col items-center justify-center cursor-pointer overflow-hidden mb-4 transition">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload size={24} className="text-zinc-400 mb-2" />

                  <p className="text-sm text-zinc-500 font-medium">
                    Upload Certificate Image
                  </p>
                </>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>

            {/* TITLE */}
            <input
              placeholder="Certificate Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none mb-5 text-sm text-zinc-900 focus:bg-white focus:border-zinc-400 transition"
            />

            {/* BUTTON */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 shadow-sm"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
