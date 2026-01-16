import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings2, Rocket } from 'lucide-react'
import Header from '@/components/layout/Header'
import ModelSelection from '@/components/sections/ModelSelection'
import SectorSelection from '@/components/sections/SectorSelection'
import GlowButton from '@/components/ui/GlowButton'

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)

  const canProceed = selectedModel && selectedSector

  const handleFineTune = () => {
    if (!canProceed) return
    navigate('/processing', {
      state: {
        model: selectedModel,
        sector: selectedSector,
        action: 'fine-tune',
      },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <main className="pt-20 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="py-8 sm:py-12 lg:py-16 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full border border-nexus-gold/30 bg-nexus-gold/5 text-xs font-mono text-nexus-gold uppercase tracking-wider">
                Primeiro Centro de IA Robótica do Brasil
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
              <span className="text-foreground">Treine e Deploy de</span>
              <br />
              <span className="gradient-text text-glow-gold">
                Modelos VLA
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
              Plataforma de ponta para treinamento e testagem de modelos
              Vision-Language-Action — os cérebros de robôs autônomos.
            </p>
          </motion.section>

          {/* Model Selection */}
          <ModelSelection
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />

          {/* Sector Selection */}
          <SectorSelection
            selectedSector={selectedSector}
            onSelectSector={setSelectedSector}
          />

          {/* Action Buttons */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-12 sm:py-16"
          >
            <div className="max-w-xl mx-auto">
              {/* Status message when no selection */}
              {!canProceed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground mb-8 font-mono"
                >
                  Selecione um modelo e um setor para continuar
                </motion.p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton
                  variant="green"
                  icon={Settings2}
                  onClick={handleFineTune}
                  disabled={!canProceed}
                  className="flex-1 sm:flex-initial min-w-[200px]"
                >
                  Fine-Tune
                </GlowButton>

                <GlowButton
                  variant="gold"
                  icon={Rocket}
                  disabled={true}
                  className="flex-1 sm:flex-initial min-w-[200px] opacity-40"
                >
                  Deploy
                  <span className="ml-2 text-[10px] opacity-60">(Em breve)</span>
                </GlowButton>
              </div>

              {/* Selection summary */}
              {canProceed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 rounded-lg border border-nexus-gold/20 bg-nexus-dark/50"
                >
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Configuração selecionada
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span className="text-nexus-gold font-mono capitalize">
                      {selectedModel}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-nexus-amber font-mono capitalize">
                      {selectedSector}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="mt-8 pt-8 border-t border-nexus-gold/10 text-center">
            <p className="text-xs font-mono text-muted-foreground">
              © 2024 TIKVA — Centro de Inteligência Robótica
            </p>
            <p className="text-[10px] font-mono text-muted-foreground/60 mt-2">
              Construindo o futuro da robótica brasileira
            </p>
          </footer>
        </div>
      </main>
    </motion.div>
  )
}
