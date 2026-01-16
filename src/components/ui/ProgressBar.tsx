import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  status?: string
  className?: string
}

export default function ProgressBar({
  progress,
  status,
  className,
}: ProgressBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('space-y-3', className)}
    >
      {/* Status text */}
      {status && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-mono text-muted-foreground">{status}</p>
          <p className="text-sm font-mono text-nexus-gold tabular-nums">
            {progress.toFixed(0)}%
          </p>
        </div>
      )}

      {/* Progress bar container */}
      <div className="relative h-2 rounded-full bg-nexus-dark border border-nexus-gold/20 overflow-hidden">
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 20px)',
          }}
          animate={{ x: [0, 20] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-nexus-gold via-nexus-amber to-nexus-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Glow at progress end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-nexus-gold rounded-full blur-md"
          style={{ left: `calc(${progress}% - 8px)` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {[0, 25, 50, 75, 100].map((step) => (
          <div
            key={step}
            className={cn(
              'flex flex-col items-center',
              progress >= step ? 'text-nexus-gold' : 'text-muted-foreground'
            )}
          >
            <div
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-colors duration-300',
                progress >= step ? 'bg-nexus-gold' : 'bg-nexus-dark'
              )}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
