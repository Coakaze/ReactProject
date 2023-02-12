import { createBrowserRouter } from 'react-router-dom';
import NavigationComp from './components/NavigationComp';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import SecretRoutes from './components/SecretRoutes';
import AuthContextProvider from './store/auth-context';
import CartWrapper from './components/CartWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavigationComp></NavigationComp>,
    children: [
      { path: '/home', element: <HomePage></HomePage> },
      { path: '/menu', element: <SecretRoutes hideIfLogged={false}><MenuPage></MenuPage></SecretRoutes> },
      { path: '/login', element: <SecretRoutes hideIfLogged={true}><LoginPage></LoginPage></SecretRoutes> },
      { path: '/register', element: <SecretRoutes hideIfLogged={true}><RegisterPage></RegisterPage></SecretRoutes> },
      { path: '/cart', element: <SecretRoutes hideIfLogged={false}><CartPage></CartPage></SecretRoutes> }
    ]
  }
]);

function App() {
  return (
    <AuthContextProvider>
      <CartWrapper route={router}></CartWrapper>
    </AuthContextProvider>
  );
}

export default App;
