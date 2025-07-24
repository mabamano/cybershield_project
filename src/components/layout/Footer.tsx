
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Mail } from 'lucide-react';
import AnimatedLogo from '../ui-custom/AnimatedLogo';

const Footer = () => {
  return (
    <footer className="mt-20 pt-10 pb-6 px-4 border-t border-cybershield-100/30">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AnimatedLogo size="sm" animated={false} />
            <span className="text-xl font-semibold">CyberShield</span>
          </div>
          <p className="text-cybershield-400 max-w-xs">
            Your comprehensive cybersecurity solution - protecting your digital presence with advanced, user-friendly tools.
          </p>
        </div>
        
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase text-cybershield-400">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-cybershield-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-sm hover:text-cybershield-accent transition-colors">
                  Cyber Chatbot
                </Link>
              </li>
              <li>
                <Link to="/phishing" className="text-sm hover:text-cybershield-accent transition-colors">
                  Phishing Detection
                </Link>
              </li>
              <li>
                <Link to="/defense" className="text-sm hover:text-cybershield-accent transition-colors">
                  Cyber Defense
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase text-cybershield-400">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-cybershield-accent transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cybershield-accent transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cybershield-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-cybershield-accent transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase text-cybershield-400">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm flex items-center space-x-2 hover:text-cybershield-accent transition-colors">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm flex items-center space-x-2 hover:text-cybershield-accent transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm flex items-center space-x-2 hover:text-cybershield-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-10 pt-6 border-t border-cybershield-100/30 text-center text-sm text-cybershield-400">
        <p>© {new Date().getFullYear()} CyberShield. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
