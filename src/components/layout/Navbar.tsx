
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, MessageCircle, Mail, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedLogo from '../ui-custom/AnimatedLogo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isMobile]);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Shield className="w-5 h-5" /> },
    { path: '/chatbot', label: 'Cyber Chatbot', icon: <MessageCircle className="w-5 h-5" /> },
    { path: '/phishing', label: 'Phishing Detection', icon: <Mail className="w-5 h-5" /> },
    { path: '/defense', label: 'Cyber Defense', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/10 backdrop-blur-md shadow-sm py-2' : 'py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold"
          onClick={closeMenu}
        >
          <AnimatedLogo size="sm" />
          <span>CyberShield</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                location.pathname === link.path
                  ? 'bg-cybershield-accent/10 text-cybershield-accent'
                  : 'hover:bg-cybershield-100/50 hover:text-cybershield-800'
              )}
            >
              <span className="flex items-center space-x-1.5">
                {link.icon}
                <span>{link.label}</span>
              </span>
            </Link>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-cybershield-100/50 text-cybershield-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl animate-slide-in-right p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">Menu</span>
              <button
                onClick={closeMenu}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-cybershield-100 text-cybershield-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center',
                    location.pathname === link.path
                      ? 'bg-cybershield-accent/10 text-cybershield-accent'
                      : 'hover:bg-cybershield-100 hover:text-cybershield-800'
                  )}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
