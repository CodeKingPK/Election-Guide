# DemocracyNav - Election Assistant

DemocracyNav is an interactive and easy-to-follow assistant designed to help users understand the election process, timelines, and necessary steps to cast their vote.

## Challenge Vertical
**Election Process Guide / Voting Assistant**

## Approach and Logic
The goal was to transform complex and often overwhelming election information into a simple, accessible, and engaging format. 
To achieve this, I built a Single Page Application (SPA) using React and Vite. The core logic relies on a "wizard" or step-by-step flow pattern. Instead of presenting a wall of text, the application breaks down the election process into digestible, sequential steps (Basics, Registration, Timelines, Voting). 

I prioritized **Aesthetics and User Experience** by implementing a modern design system with a clean UI, custom CSS variables for consistent theming, and `framer-motion` for smooth micro-animations. This dynamic design keeps the user engaged and makes learning about the democratic process feel less like a chore and more like an interactive guide.

## How the Solution Works
1. **Landing Page:** Users are greeted with a clear value proposition and a call to action to "Start the Guide."
2. **Interactive Flow:** Once started, the user enters the assistant flow. Information is presented one concept at a time on focused cards.
3. **Progression:** A progress bar visually indicates how far along the user is. Users click "Next" to proceed through the stages:
   - Understanding the Basics of elections
   - Eligibility and Registration requirements
   - Important Timelines to watch out for
   - Methods for Casting Your Ballot
4. **Completion:** After completing the steps, users are better informed and prepared for the upcoming election cycle.

## Assumptions Made
*   **Generalization:** The guide provides a high-level overview applicable generally to US elections. It assumes users will check their specific state or local election websites for exact dates and localized rules, which the guide advises them to do.
*   **Accessibility:** It is assumed the user has basic web literacy to navigate a step-by-step interface.
*   **Technology:** Assumes the user is accessing the application on a modern web browser that supports standard CSS and JavaScript features.

## Getting Started (Local Development)

To run this project locally:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Built With
* React
* Vite
* Framer Motion (for animations)
* Lucide React (for iconography)
* Vanilla CSS (for styling)
# Election-Guide
