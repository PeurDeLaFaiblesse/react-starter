import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Admin front</h1>
      <Outlet />
    </div>
  );
};

export default App;
