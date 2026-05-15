import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Create from './pages/Create'
import TDocument from './pages/Document'
import Documents from './pages/Documents'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/documents" />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:id" element={<TDocument />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Navigate to="/documents" />} />
      </Routes>
    </Layout>
  )
}

export default App
