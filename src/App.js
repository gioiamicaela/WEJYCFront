import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './render/LoginPage';
import Home from './render/Home';
import { useSelector, useDispatch } from 'react-redux';

const ProtectedRoute = ({ token, children }) => {
  if (token.token) {
    return children;
  }
  return <Navigate to='/login' />;
};

function App() {
  const token = useSelector((state) => {
    return state.token;
  });

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <ProtectedRoute token={token}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
