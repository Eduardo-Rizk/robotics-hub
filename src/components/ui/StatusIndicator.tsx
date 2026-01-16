import { motion } from 'framer-motion'

interface StatusIndicatorProps {
  status?: 'online' | 'processing' | 'offline'
  showLabel?: boolean
}

export default function StatusIndicator({
  status = 'online',
  showLabel = true
}: StatusIndicatorProps) {
  const statusConfig = {
    online: {
      color: 'bg-emerald-500',
      glow: 'shadow-emerald-500/50',
      label: 'Online',
    },
    processing: {
      color: 'bg-nexus-gold',
      glow: 'shadow-nexus-gold/50',
      label: 'Processando',
    },
    offline: {
      color: 'bg-red-500',
      glow: 'shadow-red-500/50',
      label: 'Offline',
    },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* Pulsing ring */}
        <motion.div
          className={`absolute inset-0 rounded-full ${config.color} opacity-40`}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Core dot */}
        <div
          className={`relative w-2 h-2 rounded-full ${config.color} shadow-lg ${config.glow}`}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {config.label}
        </span>
      )}
    </div>
  )
}
