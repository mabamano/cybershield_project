
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ChatInterface from '../components/modules/chatbot/ChatInterface';
import GlassContainer from '../components/ui-custom/GlassContainer';

const Chatbot = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Security Assistant</h1>
            <p className="text-cybershield-500">
              Get expert cybersecurity guidance powered by Google Gemini AI.
            </p>
          </div>
          
          <GlassContainer className="p-6 md:p-8">
            <ChatInterface />
          </GlassContainer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
