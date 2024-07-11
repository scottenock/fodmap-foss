import NavBar from "../components/NavBar";
import Para from "../components/Para";

const styles = {
  button: "block rounded-lg w-52 bg-green-400 p-3 mb-3",
  section: "mb-5",
};

function Donate() {
  return (
    <>
      <NavBar />
      <div className="p-3">
        <section className={styles.section}>
          <h2 className="font-bold text-lg mb-4">Support the Project</h2>
          <Para>
            This app is FOSS (Free and Open Source Software), which doesn't
            track or spy on you.
          </Para>
          <Para>
            If you have found this app beneficial we encourage you to donate
            here.
          </Para>
          <Para>The source code of this app is viewable here.</Para>
        </section>
      </div>
    </>
  );
}

export default Donate;
