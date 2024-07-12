import NavBar from "../components/NavBar";
import Para from "../components/Para";
import xmrQR from "../assets/xmr-qr.jpeg";

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
          </Para>
          <Para>
            We, the company which originally created FODMAP FOSS, have decided
            to make FODMAP FOSS free and open-source software (FOSS) because we
            believe in the openness of the Internet and we want to be a
            counterpart to all the ones who want to force people to store their
            private data in "the cloud" (say: other people's computers), using
            proprietary standards.
          </Para>
        </section>
        <section className={styles.section}>
          <h2 className="font-bold text-lg mb-4">Donate Via Monero (XMR)</h2>
          <Para>
            We currently accept donations via the cryptocurrency: Monero. Like
            cash, Monero is fungible, preserves user privacy, and is censorship
            resistant. Making it the easiest way to transact, think of it as
            digital cash.
          </Para>
          <img
            className="w-44 h-44 mx-auto"
            src={xmrQR}
            alt="QR code for XMR address"
          />
          <code className="break-words bg-gray-300">
            895DX5KJXNzasRzRUL7p5GF6WnVvkARiTjWost12bWLdE7wgcCtwsYUNL6fva9wvgTBVwU75Mz8cMKmMbNacCcRhNMYxRQx
          </code>
        </section>

        <section className={styles.section}>
          <h2 className="font-bold text-lg mb-4">Other Ways to Support</h2>
          <Para>If you want to help the project, here are some ideas:</Para>
          <ul className="list-disc list-inside">
            <li>Tell your friend's about the project</li>
            <li>Give us a star on Github</li>
            <li>If you have a feature idea, tell us!</li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default Donate;
