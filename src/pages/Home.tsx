import { Link } from "react-router-dom";
import logo from "../icons/logo.png";

const styles = {
  button: "block rounded-lg w-52 bg-green-400 p-3 mb-3",
};

function Home() {
  return (
    <div className="w-min mx-auto h-screen flex flex-col justify-center items-center">
      <img className="w-28 h-28 rounded-full" src={logo} alt="App Logo" />
      <h1 className="text-lg text-nowrap mt-10 text-center">FODMAP FOSS</h1>
      <p className="mb-10">Free & Open Source</p>
      <Link to="/food">
        <button className={styles.button}>Search</button>
      </Link>
      <Link to="/about">
        <button className={styles.button}>About</button>
      </Link>
      <Link to="/donate">
        <button className={styles.button}>Donate</button>
      </Link>
    </div>
  );
}

export default Home;
