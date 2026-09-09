import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { fetchSiteSettings } from "@/lib/data/loader";

export async function StorefrontFrame({ children }: { children: React.ReactNode }) {
  const settings = await fetchSiteSettings();
  const announcement =
    settings.announcement_bar_enabled && settings.announcement_bar_text
      ? settings.announcement_bar_text
      : null;

  return (
    <>
      <Navbar announcementBarText={announcement} />
      <main className="w-full pt-[104px] bg-background flex-1">{children}</main>
      <Footer />
    </>
  );
}