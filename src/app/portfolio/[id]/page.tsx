// ====== PORTFOLIO DETAIL PAGE ======
// src/app/portfolio/[id]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Sparkles,
  Code2,
  Layers,
  X,
  Box,
} from 'lucide-react'

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [project, setProject] = useState<any>({
    title: '',
    description: '',
    technologies: '',
    key_features: '',
    image_url: '',
    image_urls: [],
    live_url: '',
    github_url: '',
  })

  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (data) {
      setProject(data)
    }
  }

  const tech = (project?.technologies || '')
    .split(',')
    .filter((t: string) => t.trim() !== '')

  const features = (project?.key_features || '')
    .split(',')
    .filter((f: string) => f.trim() !== '')

  const galleryImages =
    project?.image_urls && Array.isArray(project.image_urls)
      ? project.image_urls
      : project?.image_url
      ? [project.image_url]
      : []

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1)
    }
  }

  const handleBack = () => {
    sessionStorage.setItem('skipIntroOnce', 'true')
    router.push('/#portfolio')
  }

  return (
    <>
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <motion.img
              key={currentImage}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              src={galleryImages[currentImage]}
              className="max-w-[85vw] max-h-[80vh] rounded-3xl object-contain"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen text-zinc-900 px-6 md:px-10 lg:px-16 py-8 relative overflow-hidden bg-[#fafafa]"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#f8fafc_0%,#f1f5f9_35%,#e2e8f0_100%)]" />
        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] rounded-full bg-zinc-300/30 blur-[140px] -z-10" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-slate-300/30 blur-[160px] -z-10" />

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[520px]"
          >
            {/* BACK + TITLE */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8"
            >
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-[13px] text-zinc-500 hover:text-zinc-900 transition-all duration-300 mb-6"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[28px] md:text-[38px] font-bold leading-tight tracking-tight mb-3 text-zinc-900"
              >
                {project.title}
              </motion.h1>

              <motion.div
                initial={{ width: 0, x: -20 }}
                animate={{ width: 65, x: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-[2px] rounded-full bg-gradient-to-r from-zinc-400 to-zinc-200 mb-5"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[12px] leading-6 text-zinc-600 text-justify mb-7"
            >
              {project.description}
            </motion.p>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-2 gap-3 mb-7 max-w-[420px]"
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
                  <Code2 size={16} />
                </div>

                <div>
                  <p className="text-base font-semibold text-zinc-900">{tech.length}</p>
                  <p className="text-[10px] text-zinc-500">
                    Technologies Used
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
                  <Layers size={16} />
                </div>

                <div>
                  <p className="text-base font-semibold text-zinc-900">{features.length}</p>
                  <p className="text-[10px] text-zinc-500">Key Features</p>
                </div>
              </motion.div>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, x: 55 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap gap-3 mb-7"
            >
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-all duration-300 text-sm font-medium"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-400 text-sm">
                  <ExternalLink size={14} />
                  No Link
                </div>
              )}

              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-50 shadow-sm transition-all duration-300 text-sm font-medium"
                >
                  <GitBranch size={14} />
                  Github
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-400 text-sm">
                  <GitBranch size={14} />
                  No Link
                </div>
              )}
            </motion.div>

            {/* TECH */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.8,
    delay: 0.08,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  <div className="flex items-center gap-2 mb-3">
    <Code2 size={14} className="text-zinc-600" />
    <p className="text-[13px] font-semibold text-zinc-800">
      Technologies Used
    </p>
  </div>

  <div className="flex flex-wrap gap-2">
  {tech.map((t: string, i: number) => (
    <motion.div
  key={i}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: 0.12 + i * 0.04,
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-zinc-200 shadow-sm text-[11px] text-zinc-700"
>
  <Box size={11} className="text-zinc-400" />
  {t.trim()}
</motion.div>
  ))}
</div>
</motion.div>
          </motion.div>

          {/* RIGHT */}
<motion.div
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="w-full pt-10 md:pt-14"
>
            {/* IMAGE */}
            {galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 55 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-5"
              >
                <div className="relative rounded-[26px] overflow-hidden border border-zinc-200 bg-white shadow-sm max-w-[560px] mx-auto">
                  <motion.img
                    key={currentImage}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    src={galleryImages[currentImage]}
                    onClick={() => setPreviewOpen(true)}
                    className="w-full h-[220px] md:h-[250px] object-cover cursor-pointer"
                  />

                  {currentImage > 0 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 text-zinc-800 shadow-md backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  {currentImage < galleryImages.length - 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 text-zinc-800 shadow-md backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>

                {galleryImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {galleryImages.map((_: any, i: number) => (
                      <motion.button
                        key={i}
                        initial={{
                          opacity: 0,
                          x: i % 2 === 0 ? -10 : 10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: i * 0.04,
                          duration: 0.45,
                        }}
                        onClick={() => setCurrentImage(i)}
                        className={`rounded-full transition-all duration-300 ${
                          currentImage === i
                            ? 'w-6 h-1.5 bg-zinc-900'
                            : 'w-1.5 h-1.5 bg-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* FEATURES */}
            <motion.div
              initial={{ opacity: 0, x: -55 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -2 }}
              className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-zinc-600" />
                <p className="text-sm font-semibold text-zinc-900">Key Features</p>
              </div>

              <ul className="space-y-2.5 text-[12px] text-zinc-600 leading-6">
                {features.map((f: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{
                      opacity: 0,
                      x: i % 2 === 0 ? 30 : -30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex gap-3"
                  >
                    <span className="text-zinc-400">•</span>
                    <span>{f.trim()}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}