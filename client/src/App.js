import 'App.css';
import AdminLayout from 'layouts/admin'
import AuthLayout from 'layouts/auth'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { basePath } from 'url';
import ErrorPage from 'views/ErrorPage';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from 'url';
import { useEffect } from 'react';
function App() {
  const authorize = async () => {
    await fetch(`${baseUrl}?authorization=${localStorage.getItem('token')}`)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (!response.status) {
          localStorage.clear();
          // window.location.reload();
        }
      })
  }
  useEffect(() => {
    authorize()
  }, [])

  return (
    <Router>
      <ToastContainer />
      {localStorage.getItem('token') ? (
        <Routes>
          <Route path={`/${basePath}/admin/*`} element={<AdminLayout />} />
          <Route path={`/${basePath}/error`} element={<ErrorPage />} />
          <Route path="*" element={<Navigate to={`/${basePath}/admin/*`} replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={`/${basePath}/auth/*`} element={<AuthLayout />} />
          <Route path="*" element={<Navigate to={`/${basePath}/auth/*`} replace />} />
          <Route path={`/${basePath}/error`} element={<ErrorPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

