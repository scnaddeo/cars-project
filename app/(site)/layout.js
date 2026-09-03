import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";

export default function SiteLayout({ children }) {
  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
