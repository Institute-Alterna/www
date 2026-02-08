import Link from "next/link";
import Image from "next/image";
import {
  siteConfig,
  footerProgrammes,
  footerOrganisation,
  socialLinks,
} from "@/lib/data/content";
import { footerRandomText } from "@institute-alterna/footer-quotes";

export default function Footer() {
  return (
    <footer className="bg-black text-grey-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/wordmark.webp"
                alt="Institute Alterna"
                width={120}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-grey-500">
              Programmes
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerProgrammes.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className="text-sm font-medium transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organisation */}
          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-grey-500">
              Organisation
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerOrganisation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className="text-sm font-medium transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-grey-500">
              Connect
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors hover:text-white"
                    aria-label={link.label}
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-grey-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-grey-600">
              &copy; {new Date().getFullYear()} Institute Alterna. Trademark
              rights reserved. The content of this site and most materials are
              open source under the{""}{" "}
              <a
                href="https://github.com/Institute-Alterna/www/blob/main/LICENSE"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT Licence
              </a>{" "}
              on{" "}
              <a
                href="https://github.com/institute-alterna/www"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
            <p className="text-xs italic text-grey-600">{footerRandomText()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
