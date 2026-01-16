import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface VideoDisplayProps {
  className?: string
  src?: string
}

export default function VideoDisplay({
  className,
  src = '/videos/Pick_the_orange.mp4',
}: VideoDisplayProps) {
  const [stats, setStats] = useState({
    fps: 60,
    latency: 12,
    confidence: 97.8,
  })

  // Simulate changing stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        fps: 58 + Math.floor(Math.random() * 4),
        latency: 10 + Math.floor(Math.random() * 5),
        confidence: 96 + Math.random() * 3,
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'relative rounded-lg overflow-hidden tech-border hologram',
        className
      )}
    >
      {/* Scanner line effect */}
      <div className="scanner-line" />

      {/* Video container */}
      <div className="aspect-video bg-nexus-darker relative">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-nexus-darker/80 via-transparent to-nexus-darker/40" />
      </div>

      {/* Data overlay - Top */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">
            REC
          </span>
        </div>
        <div className="px-3 py-1 rounded bg-nexus-dark/80 backdrop-blur-sm border border-nexus-gold/20">
          <span className="text-[10px] font-mono text-nexus-gold uppercase tracking-wider">
            VLA Model Active
          </span>
        </div>
      </div>

      {/* Data overlay - Bottom */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        <div className="flex justify-between items-end">
          {/* Stats left */}
          <div className="flex gap-4">
            <StatBlock label="FPS" value={stats.fps} unit="" />
            <StatBlock label="Latência" value={stats.latency} unit="ms" />
          </div>

          {/* Stats right */}
          <div className="text-right">
            <StatBlock
              label="Confiança"
              value={stats.confidence.toFixed(1)}
              unit="%"
              highlight
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 rounded-full bg-nexus-dark/80 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-nexus-gold to-nexus-amber"
            animate={{ width: ['0%', '100%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {/* Corner brackets */}
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />
    </motion.div>
  )
}

function StatBlock({
  label,
  value,
  unit,
  highlight = false,
}: {
  label: string
  value: string | number
  unit: string
  highlight?: boolean
}) {
  return (
    <div className="px-3 py-2 rounded bg-nexus-dark/80 backdrop-blur-sm border border-nexus-gold/10">
      <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p
        className={cn(
          'text-lg font-mono tabular-nums',
          highlight ? 'text-nexus-gold' : 'text-foreground'
        )}
      >
        {value}
        <span className="text-xs text-muted-foreground ml-0.5">{unit}</span>
      </p>
    </div>
  )
}

function CornerBracket({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}) {
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2 rotate-90',
    'bottom-left': 'bottom-2 left-2 -rotate-90',
    'bottom-right': 'bottom-2 right-2 rotate-180',
  }

  return (
    <div
      className={cn(
        'absolute w-6 h-6 pointer-events-none',
        positionClasses[position]
      )}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-nexus-gold/50" />
      <div className="absolute top-0 left-0 w-0.5 h-full bg-nexus-gold/50" />
    </div>
  )
}
