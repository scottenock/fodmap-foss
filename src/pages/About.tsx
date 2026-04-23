import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import CreatedBy from "../components/CreatedBy";

const styles = {
  section: "mb-5",
};

function About() {
  return (
    <>
      <NavBar />
      <div className="p-3">
        <section className={styles.section}>
          <h1 className="font-bold text-lg mb-4">About FODMAPs</h1>
          <p className="mb-3">
            FODMAPs are short chain carbohydrates (sugars) that are poorly
            absorbed by the small intestine.
          </p>
          <p className="mb-3">
            The low FODMAP diet is designed to help manage symptoms of irritable
            bowel syndrome (IBS) and other functional gastrointestinal
            disorders. It involves restricting foods high in certain fermentable
            carbohydrates:
          </p>
          <div className="mb-4">
            <p className="mb-3 font-medium">Oligos</p>
            <div className="border-b-2 border-gray-300 mb-2" />
            <p className="mb-3 font-medium">Lactose</p>
            <div className="border-b-2 border-gray-300 mb-2" />
            <p className="mb-3 font-medium">Fructose</p>
            <div className="border-b-2 border-gray-300 mb-2" />
            <p className="mb-3 font-medium">Polyols</p>
            <div className="border-b-2 border-gray-300 mb-2" />
          </div>
          <p className="mb-3 font-medium">
            Each food is categorized into the following two groups depending on
            their concentrations of the above carbohydrates:
          </p>

          <div className="mb-3">
            <div className="flex items-center my-1">
              <span
                className={`rounded-full w-5 h-5 block mr-2 bg-green-300`}
              />
              <p className="text-2xl">LOW</p>
            </div>
            <div className="border-b-2 border-gray-300 mb-2" />
            <ul className="list-disc list-inside">
              <li>Considered safe to eat</li>
              <li>Does not take into account food allergies</li>
              <li>Some foods have daily consumption limits</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center my-1">
              <span className={`rounded-full w-5 h-5 block mr-2 bg-red-500`} />
              <p className="text-2xl">HIGH</p>
            </div>
            <div className="border-b-2 border-gray-300 mb-2" />
            <ul className="list-disc list-inside">
              <li>Avoid during the elimiation phase of the diet</li>
              <li>slowly reintroduce to see which ones are troublesome.</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className="font-bold text-lg mb-4">
            Three Steps of The FODMAP Diet
          </h2>
          <p className="mb-3">The low FODMAP is a three-step elimination diet:</p>
          <ol className="list-decimal list-inside">
            <li className="mb-1">
              Stop eating certain foods that are HIGH FODMAP
            </li>
            <li className="mb-1">
              slowly reintroduce them to see which ones are troublesome
            </li>
            <li className="mb-1">
              Avoid and limit the foods you have identified which cause
              symptoms, and enjoy everything else
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className="font-bold text-lg mb-4">Support the Project</h2>
          <p className="mb-3">
            This app is FOSS (Free and Open Source Software), which doesn't
            track or spy on you.
          </p>
          <p className="mb-3">
            If you have found this app beneficial we encourage you to donate{" "}
            <Link className="text-red-500" to="/donate">
              here.
            </Link>
          </p>
          <p className="mb-3">
            The source code of this app is viewable{" "}
            <Link
              className="text-red-500"
              target="_blank"
              to="https://github.com/ScottEnock/fodmap-foss"
            >
              here.
            </Link>
          </p>
        </section>

        <section className={styles.section}>
          <h2 className="font-bold text-lg mb-4">Disclaimer</h2>
          <p className="mb-3">
            We do not perform any testing ourselves. The data provided is
            compiled from several different sources, and should be used as a
            guideline not as a basis of fact.
          </p>
          <p className="mb-3">
            Please consult your physician before beginning any new diet.
          </p>
        </section>

        <CreatedBy />
      </div>
    </>
  );
}

export default About;
