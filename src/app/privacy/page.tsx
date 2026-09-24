import Link from "next/link";
import { company } from "@/lib/config/company";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${company.name} collects and uses information submitted through this website.`,
  path: "/privacy",
});

/**
 * Written to match what this codebase actually does. Review with counsel
 * (and set company.legal.reviewed = true) before launch — PRD §11 & §15.
 */
export default function PrivacyPage() {
  const contactEmail = company.legal.privacyContactEmail ?? company.email;
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by {company.legalName ?? company.name}. This policy explains what information we
          collect through the website and how we use it.
        </p>
      </section>
      <section>
        <h2>Information you give us</h2>
        <p>When you submit an enquiry, we collect:</p>
        <ul>
          <li>your full name, company name, business email and phone number;</li>
          <li>your enquiry type, product interest, expected quantity and location;</li>
          <li>the message you write;</li>
          <li>a record of your consent, the time of submission and the page you submitted from.</li>
        </ul>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>
          We use this information to respond to your enquiry, prepare quotations and follow up on your requirements.
          We do not sell your information.
        </p>
      </section>
      <section>
        <h2>Service providers</h2>
        <p>
          Enquiries are delivered to our sales team using a transactional email provider and, where configured, our
          customer management tools. These providers process data on our behalf only to deliver that service.
        </p>
      </section>
      <section>
        <h2>Technical information</h2>
        <p>
          To protect the enquiry form from abuse, our servers temporarily process your IP address to limit repeated
          submissions. This website does not use advertising cookies.
        </p>
      </section>
      <section>
        <h2>Retention</h2>
        <p>
          {company.legal.enquiryRetention ??
            "We keep enquiry information only for as long as needed to respond to you and manage any resulting business relationship."}
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete the information you have submitted.{" "}
          {contactEmail ? (
            <>
              Email <a className="text-forest underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </>
          ) : (
            <>
              Contact us through the <Link className="text-forest underline" href="/contact">enquiry form</Link>.
            </>
          )}
        </p>
      </section>
    </LegalPage>
  );
}
