import { Routes, Route } from 'react-router-dom'
import { MainPage } from '@/pages/main'
import { DetailPage } from '@/pages/detail'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/detail/:locationId" element={<DetailPage />} />
    </Routes>
  )
}
