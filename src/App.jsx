import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Info, Calendar, CheckSquare, ArrowRight, ShieldCheck, HelpCircle, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-container">
      <header className="header" role="banner">
        <div className="container flex justify-between items-center py-4">
          <div className="logo flex items-center gap-2">
            <ShieldCheck size={32} color="var(--primary)" aria-hidden="true" />
            <span className="logo-text">DemocracyNav</span>
          </div>
          <nav className="nav-links flex gap-4 hidden md-flex" aria-label="Main Navigation">
            <a href="#features" tabIndex="0">Features</a>
            <a href="#about" tabIndex="0">About</a>
            <a href="#faq" tabIndex="0">FAQ</a>
          </nav>
        </div>
      </header>

      <main role="main">
        {!started ? (
          <section className="hero container text-center py-8" aria-labelledby="hero-title">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-content"
            >
              <h1 id="hero-title" className="hero-title mb-4">
                Navigate the Election Process with <span className="highlight">Confidence</span>
              </h1>
              <p className="hero-subtitle mb-8">
                Your interactive guide to understanding voting rights, timelines, and exactly how to make your voice heard.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-large flex items-center justify-center gap-2 mx-auto"
                onClick={() => setStarted(true)}
                aria-label="Start the interactive guide"
              >
                <PlayCircle size={24} aria-hidden="true" />
                Start the Guide
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 py-8"
              id="features"
            >
              <article className="feature-card" tabIndex="0">
                <div className="feature-icon bg-primary-light" aria-hidden="true">
                  <Info size={32} color="white" />
                </div>
                <h3>Clear Information</h3>
                <p>Jargon-free explanations of how the electoral system works from start to finish.</p>
              </article>
              
              <article className="feature-card" tabIndex="0">
                <div className="feature-icon bg-secondary" aria-hidden="true">
                  <Calendar size={32} color="white" />
                </div>
                <h3>Key Deadlines</h3>
                <p>Never miss a registration date, mail-in deadline, or election day.</p>
              </article>
              
              <article className="feature-card" tabIndex="0">
                <div className="feature-icon bg-warning" aria-hidden="true">
                  <CheckSquare size={32} color="white" />
                </div>
                <h3>Step-by-Step Actions</h3>
                <p>Actionable checklists to ensure you are fully prepared to cast your ballot.</p>
              </article>
            </motion.div>
          </section>
        ) : (
          <AssistantFlow onBack={() => setStarted(false)} />
        )}
      </main>

      <footer className="footer py-8 text-center" role="contentinfo">
        <div className="container">
          <p className="text-secondary mb-2">Designed to empower voters with clear, accessible information.</p>
          <p className="text-tertiary text-sm">© 2026 DemocracyNav Assistant. Not an official government entity.</p>
        </div>
      </footer>
    </div>
  );
}

// Assistant Flow Component
function AssistantFlow({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "The Basics",
      icon: <HelpCircle size={40} className="step-icon text-primary" aria-hidden="true" />,
      content: "Elections are how we choose leaders and make decisions on issues. There are different levels: local (city council, mayor), state (governor, state representatives), and federal (President, Congress).",
      action: "Next: Am I eligible?"
    },
    {
      title: "Eligibility & Registration",
      icon: <CheckSquare size={40} className="step-icon text-secondary" aria-hidden="true" />,
      content: "Generally, you must be a citizen, meet your state's residency requirements, and be 18 on or before Election Day. You MUST register to vote before your state's deadline.",
      action: "Next: Important Timelines"
    },
    {
      title: "Timelines to Watch",
      icon: <Calendar size={40} className="step-icon text-warning" aria-hidden="true" />,
      content: "Timelines vary by state. Key dates include: Voter Registration Deadline (often 15-30 days before), Mail-in Ballot Request Deadline, Early Voting Period, and Election Day.",
      action: "Next: How to Vote"
    },
    {
      title: "Casting Your Ballot",
      icon: <ShieldCheck size={40} className="step-icon text-accent" aria-hidden="true" />,
      content: "You usually have options: Voting in-person on Election Day, Early Voting in-person, or Mail-in/Absentee voting. Make a plan for when, where, and how you will vote.",
      action: "Next: Ask the AI Assistant"
    },
    {
      title: "Ask the AI Assistant",
      icon: <MessageCircle size={40} className="step-icon text-primary" aria-hidden="true" />,
      content: "Have a specific question about the election process? Ask our Google Gemini powered AI assistant.",
      action: "Finish Guide",
      isInteractive: true
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="assistant-container container py-8 max-w-2xl mx-auto" aria-live="polite">
      <button 
        onClick={onBack} 
        className="btn-text mb-4 flex items-center gap-2"
        aria-label="Go back to the home page"
      >
        &larr; Back to Home
      </button>

      <div className="progress-bar mb-8" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin="1" aria-valuemax={steps.length}>
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      <motion.section 
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="step-card bg-surface shadow-lg rounded-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          {steps[currentStep].icon}
        </div>
        <h2 className="step-title text-2xl mb-4" tabIndex="0">{steps[currentStep].title}</h2>
        <p className="step-content text-lg text-secondary mb-8 leading-relaxed" tabIndex="0">
          {steps[currentStep].content}
        </p>

        {steps[currentStep].isInteractive && <GeminiChat />}

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center justify-center gap-2 mx-auto w-full max-w-xs mt-4"
          onClick={handleNext}
          aria-label={steps[currentStep].action}
        >
          {steps[currentStep].action}
          {currentStep < steps.length - 1 && <ArrowRight size={20} aria-hidden="true" />}
        </motion.button>
      </motion.section>
    </div>
  );
}

function GeminiChat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const askGemini = async () => {
    if (!query) return;
    setLoading(true);
    setResponse("");

    try {
      if (!apiKey) {
        setResponse("Please provide a Google Gemini API Key above to use this feature.");
        setLoading(false);
        return;
      }
      
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const geminiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an election assistant. Answer briefly and clearly: ${query}`,
      });
      
      setResponse(geminiResponse.text);
    } catch (error) {
      setResponse("Error fetching response: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemini-chat mt-6 text-left border border-gray-200 p-4 rounded-md">
      <div className="mb-4">
         <label htmlFor="api-key" className="block text-sm text-secondary mb-1">Google Gemini API Key (Required for AI)</label>
         <input 
           id="api-key"
           type="password" 
           value={apiKey} 
           onChange={(e) => setApiKey(e.target.value)} 
           placeholder="Enter your API Key" 
           className="w-full p-2 border rounded"
           aria-required="true"
         />
      </div>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="E.g., How do I find my polling place?" 
          className="flex-1 p-2 border rounded"
          aria-label="Ask the election assistant a question"
        />
        <button 
          onClick={askGemini} 
          disabled={loading} 
          className="btn btn-primary"
          aria-busy={loading}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>
      {response && (
        <div className="mt-4 p-3 bg-gray-50 border rounded text-secondary" aria-live="polite">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
