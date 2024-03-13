import { Counter } from "./components";
import { Link, Outlet } from "react-router-dom";
import meUrl from "@/assets/me.png";
import octopusUrl from "@/assets/octopus.jpg";
import logoUrl from "@/assets/web-bee-logo.svg?url";
import Logo from "@/assets/web-bee-logo.svg";

const App = () => {
  return (
    <div>
      <img src={meUrl} width={100} />
      <img src={octopusUrl} width={100} />
      <img src={logoUrl} width={100} />
      <Logo width={100} height={100} />
      <Link to={""}>Main</Link>
      <Link to={"./about"}>About</Link>
      <Link to={"./shop"}>Shop</Link>
      <Counter />
      <Outlet />
    </div>
  );
};

export default App;
