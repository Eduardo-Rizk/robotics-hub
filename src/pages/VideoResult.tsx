import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share2, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getModelById, getSectorById } from '@/lib/data'

export default function VideoResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    fps: 60,
    latency: 12,
    confidence: 97.8,
    tasksCompleted: 0,
  })

  const { modelId, sectorId } = (location.state as {
    modelId: string
    sectorId: string
  }) || { modelId: 'gr00t', sectorId: 'manufacturing' }

  const modelData = getModelById(modelId)
  const sectorData = getSectorById(sectorId)

  // Simulate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        fps: 58 + Math.floor(Math.random() * 4),
        latency: 10 + Math.floor(Math.random() * 5),
        confidence: 96 + Math.random() * 3,
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-nexus-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono">Voltar</span>
            </motion.button>

            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-mono text-emerald-400">
                Modelo Ativo
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ActionButton icon={Share2} label="Compartilhar" />
              <ActionButton icon={Download} label="Download" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Video Section - Full Width */}
        <div className="relative">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video max-h-[75vh] w-full bg-nexus-darker overflow-hidden"
          >
            {/* Video Player */}
            <video
              src={
                ['pi0', 'gr00t'].includes(modelId)
                  ? '/videos/pick_the_cube.mp4'
                  : '/videos/Pick_the_orange.mp4'
              }
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Scan lines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                }}
              />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-nexus-darker via-transparent to-nexus-darker/50" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-nexus-darker/30 via-transparent to-nexus-darker/30" />

            {/* Corner Brackets */}
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />

            {/* Top overlay - Recording indicator */}
            <div className="absolute top-6 left-6 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono text-red-400 uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>

            {/* Top overlay - Model info */}
            <div className="absolute top-6 right-6">
              <div className="px-4 py-2 rounded-lg bg-nexus-dark/80 backdrop-blur-sm border border-nexus-gold/20">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  Modelo Ativo
                </p>
                <p className="text-sm font-mono text-nexus-gold">
                  {modelData?.name || modelId}
                </p>
              </div>
            </div>

            {/* Bottom overlay - Stats */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex justify-between items-end">
                <div className="flex gap-3">
                  <StatCard label="FPS" value={stats.fps} />
                  <StatCard label="Latência" value={`${stats.latency}ms`} />
                  <StatCard
                    label="Confiança"
                    value={`${stats.confidence.toFixed(1)}%`}
                    highlight
                  />
                </div>
                <div className="flex gap-3">
                  <StatCard
                    label="Tarefas"
                    value={stats.tasksCompleted.toLocaleString()}
                  />
                </div>
              </div>
            </div>

            {/* Scanner line */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-nexus-gold/60 to-transparent"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Model Info */}
            <InfoCard
              title="Modelo VLA"
              value={modelData?.name || modelId}
              description={`${modelData?.provider || 'Provider'} • ${modelData?.specs.params || ''} parâmetros`}
            />

            {/* Sector Info */}
            <InfoCard
              title="Setor Industrial"
              value={sectorData?.title || sectorId}
              description={sectorData?.subtitle || 'Otimizado para operações específicas'}
            />

            {/* Status */}
            <InfoCard
              title="Status"
              value="Executando"
              description="O modelo está processando dados em tempo real"
              status="active"
            />
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-4 mt-8"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-nexus-gold/30 bg-nexus-gold/10 text-nexus-gold hover:bg-nexus-gold/20 transition-colors font-mono text-sm uppercase tracking-wider"
            >
              <RotateCcw className="w-4 h-4" />
              Novo Fine-Tune
            </button>
          </motion.div>
        </div>
      </main>
    </motion.div>
  )
}

function ActionButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      className="p-2 rounded-lg border border-nexus-gold/20 bg-nexus-dark/50 text-muted-foreground hover:text-nexus-gold hover:border-nexus-gold/40 transition-colors"
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string | number
  highlight?: boolean
}) {
  return (
    <div className="px-4 py-3 rounded-lg bg-nexus-dark/80 backdrop-blur-sm border border-nexus-gold/10">
      <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className={`text-xl font-mono tabular-nums ${
          highlight ? 'text-nexus-gold' : 'text-foreground'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function InfoCard({
  title,
  value,
  description,
  status,
}: {
  title: string
  value: string
  description: string
  status?: 'active' | 'inactive'
}) {
  return (
    <div className="p-6 rounded-xl border border-nexus-gold/20 bg-nexus-dark/40 backdrop-blur-sm">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className="flex items-center gap-2 mb-2">
        {status === 'active' && (
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        )}
        <p className="text-xl font-serif text-foreground capitalize">{value}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function CornerBracket({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4 rotate-90',
    'bottom-left': 'bottom-4 left-4 -rotate-90',
    'bottom-right': 'bottom-4 right-4 rotate-180',
  }

  return (
    <div
      className={`absolute w-8 h-8 pointer-events-none ${positionClasses[position]}`}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-nexus-gold/60" />
      <div className="absolute top-0 left-0 w-[2px] h-full bg-nexus-gold/60" />
    </div>
  )
}
