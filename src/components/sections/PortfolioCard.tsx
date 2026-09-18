'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  title: string
  description: string
  index: number
  id?: string
  image?: string
  live_url?: string
}

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
}: Props) {
  const router = useRouter()

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
      }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[26px] border border-zinc-200/80 bg-white p-4 shadow-sm hover:shadow-md hover:border-zinc-300 backdrop-blur-xl flex flex-col min-h-[270px] transition-all"
    >
      <div className="w-full h-36 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 mb-3">
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-zinc-100" />
        )}
      </div>

      <h3 className="text-[17px] font-semibold mb-2 leading-tight text-zinc-900">
        {title}
      </h3>

      <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-2 min-h-[38px]">
        {description}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        {live_url ? (
          <a
            href={live_url}
            target="_blank"
            className="flex items-center gap-2 text-[13px] text-zinc-600 hover:text-zinc-900 transition-all font-medium"
          >
            Live Demo
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <div className="text-[13px] text-zinc-400">
            No Link
          </div>
        )}

        {id && (
          <button
            onClick={() =>
              router.push(`/portfolio/${id}`)
            }
            className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-all flex items-center gap-2 text-[13px] font-medium"
          >
            Details
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </motion.div>
  )
}