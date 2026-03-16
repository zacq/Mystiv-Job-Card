'use client'

import { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  icon?: string
  children: ReactNode
}

export function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-brand-700 to-brand-600 flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        <h2 className="text-base font-semibold text-white tracking-wide">{title}</h2>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {children}
      </div>
    </section>
  )
}
