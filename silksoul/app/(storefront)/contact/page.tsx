import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { fetchSiteSettings } from "@/lib/data/loader";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — SilkSoul",
  description:
    "Questions about your ritual, an existing order, or a custom request? The SilkSoul team responds within 24 hours.",
};

export default async function ContactPage() {
  const settings = await fetchSiteSettings();

  const channels = [
    {
      icon: Phone,
      title: "Call Us",
      value: settings.support_phone ?? "+92 300 0000000",
      sub: "Mon–Sat, 10am–7pm PKT",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: (settings.whatsapp_number ?? settings.support_phone ?? "+92 300 0000000").replace(
        /\D/g,
        "",
      ),
      sub: "Fastest for order updates",
    },
    {
      icon: Mail,
      title: "Email",
      value: settings.support_email ?? "care@silksoul.pk",
      sub: "Replies within 24 hours",
    },
  ];

  return (
    <div className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-3xl flex flex-col gap-xl">
      <div className="max-w-2xl">
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          We&apos;re Here For You
        </p>
        <h1 className="font-display text-headline-lg md:text-display-hero-mobile text-on-surface leading-tight mt-2xs">
          Let&apos;s Start a Conversation
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-md leading-relaxed">
          Whether it&apos;s a question about your skin ritual, an update on an order, or a custom
          request — our team responds to every message within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-md">
          {channels.map((channel) => (
            <a
              key={channel.title}
              href={
                channel.title === "WhatsApp"
                  ? `https://wa.me/${channel.value}`
                  : channel.title === "Email"
                    ? `mailto:${channel.value}`
                    : `tel:${channel.value}`
              }
              className="flex items-center gap-md bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant hover:border-secondary/40 hover:shadow-hover transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                <channel.icon className="w-5 h-5 text-on-secondary-container" />
              </div>
              <div className="min-w-0">
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  {channel.title}
                </p>
                <p className="font-body-md text-body-md text-on-surface font-semibold truncate group-hover:text-secondary transition-colors">
                  {channel.title === "WhatsApp" ? `+${channel.value}` : channel.value}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{channel.sub}</p>
              </div>
            </a>
          ))}

          <div className="grid grid-cols-2 gap-sm">
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant">
              <MapPin className="w-5 h-5 text-secondary mb-1" />
              <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Nationwide
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Delivering across all of Pakistan
              </p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant">
              <Clock className="w-5 h-5 text-secondary mb-1" />
              <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Response Time
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Within 24 hours, 7 days a week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}