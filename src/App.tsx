import { Counter } from './components';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Link to={''}>Main</Link>
      <Link to={'./about'}>About</Link>
      <Link to={'./shop'}>Shop</Link>
      <Counter />
      <Counter />
      <Counter />
      <Outlet />
    </div>
  );
};

export default App;
