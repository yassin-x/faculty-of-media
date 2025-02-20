import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const socialLinks = [
    {
      id: crypto.randomUUID(),
      name: "Facebook",
      href: "https://www.facebook.com",
    },
    {
      id: crypto.randomUUID(),
      name: "Instagram",
      href: "https://www.instagram.com",
    },
    {
      id: crypto.randomUUID(),
      name: "Website",
      href: "https://www.bsu.edu.eg",
    },
  ];
  const ourLinks = [
    {
      id: crypto.randomUUID(),
      name: "WhatsApp",
      href: "https://www.whatsapp.com",
    },
    {
      id: crypto.randomUUID(),
      name: "Phone Call",
      href: "tel:+20123456789",
    },
    {
      id: crypto.randomUUID(),
      name: "Email",
      href: "mailto:bsu@edu.eg",
    },
  ];
  return (
    <footer className="container">
      <div className="flex justify-around items-center py-4">
        <div className="flex flex-col items-center space-x-4 space-y-2">
          <Image
            src={"/bsu-logo.png"}
            alt="bsu-logo"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
          <h2 className="text-lg text-accent">
            BSU - Faculty Of Media & Communication
          </h2>
        </div>
        <div>
          <h2 className="text-primary text-2xl font-bold mb-4">Social Links</h2>
          <ul className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-accent hover:text-primary transition-colors duration-300 ease-in-out"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-primary text-2xl font-bold mb-4">Our Links</h2>
          <ul className="flex flex-col gap-2">
            {ourLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-accent hover:text-primary transition-colors duration-300 ease-in-out"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t p-8 text-center text-accent">
        <p>All rights reserved &copy; 2025</p>
      </div>
    </footer>
  );
}
