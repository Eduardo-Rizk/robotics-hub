import Section from '../layout/Section'
import SectorCard from '../ui/SectorCard'
import { sectors } from '@/lib/data'

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
