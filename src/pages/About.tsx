import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import CreatedBy from "../components/CreatedBy";

const fodmapCategories = [
  { label: "Oligos",   description: "Fructans & GOS found in wheat, onions, legumes" },
  { label: "Lactose",  description: "Disaccharide found in dairy products" },
  { label: "Fructose", description: "Monosaccharide found in fruits & honey" },
  { label: "Polyols",  description: "Sugar alcohols found in some fruits & sweeteners" },
];

const steps = [
  "Eliminate all high FODMAP foods from your diet.",
  "Slowly reintroduce them one at a time to identify which ones trigger symptoms.",
  "Avoid only the foods that cause you problems — enjoy everything else.",
];

function About() {
  return (
    <div className="pb-8">
      <NavBar title="About" />

      <div className="px-4 pt-4 space-y-4">

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-base text-gray-800 dark:text-gray-100">What are FODMAPs?</h2>
          </div>
          <div className="px-4 py-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              FODMAPs are short-chain carbohydrates (sugars) that are poorly absorbed
              by the small intestine. They ferment in the gut, causing symptoms in
              people with IBS and other functional gastrointestinal disorders.
            </p>
            <p>The acronym stands for four types of fermentable carbohydrates:</p>
          </div>
          <div className="px-4 pb-4 grid grid-cols-2 gap-2">
            {fodmapCategories.map((c) => (
              <div key={c.label} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{c.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">{c.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wide px-1">
            FODMAP Levels
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-green-400 shrink-0" />
              <p className="font-bold text-green-800 dark:text-green-300 text-base tracking-wide">LOW</p>
            </div>
            <ul className="space-y-1">
              {[
                "Generally safe to eat",
                "Does not account for food allergies",
                "Some foods have daily consumption limits",
              ].map((item) => (
                <li key={item} className="text-sm text-green-700 dark:text-green-400 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
              <p className="font-bold text-red-800 dark:text-red-300 text-base tracking-wide">HIGH</p>
            </div>
            <ul className="space-y-1">
              {[
                "Avoid during the elimination phase",
                "Slowly reintroduce to identify problem foods",
              ].map((item) => (
                <li key={item} className="text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-base text-gray-800 dark:text-gray-100">The Three Steps</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">A structured elimination diet</p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-green-400 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-base text-gray-800 dark:text-gray-100">Open Source</h2>
          </div>
          <div className="px-4 py-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              FODMAP FOSS is free and open-source software — it does not track or
              spy on you. All data is stored locally on your device.
            </p>
            <div className="flex gap-3 pt-1">
              <Link
                to="/donate"
                className="flex-1 text-center bg-green-400 text-white font-medium py-2.5 rounded-xl text-sm"
              >
                Donate
              </Link>
              <Link
                to="https://github.com/ScottEnock/fodmap-foss"
                target="_blank"
                className="flex-1 text-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2.5 rounded-xl text-sm"
              >
                View Source
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl px-4 py-4">
          <div className="flex gap-3">
            <span className="text-amber-500 text-lg leading-none shrink-0">⚠</span>
            <div>
              <p className="font-semibold text-sm text-amber-800 dark:text-amber-300 mb-1">Disclaimer</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                The data provided is compiled from multiple sources and should be used
                as a guideline, not as a basis of fact. Please consult your physician
                before beginning any new diet.
              </p>
            </div>
          </div>
        </section>

        <CreatedBy />
      </div>
    </div>
  );
}

export default About;
