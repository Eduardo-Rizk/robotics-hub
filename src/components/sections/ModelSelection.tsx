import { Brain, Cpu, Sparkles, Code2 } from 'lucide-react'
import Section from '../layout/Section'
import ModelCard from '../ui/ModelCard'

const models = [
  {
    id: 'pi0',
    name: 'π0 (Pi Zero)',
    provider: 'Physical Intelligence',
    icon: Brain,
    specs: { params: '3B', latency: '45ms' },
    performance: 94,
  },
  {
    id: 'gr00t',
    name: 'Gr00t',
    provider: 'NVIDIA',
    icon: Cpu,
    specs: { params: '7B', latency: '32ms' },
    performance: 98,
  },
  {
    id: 'smolvla',
    name: 'SmolVLA',
    provider: 'Hugging Face',
    icon: Sparkles,
    specs: { params: '1.5B', latency: '28ms' },
    performance: 86,
  },
  {
    id: 'openvla',
    name: 'OpenVLA',
    provider: 'Open Source',
    icon: Code2,
    specs: { params: '2B', latency: '38ms' },
    performance: 89,
  },
]

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
