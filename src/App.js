import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Evenement } from './pages/Evenement';
import Evenements from './pages/Evenements';
import CreateEvent from './pages/CreateEvent';
import LayoutNavBar from './layouts/LayoutNavBar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      <Route path='layoutnavbar' element={<LayoutNavBar />}>
        <Route path='evenements' element={<Evenements />}>
          <Route path=':eventId' element={<Evenement />} />
        </Route>
        <Route path='evenements/:userId/create' element={<CreateEvent />} />
      </Route>
      
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;