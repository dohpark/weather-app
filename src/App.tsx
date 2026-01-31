import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>메인 페이지</div>} />
      <Route path="/detail/:locationId" element={<div>상세 페이지</div>} />
    </Routes>
  )
}

export default App
