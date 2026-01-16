import Section from '../layout/Section'
import ModelCard from '../ui/ModelCard'
import { models } from '@/lib/data'

interface ModelSelectionProps {
  selectedModel: string | null
  onSelectModel: (id: string) => void
}

export default function ModelSelection({
  selectedModel,
  onSelectModel,
}: ModelSelectionProps) {
  return (
    <Section
      id="models"
      title="Selecione o Modelo VLA"
      subtitle="Inteligência Robótica"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((model, index) => (
          <ModelCard
            key={model.id}
            name={model.name}
            provider={model.provider}
            icon={model.icon}
            specs={model.specs}
            performance={model.performance}
            isSelected={selectedModel === model.id}
            onClick={() => onSelectModel(model.id)}
            index={index}
          />
        ))}
      </div>
    </Section>
  )
}
