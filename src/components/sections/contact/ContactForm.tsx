'use client'

import { motion, Variants } from 'framer-motion'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react'

import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

const socialLinks = [
  {
    title: 'Instagram',
    user: '@instagram',
    icon: FaInstagram,
    link: 'https://www.instagram.com/itsmeikky_12?igsh=ZHFpMTJ1bHQzeDAx',
  },
  {
    title: 'Youtube',
    user: '@youtube',
    icon: FaYoutube,
    link: 'https://youtube.com/@zettaajah?si=QRjJGD4zCQG8aIHX',
  },
  {
    title: 'Github',
    user: '@github',
    icon: FaGithub,
    link: 'https://github.com/RifqiMuhammadAliya12',
  },
  {
    title: 'TikTok',
    user: '@tiktok',
    icon: FaTiktok,
    link: 'https://www.tiktok.com/@itsme.ikky_?_r=1&_t=ZS-95yAYr5PHUb',
  },
]

export default function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] border border-zinc-200/80 bg-white/80 backdrop-blur-xl p-5 md:p-8 flex flex-col h-full shadow-sm"
    >
      {/* HEADER */}
      <motion.div
        variants={fieldVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-zinc-900">
          Hubungi Saya
        </h2>

        <p className="text-sm text-zinc-500 mb-7">
          Feel free to reach out if you want to collaborate,
          discuss ideas, or simply say hello.
        </p>
      </motion.div>

      {/* FORM */}
      <div className="space-y-4">
        {/* NAME */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />

            <input
              placeholder="Your Name"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 pl-12 pr-4 py-4 text-zinc-900 placeholder:text-zinc-400 outline-none transition duration-200 focus:bg-white focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
            />
          </div>
        </motion.div>

        {/* EMAIL */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.16 }}
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />

            <input
              placeholder="Your Email"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 pl-12 pr-4 py-4 text-zinc-900 placeholder:text-zinc-400 outline-none transition duration-200 focus:bg-white focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
            />
          </div>
        </motion.div>

        {/* MESSAGE */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.22 }}
        >
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-zinc-400" />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 pl-12 pr-4 py-4 text-zinc-900 placeholder:text-zinc-400 outline-none resize-none transition duration-200 focus:bg-white focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
            />
          </div>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.28 }}
          whileHover={{
            scale: 1.04,
            transition: { duration: 0.12 },
          }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-2xl py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send size={16} />
          Send Message
        </motion.button>
      </div>

      {/* SOCIAL */}
      <div className="border-t border-zinc-200 pt-5 mt-6">
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.34 }}
          className="text-sm font-medium text-zinc-500 mb-4"
        >
          Connect With Me
        </motion.p>

        {/* LINKEDIN */} 
        <motion.a
          href="https://www.linkedin.com/in/rifqimuhammadaliya/"  
          target="_blank"
          rel="noopener noreferrer"
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.36 }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.12 },
          }}
          className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/80 hover:bg-zinc-100 p-4 mb-3 flex items-center justify-between transition-colors"
        >
          <div className="absolute inset-0 bg-zinc-900/[0.03] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

          <div className="relative z-10 flex items-center gap-3">
            <FaLinkedinIn className="text-zinc-700" />

            <div>
              <p className="text-sm font-medium text-zinc-900">LinkedIn</p>
              <p className="text-xs text-zinc-400">@linkedin</p>
            </div>
          </div>

          <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
            <div className="w-7 h-7 rounded-lg bg-zinc-200 text-zinc-700 flex items-center justify-center">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.a>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fieldVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                transition={{
                  delay: 0.42 + i * 0.05,
                }}
                whileHover={{
                  scale: 1.04,
                  transition: { duration: 0.12 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/80 hover:bg-zinc-100 p-3 flex items-center justify-between transition-colors"
              >
                <div className="absolute inset-0 bg-zinc-900/[0.03] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                <div className="relative z-10 flex items-center gap-3">
                  <Icon className="text-zinc-700" />

                  <div>
                    <p className="text-sm font-medium text-zinc-900">{item.title}</p>
                    <p className="text-[11px] text-zinc-400">
                      {item.user}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
                  <div className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-700 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}