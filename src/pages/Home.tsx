import { Link } from "react-router-dom";
import utensils from "../icons/utensils-solid.svg";

const styles = {
  button: "block rounded-lg w-52 bg-green-400 p-3 mb-3",
};

function Home() {
  return (
    <div className="w-min mx-auto h-screen flex flex-col justify-center items-center">
      <img className="w-20 h-20" src={utensils} alt="Two Chefs Cooking" />
      <h1 className="text-lg text-nowrap my-10 text-center">Fodmap Foods</h1>
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
