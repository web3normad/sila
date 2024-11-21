import React from 'react';
import { Star, Code, BookOpen, Users } from 'lucide-react';
import { FiGithub } from "react-icons/fi";

const OpenSourceCard = ({ icon: Icon, title, description, links }) => (
  <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg transform hover:-translate-y-2 transition">
    <Icon className="mb-4 w-12 h-12 text-black dark:text-white" />
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
    <div className="flex space-x-4">
      {links.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          className="flex items-center text-black dark:text-white hover:opacity-80 transition"
        >
          {link.icon && <link.icon className="mr-2" size={20} />}
          {link.text}
        </a>
      ))}
    </div>
  </div>
);

const OpenSource = () => {
  const repositories = [
    {
      icon: FiGithub,
      title: "Sila Connect Core",
      description: "Our primary authentication and wallet connection library.",
      links: [
        { 
          text: "Repository", 
          url: "https://github.com/your-org/sila-connect", 
          icon: FiGithub
        },
        { 
          text: "Documentation", 
          url: "/docs", 
          icon: BookOpen 
        }
      ]
    },
    {
      icon: Code,
      title: "React Hooks Library",
      description: "Simplified blockchain authentication hooks for React developers.",
      links: [
        { 
          text: "Repository", 
          url: "https://github.com/your-org/react-hooks", 
          icon: FiGithub
        },
        { 
          text: "NPM Package", 
          url: "https://npmjs.com/package/sila-hooks", 
          icon: Star 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-32 dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 
          bg-gradient-to-r from-black via-gray-800 to-black 
          dark:from-white dark:via-gray-200 dark:to-white 
          bg-clip-text text-transparent">
          Open Source
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 
          text-gray-700 dark:text-gray-300">
          Transparent, community-driven blockchain development
        </p>
      </div>

      {/* Repositories Grid */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {repositories.map((repo, index) => (
            <OpenSourceCard 
              key={index} 
              {...repo} 
            />
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gray-100 dark:bg-gray-900 
          rounded-lg p-12 
          flex flex-col items-center">
          <Users className="mb-6 w-16 h-16 text-black dark:text-white" />
          <h2 className="text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
            We believe in collaborative development. Contribute, share feedback, 
            and help shape the future of blockchain authentication.
          </p>
          <div className="flex space-x-4">
            <a 
              href="/contribute" 
              className="flex items-center bg-black text-white 
                dark:bg-white dark:text-black px-6 py-3 
                rounded-lg hover:opacity-90 transition"
            >
              Contribute <Code className="ml-2" />
            </a>
            <a 
              href="/discord" 
              className="flex items-center border border-black 
                dark:border-white px-6 py-3 
                rounded-lg hover:bg-gray-100 
                dark:hover:bg-gray-900 transition"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenSource;