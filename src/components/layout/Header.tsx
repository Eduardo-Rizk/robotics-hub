import { motion } from 'framer-motion'
import StatusIndicator from '../ui/StatusIndicator'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-nexus-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                {/* Logo mark */}
                <div className="absolute inset-0 bg-gradient-to-br from-nexus-gold to-nexus-amber rounded-lg rotate-45 transform" />
                <div className="absolute inset-1 bg-nexus-dark rounded-md rotate-45 transform" />
                <span className="absolute inset-0 flex items-center justify-center text-nexus-gold font-serif text-lg sm:text-xl font-bold">
                  T
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-serif tracking-wide">
                  <span className="gradient-text">TIKVA</span>
                </h1>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-nexus-gold/20" />
            <p className="hidden md:block text-xs text-muted-foreground font-mono tracking-wider uppercase">
              Centro de Inteligência Robótica
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4">
            <StatusIndicator />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-nexus-gold/20 bg-nexus-dark/50">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Sistema
              </span>
              <span className="text-xs font-mono text-nexus-gold">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
