
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Shield, MessageCircle, Mail, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '../components/ui-custom/AnimatedLogo';
import TypingEffect from '../components/ui-custom/TypingEffect';
import GlassContainer from '../components/ui-custom/GlassContainer';
import DefenseModule from '../components/modules/defense/DefenseModule';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-cybershield-accent">Cyber</span>Shield
              </h1>
              <div className="h-12">
                <TypingEffect 
                  phrases={[
                    "Advanced threat detection",
                    "Real-time network monitoring",
                    "AI-powered security analysis",
                    "Intelligent attack prevention"
                  ]} 
                  className="text-xl md:text-2xl text-cybershield-500" 
                />
              </div>
              <p className="text-lg text-cybershield-600">
                Comprehensive cybersecurity platform designed to protect your digital assets with cutting-edge
                threat intelligence and real-time monitoring capabilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/defense" className="cybershield-button">
                  Security Dashboard
                </Link>
                <Link to="/chatbot" className="cybershield-button-secondary">
                  Security Assistant
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <AnimatedLogo size="xl" />
                <div className="absolute -bottom-4 -right-4 bg-cybershield-accent/10 backdrop-blur-sm rounded-full px-4 py-2 border border-cybershield-accent/20 animate-pulse-slow">
                  <span className="text-sm font-medium text-cybershield-accent">System Protected</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Shield} 
              title="Defense Module" 
              description="Real-time threat detection and security monitoring for your network"
              link="/defense"
            />
            <FeatureCard 
              icon={MessageCircle} 
              title="Security Chatbot" 
              description="AI-powered assistant for cybersecurity questions and guidance"
              link="/chatbot"
            />
            <FeatureCard 
              icon={Mail} 
              title="Phishing Scanner" 
              description="Advanced detection of phishing attempts and suspicious messages"
              link="/phishing"
            />
            <FeatureCard 
              icon={Activity} 
              title="System Monitoring" 
              description="Track system performance and identify suspicious activities"
              link="/defense"
            />
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Defense Dashboard</h2>
          <GlassContainer className="p-6 md:p-8">
            <DefenseModule />
          </GlassContainer>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, link }: { 
  icon: React.FC<{ className?: string }>, 
  title: string, 
  description: string,
  link: string
}) => {
  return (
    <Link to={link}>
      <GlassContainer className="p-6 h-full transition-all hover:border-cybershield-accent/30">
        <div className="flex flex-col h-full">
          <div className="mb-4 bg-cybershield-accent/10 w-12 h-12 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-cybershield-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-cybershield-500 text-sm flex-grow">{description}</p>
          <div className="mt-4 text-cybershield-accent text-sm font-medium">
            Learn more →
          </div>
        </div>
      </GlassContainer>
    </Link>
  );
};

export default Index;
