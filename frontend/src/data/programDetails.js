export const SCHEDULES = [
  { mode: "Classroom · Ahmedabad", batch: "Weekday batch", days: "Mon – Fri", time: "10:00 AM – 12:00 PM IST" },
  { mode: "Classroom · Ahmedabad", batch: "Evening batch", days: "Mon · Wed · Fri", time: "7:00 PM – 9:30 PM IST" },
  { mode: "Classroom · Ahmedabad", batch: "Weekend batch", days: "Sat – Sun", time: "10:00 AM – 1:30 PM IST" },
  { mode: "Online · Live", batch: "US-friendly batch", days: "Sat – Sun", time: "9:00 AM – 12:00 PM CT (7:30 PM – 10:30 PM IST)" },
];

export const PROGRAM_DETAILS = {
  "ai-engineer-data-science": {
    image: "/media/prog-ai.jpg",
    lines: ["AI Engineer &", "Data Science."],
    lead: "Go from Python basics to shipping AI applications. Data science, machine learning, generative AI and LLMs, built through projects and a capstone you can show recruiters.",
    facts: ["24 weeks", "Classroom + Online", "IT domain", "3 major projects + capstone"],
    tools: ["Python", "NumPy", "Pandas", "SQL", "Scikit-learn", "TensorFlow", "PyTorch", "LangChain", "OpenAI APIs", "Power BI", "Git & GitHub", "Streamlit"],
    phases: [
      { title: "Programming & Data Foundations", weeks: "Weeks 1–4", topics: ["Python fundamentals, OOP and scripting", "NumPy & Pandas for data wrangling", "SQL for analysts: joins, windows, CTEs", "Git, GitHub and clean project structure"] },
      { title: "Statistics & Data Analysis", weeks: "Weeks 5–8", topics: ["Descriptive & inferential statistics", "Exploratory data analysis & visualisation", "Dashboards with Power BI", "Project 1: business insights report"] },
      { title: "Machine Learning", weeks: "Weeks 9–13", topics: ["Regression, classification and clustering", "Feature engineering & model evaluation", "Ensembles: Random Forest, XGBoost", "Project 2: end-to-end ML model with deployment"] },
      { title: "Deep Learning & Generative AI", weeks: "Weeks 14–18", topics: ["Neural networks, CNNs and NLP basics", "Transformers and how LLMs work", "Prompt engineering, RAG and AI agents", "Project 3: LLM-powered application"] },
      { title: "Capstone & Career Preparation", weeks: "Weeks 19–24", topics: ["Industry capstone with mentor reviews", "Portfolio, GitHub & LinkedIn optimisation", "Technical & HR mock interviews", "Placement support & job applications"] },
    ],
    roles: ["Data Analyst", "Data Scientist", "ML Engineer", "AI Application Developer", "Business Intelligence Analyst"],
  },
  "investment-banking-financial-analytics": {
    image: "/media/prog-ib.jpg",
    lines: ["Investment Banking &", "Financial Analytics."],
    lead: "Learn the work analysts actually do: financial modelling, valuation, equity research, M&A and analytics, practised on real company data and reviewed by industry mentors.",
    facts: ["24 weeks", "Classroom + Online", "Banking domain", "Finance portfolio"],
    tools: ["Advanced Excel", "Financial Modelling", "PowerPoint Pitchbooks", "Power BI", "SQL", "Python for Finance", "Bloomberg-style datasets", "Capital IQ-style research"],
    phases: [
      { title: "Accounting & Finance Foundations", weeks: "Weeks 1–4", topics: ["Financial statements and how they link", "Ratio analysis and business models", "Corporate finance essentials", "Advanced Excel for finance"] },
      { title: "Financial Modelling", weeks: "Weeks 5–9", topics: ["3-statement model build", "Forecasting & scenario analysis", "Model auditing and best practice", "Project 1: listed-company model"] },
      { title: "Valuation & Equity Research", weeks: "Weeks 10–14", topics: ["DCF, comparables and precedent transactions", "Writing an equity research report", "Sector analysis and investment thesis", "Project 2: initiation report"] },
      { title: "Investment Banking & M&A", weeks: "Weeks 15–19", topics: ["Deal process, pitchbooks and CIMs", "M&A and LBO modelling basics", "Financial analytics with Power BI & Python", "Project 3: M&A pitch"] },
      { title: "Capstone & Career Preparation", weeks: "Weeks 20–24", topics: ["Capstone: full valuation & deal case", "Finance resume and LinkedIn", "Technical finance & HR mock interviews", "Placement support & job applications"] },
    ],
    roles: ["Financial Analyst", "Investment Banking Analyst", "Equity Research Associate", "Credit Analyst", "FP&A Analyst"],
  },
  "digital-marketing-content-ai": {
    image: "/media/prog-dm.jpg",
    lines: ["Digital Marketing,", "Content & AI."],
    lead: "Plan, run and measure campaigns that grow brands. SEO, social media, performance marketing, content creation and AI-powered marketing, learned by running real campaigns.",
    facts: ["24 weeks", "Classroom + Online", "Business domain", "Live campaign projects"],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Search Console", "SEMrush", "Canva", "CapCut", "ChatGPT & AI tools", "WordPress", "Mailchimp"],
    phases: [
      { title: "Marketing Foundations", weeks: "Weeks 1–3", topics: ["Consumer behaviour & funnels", "Brand positioning and personas", "Marketing strategy & planning", "Website basics with WordPress"] },
      { title: "SEO & Content Creation", weeks: "Weeks 4–8", topics: ["Keyword research, on-page & technical SEO", "Content writing and copywriting", "Short-form video & design with CapCut and Canva", "Project 1: SEO content plan"] },
      { title: "Social Media & Performance Marketing", weeks: "Weeks 9–14", topics: ["Organic social strategy & calendars", "Meta Ads and Google Ads campaigns", "Budgets, bidding and A/B testing", "Project 2: paid campaign"] },
      { title: "Analytics & AI-Powered Marketing", weeks: "Weeks 15–19", topics: ["GA4, tracking and reporting dashboards", "Email & marketing automation", "AI tools for content, ads and insights", "Project 3: growth report"] },
      { title: "Capstone & Career Preparation", weeks: "Weeks 20–24", topics: ["Capstone: full-funnel brand campaign", "Marketing portfolio & LinkedIn", "Mock interviews & case rounds", "Placement support & job applications"] },
    ],
    roles: ["Digital Marketing Executive", "SEO Specialist", "Performance Marketing Analyst", "Social Media Manager", "Content Strategist"],
  },
};
