import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings2, Rocket } from 'lucide-react'
import Section from '../layout/Section'
import GlowButton from '../ui/GlowButton'
import ProgressBar from '../ui/ProgressBar'

interface CommandCenterProps {
  selectedModel: string | null
  selectedSector: string | null
}

export default function CommandCenter({
  selectedModel,
  selectedSector,
}: CommandCenterProps) {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [action, setAction] = useState<'fine-tune' | 'deploy' | null>(null)

  const canProceed = selectedModel && selectedSector

  const handleAction = (actionType: 'fine-tune' | 'deploy') => {
    if (!canProceed) return

    setAction(actionType)
    setIsProcessing(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Navigate to processing page
          setTimeout(() => {
            navigate('/processing', {
              state: {
                model: selectedModel,
                sector: selectedSector,
                action: actionType,
              },
            })
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const getStatusText = () => {
    if (progress < 20) return 'Inicializando sistemas...'
    if (progress < 40) return 'Verificando configurações...'
    if (progress < 60) return 'Conectando ao cluster...'
    if (progress < 80) return 'Preparando ambiente...'
    return 'Finalizando...'
  }

  return (
    <Section id="command" title="Centro de Comando" subtitle="Ações">
      <div className="max-w-2xl mx-auto">
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlowButton
            variant="green"
            icon={Settings2}
            onClick={() => handleAction('fine-tune')}
            disabled={!canProceed || isProcessing}
            className="flex-1 sm:flex-initial"
          >
            Fine-Tune
          </GlowButton>

          <GlowButton
            variant="gold"
            icon={Rocket}
            onClick={() => handleAction('deploy')}
            disabled={!canProceed || isProcessing}
            className="flex-1 sm:flex-initial"
          >
            Deploy
          </GlowButton>
        </div>

        {/* Status message when no selection */}
        {!canProceed && !isProcessing && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground mt-6 font-mono"
          >
            Selecione um modelo e um setor para continuar
          </motion.p>
        )}

        {/* Progress bar */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8"
            >
              <ProgressBar
                progress={Math.min(progress, 100)}
                status={getStatusText()}
              />

              {/* Action indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-dark border border-nexus-gold/20">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Executando:
                  </span>
                  <span className="text-sm font-mono text-nexus-gold capitalize">
                    {action === 'fine-tune' ? 'Fine-Tuning' : 'Deploy'}
                  </span>
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
