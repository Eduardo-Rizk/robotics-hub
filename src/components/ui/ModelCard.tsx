import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface ModelCardProps {
  name: string
  provider: string
  icon: LucideIcon
  specs: {
    params: string
    latency: string
  }
  performance: number // 0-100
  isSelected: boolean
  onClick: () => void
  index: number
}

export default function ModelCard({
  name,
  provider,
  icon: Icon,
  specs,
  performance,
  isSelected,
  onClick,
  index,
}: ModelCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative w-full p-4 sm:p-6 rounded-lg text-left transition-all duration-300',
        'border bg-nexus-dark/60 backdrop-blur-sm',
        'group cursor-pointer',
        isSelected
          ? 'border-nexus-gold/50 glow-gold'
          : 'border-nexus-emerald/20 hover:border-nexus-gold/30'
      )}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="model-selection"
          className="absolute inset-0 rounded-lg bg-nexus-gold/5"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300',
              isSelected
                ? 'bg-nexus-gold/20 text-nexus-gold'
                : 'bg-nexus-emerald/20 text-nexus-emerald group-hover:bg-nexus-gold/10 group-hover:text-nexus-gold'
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div
            className={cn(
              'px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors duration-300',
              isSelected
                ? 'bg-nexus-gold/20 text-nexus-gold'
                : 'bg-nexus-dark text-muted-foreground'
            )}
          >
            {provider}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg sm:text-xl font-serif mb-1 text-foreground">
          {name}
        </h3>

        {/* Specs */}
        <div className="flex gap-4 text-xs font-mono text-muted-foreground mb-4">
          <span>{specs.params} params</span>
          <span>{specs.latency} latency</span>
        </div>

        {/* Performance bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
            <span className="text-muted-foreground">Performance</span>
            <span
              className={cn(
                'transition-colors duration-300',
                isSelected ? 'text-nexus-gold' : 'text-muted-foreground'
              )}
            >
              {performance}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-nexus-dark overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full transition-colors duration-300',
                isSelected
                  ? 'bg-gradient-to-r from-nexus-gold to-nexus-amber'
                  : 'bg-nexus-emerald'
              )}
              initial={{ width: 0 }}
              whileInView={{ width: `${performance}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300',
          'bg-gradient-to-t from-nexus-gold/5 to-transparent',
          'group-hover:opacity-100'
        )}
      />
    </motion.button>
  )
}
