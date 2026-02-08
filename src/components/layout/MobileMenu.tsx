"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { NavItem } from "@/lib/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  centreItems: NavItem[];
  rightItems: NavItem[];
  showResearch: boolean;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="ml-1 h-3 w-3 opacity-50"
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

export default function MobileMenu({
  isOpen,
  onClose,
  centreItems,
  rightItems,
  showResearch,
}: MobileMenuProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const allItems = [...centreItems, ...rightItems];

  // Manage body scroll lock and reset expanded index
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset expanded sections when menu closes
  const handleClose = () => {
    setExpandedIndex(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-white"
        >
          <div className="flex h-full flex-col px-6 pt-20">
            <nav className="flex flex-col gap-1">
              {/* Easter egg: Research link */}
              <AnimatePresence>
                {showResearch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <Link
                      href="/enrichment"
                      onClick={handleClose}
                      className="block py-3 font-heading text-2xl font-semibold"
                    >
                      Research
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {allItems.map((item, index) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setExpandedIndex(
                            expandedIndex === index ? null : index
                          )
                        }
                        className="flex w-full items-center justify-between py-3 font-heading text-2xl font-semibold"
                      >
                        {item.label}
                        <ChevronIcon open={expandedIndex === index} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-3 pl-4">
                              {item.dropdown.links.map((link) => {
                                if (link.external) {
                                  return (
                                    <a
                                      key={link.label}
                                      href={link.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={handleClose}
                                      className="inline-flex items-center py-2 text-lg font-medium text-grey-600"
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
                                    onClick={handleClose}
                                    className="py-2 text-lg font-medium text-grey-600"
                                  >
                                    {link.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="block py-3 font-heading text-2xl font-semibold"
                    >
                      {item.label}
                    </Link>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="mt-auto pb-10">
              <Link
                href="/volunteer"
                onClick={handleClose}
                className="flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3.5 font-body text-base font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
