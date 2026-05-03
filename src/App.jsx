import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Info, Calendar, CheckSquare, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-container">
      <header className="header">
        <div className="container flex justify-between items-center py-4">
          <div className="logo flex items-center gap-2">
            <ShieldCheck size={32} color="var(--primary)" />
            <span className="logo-text">DemocracyNav</span>
          </div>
          <nav className="nav-links flex gap-4 hidden md-flex">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      <main>
        {!started ? (
          <section className="hero container text-center py-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-content"
            >
              <h1 className="hero-title mb-4">
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
              >
                <PlayCircle size={24} />
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
              <div className="feature-card">
                <div className="feature-icon bg-primary-light">
                  <Info size={32} color="white" />
                </div>
                <h3>Clear Information</h3>
                <p>Jargon-free explanations of how the electoral system works from start to finish.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon bg-secondary">
                  <Calendar size={32} color="white" />
                </div>
                <h3>Key Deadlines</h3>
                <p>Never miss a registration date, mail-in deadline, or election day.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon bg-warning">
                  <CheckSquare size={32} color="white" />
                </div>
                <h3>Step-by-Step Actions</h3>
                <p>Actionable checklists to ensure you are fully prepared to cast your ballot.</p>
              </div>
            </motion.div>
          </section>
        ) : (
          <AssistantFlow onBack={() => setStarted(false)} />
        )}
      </main>

      <footer className="footer py-8 text-center">
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
      icon: <HelpCircle size={40} className="step-icon text-primary" />,
      content: "Elections are how we choose leaders and make decisions on issues. There are different levels: local (city council, mayor), state (governor, state representatives), and federal (President, Congress).",
      action: "Next: Am I eligible?"
    },
    {
      title: "Eligibility & Registration",
      icon: <CheckSquare size={40} className="step-icon text-secondary" />,
      content: "Generally, you must be a citizen, meet your state's residency requirements, and be 18 on or before Election Day. You MUST register to vote before your state's deadline.",
      action: "Next: Important Timelines"
    },
    {
      title: "Timelines to Watch",
      icon: <Calendar size={40} className="step-icon text-warning" />,
      content: "Timelines vary by state. Key dates include: Voter Registration Deadline (often 15-30 days before), Mail-in Ballot Request Deadline, Early Voting Period, and Election Day.",
      action: "Next: How to Vote"
    },
    {
      title: "Casting Your Ballot",
      icon: <ShieldCheck size={40} className="step-icon text-accent" />,
      content: "You usually have options: Voting in-person on Election Day, Early Voting in-person, or Mail-in/Absentee voting. Make a plan for when, where, and how you will vote.",
      action: "Finish Guide"
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
    <div className="assistant-container container py-8 max-w-2xl mx-auto">
      <button onClick={onBack} className="btn-text mb-4 flex items-center gap-2">
        &larr; Back to Home
      </button>

      <div className="progress-bar mb-8">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      <motion.div 
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
        <h2 className="step-title text-2xl mb-4">{steps[currentStep].title}</h2>
        <p className="step-content text-lg text-secondary mb-8 leading-relaxed">
          {steps[currentStep].content}
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center justify-center gap-2 mx-auto w-full max-w-xs"
          onClick={handleNext}
        >
          {steps[currentStep].action}
          {currentStep < steps.length - 1 && <ArrowRight size={20} />}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;
