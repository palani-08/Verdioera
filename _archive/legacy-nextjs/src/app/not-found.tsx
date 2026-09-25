import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <section>
      <Container width="narrow" className="py-24 sm:py-32">
        <Eyebrow className="mb-6">404</Eyebrow>
        <h1 className="display-lg">This page isn’t in our catalogue.</h1>
        <p className="lede mt-6 text-stone">The page you’re looking for may have moved, or the link may be incorrect.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            Explore products
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
