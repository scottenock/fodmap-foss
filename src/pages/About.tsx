import NavBar from "../components/NavBar";
import Para from "../components/Para";

const styles = {
  button: "block rounded-lg w-52 bg-green-400 p-3 mb-3",
  section: "mb-5",
};

function About() {
  return (
    <>
      <NavBar />
      <div className="p-3">
        <section className={styles.section}>
          <h1 className="font-bold text-lg mb-4">About FODMAPs</h1>
          <Para>
            FODMAPs are short chain carbohydrates (sugars) that are poorly
            absorbed by the small intestine.
          </Para>
          <Para>
            The low FODMAP diet is designed to help manage symptoms of irritable
            bowel syndrome (IBS) and other functional gastrointestinal
            disorders. It involves restricting foods high in certain fermentable
            carbohydrates:
          </Para>
          <div className="mb-4">
            <Para className="font-medium">Oligos</Para>
            <div className="border-b-2 border-gray-300 mb-2" />
            <Para className="font-medium">Lactose</Para>
            <div className="border-b-2 border-gray-300 mb-2" />
            <Para className="font-medium">Fructose</Para>
            <div className="border-b-2 border-gray-300 mb-2" />
            <Para className="font-medium">Polyols</Para>
            <div className="border-b-2 border-gray-300 mb-2" />
          </div>
          <Para className="font-medium mb-3">
            Each food is categorized into the following two groups depending on
            their concentrations of the above carbohydrates:
          </Para>

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
          <Para>The low FODMAP is a three-step elimination diet:</Para>
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

        <section className={styles.section}>
          <h2 className="font-bold text-lg mb-4">Disclaimer</h2>
          <Para>
            We do not perform any testing ourselves. The data provided is
            compiled from several different sources, and should be used as a
            guideline not as a basis of fact.
          </Para>
          <Para>
            Please consult your physician before beginning any new diet.
          </Para>
        </section>
      </div>
    </>
  );
}

export default About;
