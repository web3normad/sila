import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Network, 
  Zap, 
  Github,  
  Code, 
  Users, 
  Terminal, 
  ArrowRight 
} from 'lucide-react';
import { FiGithub } from "react-icons/fi";


const Homepage = () => {
  const features = [
    {
      icon: Shield,
      title: "Seamless Social Authentication",
      description: "Integrate social sign-ins effortlessly with our plug-and-play wallet connect hook."
    },
    {
      icon: Network,
      title: "Account Abstraction",
      description: "Simplify wallet interactions with our advanced account abstraction layer."
    },
    {
      icon: Zap,
      title: "Rapid Development",
      description: "Accelerate your blockchain project with our lightweight, developer-friendly solution."
    }
  ];

  const codeSnippet = `
// Quick start with Sila
import { useSila } from '@sila-connect/hooks'

function App() {
  const { connect, account } = useSila()
  
  return (
    <button onClick={connect}>
      Connect Wallet
    </button>
  )
}`;

  return (
    <div className="min-h-screen py-32 bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 
          bg-gradient-to-r from-black via-gray-800 to-black 
          dark:from-white dark:via-gray-200 dark:to-white 
          bg-clip-text text-transparent">
          Sila: Social Wallet Connect Simplified
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 
          text-gray-700 dark:text-gray-300">
          A plug-and-play hook for seamless social sign-ins and wallet connections 
          with advanced account abstraction. Open-source and developer-friendly.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/documentation" 
            className="flex items-center bg-black text-white 
              dark:bg-white dark:text-black px-6 py-3 
              rounded-lg hover:opacity-90 transition"
          >
            Get Started <ArrowRight className="ml-2" />
          </Link>
          <a 
            href="https://github.com/your-sila-repo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center border border-black 
              dark:border-white px-6 py-3 
              rounded-lg hover:bg-gray-100 
              dark:hover:bg-gray-900 transition"
          >
            <FiGithub className="mr-2" /> GitHub
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-100 dark:bg-gray-900 
                p-6 rounded-lg text-center 
                transform hover:-translate-y-2 transition"
            >
              <feature.icon className="mx-auto mb-4 w-12 h-12 
                text-black dark:text-white" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Example Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-100 dark:bg-gray-900 
          rounded-lg p-8 grid md:grid-cols-2 gap-8 
          items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Developer-First Design
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Integrate Sila in just a few lines of code. 
              Our intuitive API allows you to focus on building, 
              not boilerplate.
            </p>
            <div className="flex items-center">
              <Code className="mr-2" />
              <span>Typescript & React Friendly</span>
            </div>
          </div>
          <div>
            <pre className="bg-black text-white 
              dark:bg-white dark:text-black 
              p-6 rounded-lg overflow-x-auto">
              <code>{codeSnippet.trim()}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Join the Open Source Revolution
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 
          text-gray-700 dark:text-gray-300">
          Contribute to Sila, help shape the future of 
          blockchain authentication and wallet connections.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://github.com/your-sila-repo/contribute" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-black text-white 
              dark:bg-white dark:text-black px-6 py-3 
              rounded-lg hover:opacity-90 transition"
          >
            <Users className="mr-2" /> Contribute
          </a>
          <Link 
            to="/documentation" 
            className="flex items-center border border-black 
              dark:border-white px-6 py-3 
              rounded-lg hover:bg-gray-100 
              dark:hover:bg-gray-900 transition"
          >
            <Terminal className="mr-2" /> Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;