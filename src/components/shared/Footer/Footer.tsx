// components/Footer.tsx
import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, MapPin } from "lucide-react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <Link
              href={"/"}
              className="flex cursor-pointer"
            >
              <Image src={logo} alt="Logo" height={150} width={150} />
            </Link>
            <p className="mb-4">
              Discover hidden street food gems in your city. Join our community
              of food explorers and share your culinary adventures.
            </p>
            <div className="flex items-center space-x-2">
              <MapPin className="text-primary" />
              <span>Currently serving foodies in 15+ cities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Food Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="hover:text-primary transition-colors"
                >
                  Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="/premium"
                  className="hover:text-primary transition-colors"
                >
                  Premium Features
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@flavorquest.app"
                className="flex items-center hover:text-primary transition-colors"
              >
                <Mail className="mr-2 w-5 h-5" /> hello@flavorquest.app
              </a>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-primary transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="hover:text-primary transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-primary transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FlavorQuest. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
