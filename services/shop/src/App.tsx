import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Shop front</h1>
      <Link to={"."}>main</Link>
      <Link to={"./help"}>help</Link>
      <Outlet />
    </div>
  );
};

export default App;
