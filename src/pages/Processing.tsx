import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { getModelById, getSectorById } from '@/lib/data'

const statusMessages = [
  'Inicializando sistemas...',
  'Conectando ao cluster de GPUs...',
  'Carregando modelo base...',
  'Processando parâmetros...',
  'Otimizando para o setor selecionado...',
  'Compilando configurações...',
  'Verificando integridade...',
  'Preparando ambiente de execução...',
  'Finalizando...',
  'Sistema pronto!',
]

export default function Processing() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentStatus, setCurrentStatus] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const hasNavigated = useRef(false)

  const { modelId, sectorId, action } = (location.state as {
    modelId: string
    sectorId: string
    action: 'fine-tune' | 'deploy'
  }) || { modelId: 'gr00t', sectorId: 'manufacturing', action: 'fine-tune' }

  const modelData = getModelById(modelId)
  const sectorData = getSectorById(sectorId)

  // Auto-navigate to video result when complete
  useEffect(() => {
    if (isComplete && !hasNavigated.current) {
      hasNavigated.current = true
      const timer = setTimeout(() => {
        navigate('/result', {
          state: { modelId, sectorId },
        })
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isComplete, navigate, modelId, sectorId])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsComplete(true)
          return 100
        }
        return prev + 0.8
      })
    }, 50)

    const statusInterval = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev >= statusMessages.length - 1) {
          clearInterval(statusInterval)
          return statusMessages.length - 1
        }
        return prev + 1
      })
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(statusInterval)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Neural Network Animation */}
        <div className="relative mb-12">
          <NeuralNetworkAnimation isComplete={isComplete} />
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Action badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nexus-gold/30 bg-nexus-gold/5 mb-6">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {action === 'fine-tune' ? 'Fine-Tuning' : 'Deploying'}:
            </span>
            <span className="text-sm font-mono text-nexus-gold">
              {modelData?.name || modelId}
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="text-sm font-mono text-nexus-amber">
              {sectorData?.title || sectorId}
            </span>
          </div>

          {/* Status message */}
          <motion.h2
            key={currentStatus}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-serif text-foreground mb-8"
          >
            {isComplete ? (
              <span className="flex items-center justify-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
                Sistema Pronto!
              </span>
            ) : (
              statusMessages[currentStatus]
            )}
          </motion.h2>

          {/* Progress bar */}
          <div className="relative h-2 rounded-full bg-nexus-dark border border-nexus-gold/20 overflow-hidden mb-4">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-nexus-gold via-nexus-amber to-nexus-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress percentage */}
          <p className="text-sm font-mono text-nexus-gold tabular-nums">
            {progress.toFixed(0)}%
          </p>

          {/* Redirect notice when complete */}
          {isComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm font-mono text-muted-foreground"
            >
              Redirecionando para o resultado...
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

function NeuralNetworkAnimation({ isComplete }: { isComplete: boolean }) {
  const nodes = [
    // Input layer
    { x: 50, y: 80, layer: 0 },
    { x: 50, y: 160, layer: 0 },
    { x: 50, y: 240, layer: 0 },
    // Hidden layer 1
    { x: 150, y: 60, layer: 1 },
    { x: 150, y: 120, layer: 1 },
    { x: 150, y: 180, layer: 1 },
    { x: 150, y: 240, layer: 1 },
    // Hidden layer 2
    { x: 250, y: 80, layer: 2 },
    { x: 250, y: 160, layer: 2 },
    { x: 250, y: 240, layer: 2 },
    // Output layer
    { x: 350, y: 120, layer: 3 },
    { x: 350, y: 200, layer: 3 },
  ]

  const connections = nodes.flatMap((node, i) =>
    nodes
      .filter((n) => n.layer === node.layer + 1)
      .map((target, j) => ({
        x1: node.x,
        y1: node.y,
        x2: target.x,
        y2: target.y,
        delay: i * 0.05 + j * 0.02,
      }))
  )

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      <svg viewBox="0 0 400 320" className="w-full h-auto">
        {/* Connections */}
        {connections.map((conn, i) => (
          <motion.line
            key={i}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke={isComplete ? '#10b981' : '#D4AF37'}
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              delay: conn.delay,
              repeat: isComplete ? 0 : Infinity,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Data flow pulses */}
        {!isComplete &&
          connections.map((conn, i) => (
            <motion.circle
              key={`pulse-${i}`}
              r="3"
              fill="#D4AF37"
              initial={{ opacity: 0 }}
              animate={{
                cx: [conn.x1, conn.x2],
                cy: [conn.y1, conn.y2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: conn.delay + 0.5,
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
            />
          ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={i}>
            {/* Glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="15"
              fill={isComplete ? '#10b981' : '#D4AF37'}
              opacity={0.2}
              animate={
                isComplete
                  ? {}
                  : {
                      r: [15, 20, 15],
                      opacity: [0.2, 0.4, 0.2],
                    }
              }
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
            {/* Core */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill={isComplete ? '#10b981' : '#D4AF37'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                delay: i * 0.05,
              }}
            />
            {/* Inner */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#0A1F1C"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                delay: i * 0.05 + 0.1,
              }}
            />
          </motion.g>
        ))}

        {/* Labels */}
        <text x="50" y="280" fill="#6b7280" fontSize="10" textAnchor="middle">
          Input
        </text>
        <text x="200" y="280" fill="#6b7280" fontSize="10" textAnchor="middle">
          Hidden Layers
        </text>
        <text x="350" y="280" fill="#6b7280" fontSize="10" textAnchor="middle">
          Output
        </text>
      </svg>
    </div>
  )
}
