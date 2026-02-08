"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { NavDropdown } from "@/lib/types";

interface MegaMenuProps {
  dropdown: NavDropdown;
  onClose: () => void;
  linkOffset?: number;
}

function ExternalIcon() {
  return (
    <svg
      className="ml-1.5 h-3.5 w-3.5 opacity-40"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7M17 7H7M17 7V17"
      />
    </svg>
  );
}

// Natural left offset of the links column from the container edge:
// px-6 (24px) + description column (320px) + gap-12 (48px) = 392px
const LINKS_NATURAL_OFFSET = 392;

export default function MegaMenu({
  dropdown,
  onClose,
  linkOffset = 0,
}: MegaMenuProps) {
  const extraMargin = Math.max(0, linkOffset - LINKS_NATURAL_OFFSET);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="absolute left-0 right-0 top-full z-50 overflow-hidden border-t border-grey-800 bg-black"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, delay: 0.1 }}
        className="mx-auto grid max-w-7xl grid-cols-[20rem_1fr] gap-12 px-6 py-8"
      >
        {/* Description column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-grey-500">
            {dropdown.heading}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-grey-400">
            {dropdown.description}
          </p>
        </div>

        {/* Links column - aligned under the trigger */}
        <div
          className="flex flex-col gap-0.5"
          style={{ marginLeft: `${extraMargin}px` }}
        >
          {dropdown.links.map((link) => {
            const linkClass =
              "inline-flex items-center py-1.5 text-base font-medium text-grey-400 cursor-pointer transition-colors hover:text-white";
            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className={linkClass}
                >
                  {link.label}
                  <ExternalIcon />
                </a>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={linkClass}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
