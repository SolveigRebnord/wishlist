import { Outlet } from "react-router";
import Header from "./components/Header";
import "./styles/index.scss";

function App() {
  return (
    <>
  
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;

