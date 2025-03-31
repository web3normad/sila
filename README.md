# Sila: Social Wallet Connect Simplified

<p align="center">
  <img src="/api/placeholder/200/200" alt="Sila Logo" />
</p>

> A plug-and-play hook for seamless social sign-ins and wallet connections with advanced account abstraction. Open-source and developer-friendly.

[![GitHub license](https://img.shields.io/github/license/web3normad/sila)](https://github.com/web3normad/sila/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@sila-connect/hooks)](https://www.npmjs.com/package/@sila-connect/hooks)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/web3normad/sila/pulls)

## 🚀 Features

- **Seamless Social Authentication** - Integrate social sign-ins effortlessly with our plug-and-play wallet connect hook
- **Account Abstraction** - Simplify wallet interactions with our advanced account abstraction layer
- **Rapid Development** - Accelerate your blockchain project with our lightweight, developer-friendly solution
- **TypeScript & React Support** - First-class TypeScript and React support for modern development workflows

## 📦 Installation

```bash
# Using npm
npm install @sila-connect/hooks

# Using yarn
yarn add @sila-connect/hooks

# Using pnpm
pnpm add @sila-connect/hooks
```

## 🔧 Quick Start

```tsx
// Quick start with Sila
import { useSila } from '@sila-connect/hooks'

function App() {
  const { connect, account } = useSila()
  
  return (
    <div>
      <button onClick={connect}>
        Connect Wallet
      </button>
      {account && <p>Connected: {account.address}</p>}
    </div>
  )
}
```

## 🛠️ Setup

### Provider Setup

Wrap your application with the `SilaProvider` to access Sila hooks throughout your app:

```tsx
import { SilaProvider } from '@sila-connect/hooks'

function MyApp({ Component, pageProps }) {
  return (
    <SilaProvider
      config={{
        projectId: 'YOUR_PROJECT_ID',
        chains: ['ethereum', 'polygon'],
        socialProviders: ['google', 'twitter', 'github']
      }}
    >
      <Component {...pageProps} />
    </SilaProvider>
  )
}

export default MyApp
```

### Configuration Options

| Option | Description | Required | Default |
|--------|-------------|----------|---------|
| projectId | Your Sila project ID | Yes | - |
| chains | Blockchain networks to support | No | ['ethereum'] |
| socialProviders | Social sign-in providers to enable | No | ['google'] |
| theme | UI theme ('light', 'dark', or 'auto') | No | 'auto' |
| appName | Your application name | No | - |

## 📚 API Reference

### `useSila()` Hook

The primary hook for interacting with Sila functionality.

```tsx
const {
  connect,         // Function to trigger connection flow
  disconnect,      // Function to disconnect current session
  account,         // Current connected account info (address, balance, etc.)
  isConnecting,    // Boolean indicating connection in progress
  isConnected,     // Boolean indicating active connection
  provider,        // Ethers provider for the connected account
  signMessage,     // Function to sign messages with connected wallet
  sendTransaction, // Function to send transactions
  error            // Any error that occurred during operations
} = useSila()
```

### Social Authentication

Trigger social authentication with specific providers:

```tsx
// Connect with specific provider
const { connectWithGoogle, connectWithTwitter, connectWithGithub } = useSila()

// Usage examples
<button onClick={connectWithGoogle}>Sign in with Google</button>
<button onClick={connectWithTwitter}>Sign in with Twitter</button>
<button onClick={connectWithGithub}>Sign in with Github</button>
```

### Advanced Usage

#### Custom Connection Modal

```tsx
import { useSila, SilaModal } from '@sila-connect/hooks'

function CustomConnectButton() {
  const { isOpen, setIsOpen } = useSila()
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Connect Wallet
      </button>
      
      <SilaModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        customTheme={{
          primaryColor: '#3498db',
          borderRadius: '8px'
        }}
      />
    </>
  )
}
```

#### Accessing Account Details

```tsx
import { useSila } from '@sila-connect/hooks'

function AccountInfo() {
  const { account } = useSila()
  
  if (!account) return <p>Not connected</p>
  
  return (
    <div>
      <h2>Account Details</h2>
      <p>Address: {account.address}</p>
      <p>Balance: {account.formattedBalance}</p>
      <p>Connected via: {account.connectionType}</p>
      {account.socialInfo && (
        <div>
          <p>Social Profile: {account.socialInfo.name}</p>
          <img src={account.socialInfo.avatar} alt="Profile" />
        </div>
      )}
    </div>
  )
}
```

## 🧪 Examples

Check out our examples directory for complete implementation samples:

- [Basic Integration](https://github.com/web3normad/sila/tree/main/examples/basic)
- [Next.js App](https://github.com/web3normad/sila/tree/main/examples/nextjs)
- [Vite + React](https://github.com/web3normad/sila/tree/main/examples/vite-react)
- [Custom UI](https://github.com/web3normad/sila/tree/main/examples/custom-ui)

## 🤝 Contributing

We welcome contributions to Sila! Please see our [Contributing Guide](https://github.com/web3normad/sila/blob/main/CONTRIBUTING.md) for more details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/web3normad/sila/blob/main/LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Sila
- Special thanks to the Web3 community for continued support and feedback

## 🔗 Links

- [Documentation](https://sila-connect.dev/docs)
- [GitHub Repository](https://github.com/web3normad/sila)
- [npm Package](https://www.npmjs.com/package/@sila-connect/hooks)
- [Issue Tracker](https://github.com/web3normad/sila/issues)
