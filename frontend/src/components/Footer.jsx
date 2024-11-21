import React from 'react';
import { 
  Globe, 
  Mail 
} from 'lucide-react';
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Logo from "../assets/images/sila.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiTwitter, url: 'https://twitter.com/yourusername' },
    { icon: FiGithub, url: 'https://github.com/yourorg' },
    { icon: FiLinkedin, url: 'https://linkedin.com/company/yourcompany' },
  ];

  const footerNavigation = [
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/features' },
        { label: 'Documentation', url: '/docs' },
        { label: 'Open Source', url: '/open-source' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', url: '/blog' },
        { label: 'Community', url: '/community' },
        { label: 'Support', url: '/support' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
          <div className="w-24 h-24 rounded-md flex items-center justify-center">
                  <img
                    src={Logo}
                    alt="sila logo"
                    className="w-full h-full object-contain filter dark:invert"
                  />
                </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Simplifying blockchain authentication for developers.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black dark:text-white hover:opacity-75 transition"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerNavigation.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="text-gray-600 dark:text-gray-400 
                      hover:text-black dark:hover:text-white transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-2 pr-10 bg-white dark:bg-black 
                border border-gray-200 dark:border-gray-800 rounded"
              />
              <Mail className="absolute right-3 top-3 text-gray-400" />
            </div>
            <button 
              className="mt-4 w-full bg-black text-white 
              dark:bg-white dark:text-black py-2 rounded 
              hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 
          text-center text-gray-600 dark:text-gray-400">
          © {currentYear} Sila. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;