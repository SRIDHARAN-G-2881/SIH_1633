import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './pages/login';
function App() {
  return (
     <Main/>
  );
}

function Main(){

   return(
    <Router>
        <Routes>
         <Route path='/' element={<Login/>}/>

        </Routes>
    </Router>
    
   )
}

export default App;
