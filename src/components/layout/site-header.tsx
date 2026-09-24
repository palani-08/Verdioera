import { mainNav, quoteHref } from "@/lib/config/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <Container width="wide" className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden xl:block">
          <NavLinks items={mainNav} />
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href={quoteHref} className="hidden min-h-11 px-5 text-sm sm:inline-flex">
            Request a Quote
          </ButtonLink>
          <div className="xl:hidden">
            <MobileNav items={mainNav} quoteHref={quoteHref} />
          </div>
        </div>
      </Container>
    </header>
  );
}
