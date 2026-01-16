import Section from '../layout/Section'
import VideoDisplay from '../ui/VideoDisplay'

export default function VideoDemo() {
  return (
    <Section
      id="demo"
      title="Demonstração Visual"
      subtitle="VLA em Ação"
    >
      <div className="max-w-4xl mx-auto">
        <VideoDisplay />

        {/* Caption */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground font-sans">
            Visualização em tempo real do modelo VLA processando dados sensoriais e
            executando ações autônomas.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Stat label="Precisão" value="99.2%" />
            <Stat label="Uptime" value="99.9%" />
            <Stat label="Tarefas/h" value="1,247" />
          </div>
        </div>
      </div>
    </Section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="text-lg font-mono text-nexus-gold">{value}</p>
    </div>
  )
}
