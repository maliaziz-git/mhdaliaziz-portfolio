"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/admin/Sidebar";
import { Plus } from "lucide-react";
import AddProjectModal from "./AddProjectModal";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel("projects-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (!error && data) {
      const sortedProjects = data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );

      setProjects(sortedProjects);
    }

    setLoading(false);
  };

  const handleAdd = (newProject: any) => {
    setProjects((prev) => {
      const updated = [...prev, newProject];

      return updated.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 overflow-hidden">
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>

      {/* MAIN */}
      <main className="lg:ml-[250px] pt-[100px] lg:pt-0 min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Projects
              </h1>

              <p className="text-zinc-500 text-sm mt-1">
                Manage your portfolio projects
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition shadow-sm cursor-pointer"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>

          {/* GRID */}
          {loading ? (
            <div className="text-zinc-400 text-sm">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white h-[240px] flex items-center justify-center text-zinc-400 shadow-sm">
              No projects found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-5 pb-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-zinc-200 bg-white shadow-sm rounded-2xl p-3 lg:p-4 hover:border-zinc-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* IMAGE */}
                  <div className="w-full h-[150px] sm:h-[160px] lg:h-[140px] rounded-xl overflow-hidden bg-zinc-100 mb-3">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-100" />
                    )}
                  </div>

                  {/* TITLE */}
                  <h2 className="font-semibold text-[14px] text-zinc-900 mb-1.5 line-clamp-1">
                    {project.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-[12px] text-zinc-500 line-clamp-2 mb-3 leading-relaxed min-h-[34px]">
                    {project.description}
                  </p>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-auto gap-3 flex-wrap">
                    <span className="text-[10px] text-zinc-400">
                      {project.created_at
                        ? new Date(
                            project.created_at
                          ).toLocaleDateString()
                        : "No Date"}
                    </span>

                    <button
                      onClick={() =>
                        router.push(
                          `/admin/projects/${project.id}`
                        )
                      }
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 transition text-[12px] font-medium"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      <AddProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}