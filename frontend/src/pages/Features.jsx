import React, { useState } from 'react';
import { 
  Shield, 
  Code, 
  Network, 
  Zap, 
  Lock, 
  Globe, 
  Users, 
  ArrowRight 
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, advanced }) => (
  <div className={`
    bg-gray-100 dark:bg-gray-900 
    p-6 rounded-lg 
    transform hover:-translate-y-2 transition
    ${advanced ? 'dark:border-white' : ''}
  `}>
    <Icon className="mb-4 w-12 h-12 text-black dark:text-white" />
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
    {advanced && (
      <span className="text-sm font-bold bg-black text-white 
        dark:bg-white dark:text-black px-3 py-1 rounded">
        Advanced
      </span>
    )}
  </div>
);

const Features = () => {
  const [activeTab, setActiveTab] = useState('core');

  const coreFeatures = [
    {
      icon: Shield,
      title: "Social Sign-In",
      description: "Seamless authentication using popular social platforms."
    },
    {
      icon: Network,
      title: "Wallet Connection",
      description: "Easy integration with multiple blockchain wallets."
    },
    {
      icon: Code,
      title: "Plug & Play Hook",
      description: "Simple, intuitive API for rapid blockchain integration."
    }
  ];

  const advancedFeatures = [
    {
      icon: Lock,
      title: "Account Abstraction",
      description: "Simplify complex wallet interactions with advanced abstraction.",
      advanced: true
    },
    {
      icon: Globe,
      title: "Multi-Chain Support",
      description: "Seamless authentication across different blockchain networks.",
      advanced: true
    },
    {
      icon: Users,
      title: "Developer Community",
      description: "Built with and for developers, continuously improving.",
      advanced: true
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
          Sila Features
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 
          text-gray-700 dark:text-gray-300">
          Powerful, flexible, and developer-friendly blockchain authentication
        </p>
      </div>

      {/* Features Tabs */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-2 inline-flex">
            <button
              onClick={() => setActiveTab('core')}
              className={`
                px-6 py-2 rounded-full transition
                ${activeTab === 'core' 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'text-gray-600 dark:text-gray-300'}
              `}
            >
              Core Features
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`
                px-6 py-2 rounded-full transition
                ${activeTab === 'advanced' 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'text-gray-600 dark:text-gray-300'}
              `}
            >
              Advanced Features
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {(activeTab === 'core' ? coreFeatures : advancedFeatures).map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
            />
          ))}
        </div>
      </div>

      {/* Code Example */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-100 dark:bg-gray-900 
          rounded-lg p-8 grid md:grid-cols-2 gap-8 
          items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Quick Integration
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Start using Sila in minutes with our straightforward API.
              Minimal configuration, maximum functionality.
            </p>
            <div className="flex items-center space-x-4">
              <Zap className="text-black dark:text-white" />
              <span>TypeScript & React Friendly</span>
            </div>
          </div>
          <div>
            <pre className="bg-black text-white 
              dark:bg-white dark:text-black 
              p-6 rounded-lg overflow-x-auto">
              <code>{`
// Quick Sila Integration
import { useSila } from '@sila-connect/hooks'

function App() {
  const { connect, account } = useSila()
  
  return (
    <button onClick={connect}>
      Connect Wallet
    </button>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Simplify Your Workflow?
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 
          text-gray-700 dark:text-gray-300">
          Dive into Sila and transform how you handle blockchain authentication
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/documentation" 
            className="flex items-center bg-black text-white 
              dark:bg-white dark:text-black px-6 py-3 
              rounded-lg hover:opacity-90 transition"
          >
            Get Started <ArrowRight className="ml-2" />
          </a>
          <a 
            href="/demo" 
            className="flex items-center border border-black 
              dark:border-white px-6 py-3 
              rounded-lg hover:bg-gray-100 
              dark:hover:bg-gray-900 transition"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;