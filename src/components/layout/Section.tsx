import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  id?: string
}

export default function Section({
  children,
  className,
  title,
  subtitle,
  id,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('py-12 sm:py-16 lg:py-20', className)}
    >
      {(title || subtitle) && (
        <div className="mb-8 sm:mb-12">
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs font-mono text-nexus-gold uppercase tracking-[0.2em] mb-2"
            >
              {subtitle}
            </motion.p>
          )}
          {title && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-foreground"
            >
              {title}
            </motion.h2>
          )}
        </div>
      )}
      {children}
    </motion.section>
  )
}
