import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Dashboard from './pages/Dashboard'
import Processing from './pages/Processing'
import VideoResult from './pages/VideoResult'
import Background from './components/layout/Background'

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-gradient-mesh">
        <Background />
        <div className="noise-overlay" />
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/processing" element={<Processing />} />
              <Route path="/result" element={<VideoResult />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
