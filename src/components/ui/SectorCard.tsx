import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface SectorCardProps {
  title: string
  subtitle: string
  icon: LucideIcon
  useCases: string[]
  isSelected: boolean
  onClick: () => void
  index: number
  disabled?: boolean
}

export default function SectorCard({
  title,
  subtitle,
  icon: Icon,
  useCases,
  isSelected,
  onClick,
  index,
  disabled = false,
}: SectorCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        'relative w-full p-5 sm:p-6 rounded-lg text-left transition-all duration-300',
        'border backdrop-blur-sm group overflow-hidden',
        disabled
          ? 'cursor-not-allowed opacity-50 border-gray-600/30 bg-nexus-dark/20'
          : 'cursor-pointer',
        !disabled && isSelected
          ? 'border-nexus-gold/50 bg-nexus-gold/5 glow-gold'
          : !disabled && 'border-nexus-emerald/20 bg-nexus-dark/40 hover:border-nexus-gold/30 hover:bg-nexus-dark/60'
      )}
    >
      {/* Animated background on selection */}
      {isSelected && (
        <motion.div
          layoutId="sector-selection"
          className="absolute inset-0 bg-gradient-to-br from-nexus-gold/10 to-transparent"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300',
            disabled
              ? 'bg-gray-600/10 text-gray-500'
              : isSelected
                ? 'bg-nexus-gold/20 text-nexus-gold shadow-lg shadow-nexus-gold/20'
                : 'bg-nexus-emerald/10 text-nexus-emerald/80 group-hover:bg-nexus-gold/10 group-hover:text-nexus-gold'
          )}
        >
          <Icon className="w-7 h-7" />
        </div>

        {/* Text */}
        <h3
          className={cn(
            'text-lg font-serif mb-1 transition-colors duration-300',
            isSelected ? 'text-nexus-gold' : 'text-foreground'
          )}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 font-sans">
          {subtitle}
        </p>

        {/* Use cases preview */}
        <div className="flex flex-wrap gap-1.5">
          {useCases.slice(0, 2).map((useCase, i) => (
            <span
              key={i}
              className={cn(
                'px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition-colors duration-300',
                isSelected
                  ? 'bg-nexus-gold/20 text-nexus-gold'
                  : 'bg-nexus-dark/80 text-muted-foreground'
              )}
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>

      {/* Corner accent */}
      <div
        className={cn(
          'absolute top-0 right-0 w-20 h-20 transition-opacity duration-300',
          'bg-gradient-to-bl from-nexus-gold/10 to-transparent',
          disabled
            ? 'opacity-0'
            : isSelected
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-50'
        )}
      />
    </motion.button>
  )
}
