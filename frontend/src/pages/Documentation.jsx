import React, { useState, useMemo } from 'react';
import { 
  Book, 
  Code, 
  Terminal, 
  FileText, 
  Search, 
  Menu, 
  X,
  Copy,
  Check
} from 'lucide-react';

const sidebarNavigation = [
  {
    category: 'Getting Started',
    items: [
      { label: 'Introduction', path: '/docs/intro' },
      { label: 'Installation', path: '/docs/installation' },
      { label: 'Quick Start', path: '/docs/quickstart' }
    ]
  },
  {
    category: 'Core Concepts',
    items: [
      { label: 'Authentication', path: '/docs/authentication' },
      { label: 'Wallet Connection', path: '/docs/wallet-connection' },
      { label: 'Multi-Chain Support', path: '/docs/multi-chain' }
    ]
  },
  {
    category: 'API Reference',
    items: [
      { label: 'Hooks', path: '/docs/hooks' },
      { label: 'Providers', path: '/docs/providers' },
      { label: 'Configuration', path: '/docs/config' }
    ]
  }
];

const CodeBlock = ({ code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg mb-6">
      <pre className="p-6 overflow-x-auto text-sm">
        <code className="text-black dark:text-white">{code}</code>
      </pre>
      <button 
        onClick={handleCopy} 
        className="absolute top-2 right-2 bg-black text-white dark:bg-white dark:text-black p-2 rounded"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const filteredNavigation = useMemo(() => {
    if (!searchTerm) return sidebarNavigation;

    return sidebarNavigation.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen bg-white py-32 dark:bg-black text-black dark:text-white">
      {/* Mobile Menu Toggle */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40 w-64 h-dvh 
        bg-gray-100 dark:bg-gray-900 
        transform transition-transform 
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Search documentation..." 
              className="w-full p-2 pl-10 bg-white dark:bg-black 
                border border-gray-200 dark:border-gray-800 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Navigation */}
          {filteredNavigation.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-lg mb-3">{section.category}</h3>
              {section.items.map((item, itemIndex) => (
                <a 
                  key={itemIndex} 
                  href={item.path} 
                  className="block py-1 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-16 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 
          bg-gradient-to-r from-black via-gray-800 to-black 
          dark:from-white dark:via-gray-200 dark:to-white 
          bg-clip-text text-transparent">
          Documentation
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <CodeBlock 
            code={`
# Install Sila Connect
npm install @sila-connect/core

# Import and initialize
import { SilaProvider } from '@sila-connect/core'

function App() {
  return (
    <SilaProvider>
      {/* Your application */}
    </SilaProvider>
  )
}
            `} 
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Core Hooks</h2>
          <CodeBlock 
            code={`
import { useSila } from '@sila-connect/hooks'

function WalletConnection() {
  const { connect, account } = useSila()

  return (
    <button onClick={connect}>
      {account ? 'Connected' : 'Connect Wallet'}
    </button>
  )
}
            `} 
          />
        </section>
      </div>
    </div>
  );
};

export default Documentation;