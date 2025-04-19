import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Dashboard from './pages/dashbord';
import SheikhDashboard from './pages/sheikhDashbord';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Route d'accueil */}
        <Route path="/" element={<h1>Bienvenue sur la plateforme de mémorisation du Coran</h1>} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/sheikh"
          element={
            <PrivateRoute>
              <SheikhDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
