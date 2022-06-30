import { Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home/Home';

function App() {
  return (
    <section>
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
     </Routes>
    </section>
  );
}

export default App;
