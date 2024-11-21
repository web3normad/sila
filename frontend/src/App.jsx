import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


// Import Pages
import Home from "./pages/Homepage"
import About from './pages/About';
import Documentation from "./pages/Documentation"
import Features from './pages/Features';
import Demo from "./pages/Demo"
import OpenSource from './pages/OpenSource';


import { ThemeProvider } from './context/ThemeContext';
import ScrollToTopButton, { useScrollToTop } from './components/ui/ScrollToTopButton';





function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <ScrollToTopButton />
    <Router>
    <div className="App dark:bg-[#131316] bg-[#fafafa] flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home*" element={<Home />} />

           {/* Features*/}
           <Route path="/about/*" element={<About />} />

              {/* Features*/}
              <Route path="/features/*" element={<Features />} />

          {/* Documentation */}
          <Route path="/documentation/*" element={<Documentation />} />

         
          {/* Demo */}
          <Route path="/demo/*" element={<Demo />} />

          {/* Open Source */}
          <Route path="/open-source/*" element={<OpenSource />} />


        </Routes>
      </main>

      {/* Footer */}
      <Footer />
     
    </div>
  </Router>
  </ThemeProvider>
  )
}

export default App
