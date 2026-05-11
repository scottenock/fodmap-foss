import NavBar from "../components/NavBar";

const sections = [
  {
    title: "Introduction",
    body: `Welcome to FODMAP FOSS ("we", "our", "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and protect your information when you use our app.`,
  },
  {
    title: "Data Collection",
    body: "We are proud to inform you that our app does not collect any personal data:",
    bullets: [
      "No user information is gathered or stored.",
      "No cookies or tracking technologies are used.",
      "No third-party analytics or advertising services are integrated into the app.",
    ],
  },
  {
    title: "No Permissions Required",
    body: "Our app operates independently of any device permissions. We do not request access to any phone permissions.",
  },
  {
    title: "Data Security",
    body: "Even though we do not collect any personal data, we still implement industry-standard security measures to protect the app and ensure a secure user experience. This includes regular updates and maintenance to protect against potential vulnerabilities.",
  },
  {
    title: "Changes to this Privacy Policy",
    body: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.",
  },
];

function PrivacyPolicy() {
  return (
    <div className="pb-8">
      <NavBar title="Privacy Policy" />

      <div className="px-4 pt-4 space-y-4">
        {sections.map((s) => (
          <section
            key={s.title}
            className="bg-background-primary rounded-2xl border border-divider overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-divider">
              <h2 className="font-semibold text-base text-foreground-primary">
                {s.title}
              </h2>
            </div>
            <div className="px-4 py-4 space-y-2 text-sm text-foreground-secondary leading-relaxed">
              <p>{s.body}</p>
              {s.bullets && (
                <ul className="space-y-1 pt-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-foreground-muted shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default PrivacyPolicy;
