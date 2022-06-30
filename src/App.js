import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Calendar from './components/pages/Calendar/Calendar';
import CompletedTasks from './components/pages/CompletedTasks/CompletedTasks';
import Home from './components/pages/Home/Home';
import ToDo from './components/pages/ToDo.js/ToDo';
import Login from './components/shared/Login';
import Navbar from './components/shared/Navbar';
import RequireAuth from './components/shared/RequireAuth';
import SignUp from './components/shared/SignUp';
import auth from './firebase.init';

function App() {
  const [user] = useAuthState(auth);

  return (
    <section>
      {
        user && <Navbar></Navbar>
      }
     <Routes>
      <Route path='/' element={
        <RequireAuth>
          <Home></Home>
        </RequireAuth>
      }></Route>
      <Route path='/home' element={
        <RequireAuth>
          <Home></Home>
        </RequireAuth>
      }></Route>
      <Route path='/todo' element={
        <RequireAuth>
          <ToDo></ToDo>
        </RequireAuth>
      }></Route>
      <Route path='/calendar' element={
        <RequireAuth>
          <Calendar></Calendar>
        </RequireAuth>
      }></Route>
      <Route path='/completedTasks' element={
        <RequireAuth>
          <CompletedTasks></CompletedTasks>
        </RequireAuth>
      }></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
     </Routes>
     <ToastContainer></ToastContainer>
    </section>
  );
}

export default App;
