import Home from './components/pages/home'
import CreateProject from './components/pages/createProject'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
       <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/createProject" element={<CreateProject/>}/>

        </Routes>

    </Router>
  )
}

export default App
