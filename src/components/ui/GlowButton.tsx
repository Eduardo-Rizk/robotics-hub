import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface GlowButtonProps {
  variant?: 'green' | 'gold'
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = 'green', icon: Icon, children, disabled, onClick }, ref) => {
    const variants = {
      green: {
        base: 'border-nexus-emerald/50 bg-nexus-emerald/20',
        hover: 'hover:bg-nexus-emerald/30 hover:border-nexus-emerald',
        glow: 'shadow-nexus-emerald/30',
        text: 'text-emerald-300',
        gradient: 'from-nexus-emerald to-emerald-600',
      },
      gold: {
        base: 'border-nexus-gold/50 bg-nexus-gold/10',
        hover: 'hover:bg-nexus-gold/20 hover:border-nexus-gold',
        glow: 'shadow-nexus-gold/30',
        text: 'text-nexus-gold',
        gradient: 'from-nexus-gold to-nexus-amber',
      },
    }

    const v = variants[variant]

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled}
        className={cn(
          'relative px-8 py-4 rounded-lg font-sans font-semibold text-sm uppercase tracking-wider',
          'border backdrop-blur-sm transition-all duration-300',
          'flex items-center justify-center gap-3',
          v.base,
          !disabled && v.hover,
          v.text,
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={onClick}
      >
        {/* Glow effect */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300',
            `shadow-[0_0_30px_rgba(var(--glow-color),0.4)]`
          )}
          style={{
            '--glow-color':
              variant === 'gold' ? '212, 175, 55' : '27, 77, 62',
          } as React.CSSProperties}
          whileHover={{ opacity: disabled ? 0 : 1 }}
        />

        {/* Animated border gradient */}
        <div
          className={cn(
            'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300',
            !disabled && 'group-hover:opacity-100'
          )}
          style={{
            background: `linear-gradient(135deg, ${
              variant === 'gold'
                ? 'rgba(212, 175, 55, 0.3)'
                : 'rgba(27, 77, 62, 0.3)'
            }, transparent)`,
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </span>

        {/* Ripple effect placeholder - could add on click */}
      </motion.button>
    )
  }
)

GlowButton.displayName = 'GlowButton'

export default GlowButton
