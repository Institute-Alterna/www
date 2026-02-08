"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { centreNavItems, rightNavItems } from "@/lib/data/content";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import type { NavItem } from "@/lib/types";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
          open ? "top-2.5 rotate-45" : "top-0.5"
        }`}
      />
      <span
        className={`absolute left-0 top-2.5 block h-0.5 w-6 bg-current transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
          open ? "top-2.5 -rotate-45" : "top-[18px]"
        }`}
      />
    </div>
  );
}

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [hoveredCount, setHoveredCount] = useState(0);
  const [dropdownOffset, setDropdownOffset] = useState(0);
  const hoveredRef = useRef<Set<string>>(new Set());
  const headerContentRef = useRef<HTMLDivElement>(null);
  const showResearch = hoveredCount >= centreNavItems.length;
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Close menus on route change - but keep easter egg state
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      queueMicrotask(() => {
        setActiveDropdown(null);
        setMobileOpen(false);
      });
    }
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header when footer is in view
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Easter egg: track hovered/clicked centre links
  const handleCentreLinkInteract = useCallback((label: string) => {
    if (!hoveredRef.current.has(label)) {
      hoveredRef.current.add(label);
      setHoveredCount(hoveredRef.current.size);
    }
  }, []);

  const handleDropdownEnter = useCallback((label: string) => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const allItems = useMemo(
    () => [...centreNavItems, ...rightNavItems],
    []
  );

  // Track trigger position for megamenu link alignment
  const captureOffset = useCallback(
    (e: React.MouseEvent<HTMLElement>, label: string, isCentre: boolean) => {
      const trigger = e.currentTarget;
      const container = headerContentRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const triggerRect = trigger.getBoundingClientRect();
        setDropdownOffset(triggerRect.left - containerRect.left);
      }
      handleDropdownEnter(label);
      if (isCentre) handleCentreLinkInteract(label);
    },
    [handleDropdownEnter, handleCentreLinkInteract]
  );

  function renderNavItem(item: NavItem, isCentre: boolean) {
    if (item.dropdown) {
      return (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={(e) => captureOffset(e, item.label, isCentre)}
          onMouseLeave={handleDropdownLeave}
        >
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-grey-600 transition-colors hover:text-black">
            {item.label}
            <svg
              className={`h-3 w-3 transition-transform duration-200 ${
                activeDropdown === item.label ? "rotate-180" : ""
              }`}
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
          </button>
        </div>
      );
    }

    if (item.href) {
      return (
        <Link
          key={item.label}
          href={item.href}
          className="px-3 py-2 text-sm font-semibold text-grey-600 transition-colors hover:text-black"
          onMouseEnter={() => {
            if (isCentre) handleCentreLinkInteract(item.label);
          }}
        >
          {item.label}
        </Link>
      );
    }

    return null;
  }

  const headerHidden = footerVisible && !activeDropdown && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerHidden
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        } ${
          scrolled || activeDropdown
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div
          ref={headerContentRef}
          className="mx-auto flex h-16 max-w-7xl items-center px-6"
        >
          {/* Logo - fixed width to balance centering */}
          <div className="flex w-40 shrink-0 items-center">
            <Link href="/">
              <Image
                src="/wordmark.webp"
                alt="Institute Alterna"
                width={120}
                height={32}
                className="h-7 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Centre Nav (Desktop) - flex-1 centred with even spacing */}
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            <AnimatePresence>
              {showResearch && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <Link
                    href="/enrichment"
                    className="px-3 py-2 text-sm font-semibold text-grey-600 transition-colors hover:text-black"
                  >
                    Research
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            {centreNavItems.map((item) => renderNavItem(item, true))}
          </nav>

          {/* Right Nav (Desktop) - fixed width to balance centering */}
          <div className="hidden w-40 shrink-0 items-center justify-end gap-1 lg:flex">
            {rightNavItems.map((item) => renderNavItem(item, false))}
            <Link
              href="/volunteer"
              className="ml-2 inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover active:scale-[0.98]"
            >
              Volunteer
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 ml-auto lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>

        {/* Mega Menu Dropdown (Desktop) */}
        <AnimatePresence mode="wait">
          {activeDropdown &&
            (() => {
              const found = allItems.find(
                (navItem) => navItem.label === activeDropdown
              );
              if (!found?.dropdown) return null;
              return (
                <div
                  key={activeDropdown}
                  onMouseEnter={() => handleDropdownEnter(activeDropdown)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <MegaMenu
                    dropdown={found.dropdown}
                    onClose={() => setActiveDropdown(null)}
                    linkOffset={dropdownOffset}
                  />
                </div>
              );
            })()}
        </AnimatePresence>
      </header>

      {/* Backdrop blur when megamenu is open */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setActiveDropdown(null)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        centreItems={centreNavItems}
        rightItems={rightNavItems}
        showResearch={showResearch}
      />
    </>
  );
}
