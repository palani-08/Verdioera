import { company } from "@/lib/config/company";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata = pageMetadata({
  title: "Website Terms",
  description: `Terms of use for the ${company.name} website.`,
  path: "/terms",
});

/** Review with counsel before launch and set company.legal.reviewed = true. */
export default function TermsPage() {
  return (
    <LegalPage title="Website Terms">
      <section>
        <h2>About this website</h2>
        <p>
          This website provides general information about {company.name}, our products, our manufacturing approach and
          our innovation pipeline. It is not an online shop, and no orders are placed through it.
        </p>
      </section>
      <section>
        <h2>Product information</h2>
        <p>
          Product descriptions are for general information. Specifications, pricing, quantities, lead times and other
          commercial terms are confirmed only in a written quotation accepted by both parties.
        </p>
      </section>
      <section>
        <h2>Products under development</h2>
        <p>
          Products described as “Under Development” are not available for sale. Their proposed applications are
          indicative and subject to testing, certification and approval.
        </p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>
          The content, design and illustrations on this website belong to {company.legalName ?? company.name} unless
          stated otherwise, and may not be reused without permission.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>We may update these terms from time to time. The date at the top of this page shows the latest revision.</p>
      </section>
    </LegalPage>
  );
}
