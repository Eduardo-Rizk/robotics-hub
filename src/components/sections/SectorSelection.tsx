import { Building2, Beef, Zap, Factory, Home } from 'lucide-react'
import Section from '../layout/Section'
import SectorCard from '../ui/SectorCard'

const sectors = [
  {
    id: 'construction',
    title: 'Construção Civil',
    subtitle: 'Building the Future',
    icon: Building2,
    useCases: ['Inspeção', 'Montagem', 'Logística'],
  },
  {
    id: 'agriculture',
    title: 'Pecuária Bovina',
    subtitle: 'Smart Agriculture',
    icon: Beef,
    useCases: ['Monitoramento', 'Alimentação', 'Saúde'],
  },
  {
    id: 'energy',
    title: 'Distribuição de Energia',
    subtitle: 'Power Grid Intelligence',
    icon: Zap,
    useCases: ['Manutenção', 'Inspeção', 'Diagnóstico'],
  },
  {
    id: 'manufacturing',
    title: 'Indústria',
    subtitle: 'Manufacturing 4.0',
    icon: Factory,
    useCases: ['Assembly', 'QC', 'Paletização'],
  },
  {
    id: 'domestic',
    title: 'Serviços Domésticos',
    subtitle: 'Home Robotics',
    icon: Home,
    useCases: ['Limpeza', 'Organização', 'Assistência'],
  },
]

interface SectorSelectionProps {
  selectedSector: string | null
  onSelectSector: (id: string) => void
}

export default function SectorSelection({
  selectedSector,
  onSelectSector,
}: SectorSelectionProps) {
  return (
    <Section
      id="sectors"
      title="Selecione o Setor Industrial"
      subtitle="Aplicação"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {sectors.map((sector, index) => (
          <SectorCard
            key={sector.id}
            title={sector.title}
            subtitle={sector.subtitle}
            icon={sector.icon}
            useCases={sector.useCases}
            isSelected={selectedSector === sector.id}
            onClick={() => onSelectSector(sector.id)}
            index={index}
          />
        ))}
      </div>
    </Section>
  )
}
