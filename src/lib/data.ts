import { Brain, Cpu, Sparkles, Code2, Building2, Beef, Zap, Factory, Home } from 'lucide-react'

export const models = [
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

export const sectors = [
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

export function getModelById(id: string) {
  return models.find((m) => m.id === id)
}

export function getSectorById(id: string) {
  return sectors.find((s) => s.id === id)
}
