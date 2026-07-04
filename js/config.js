/* ============================================================
   CONFIG.JS — EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
   Everything on the site (name, links, projects, certs, skills)
   is generated from this object. No need to touch other files.
   ============================================================ */

export const CONFIG = {
  /* Wallpaper image + whether the extra animated SVG dragon also flies
     around on top of it (off by default now that the real artwork is in). */
  wallpaper: {
    image: "assets/wallpaper.png",
    showFlyingDragon: false,
  },

  /* Intro sound played when the boot curtain opens.
     - customFile: drop an MP3 you own at e.g. "assets/intro.mp3" and put the
       path here — it will play instead of the synthesized effect.
     - voiceLine: spoken by the browser's speech engine after the boom.
       Change it to anything ("Autobots, roll out", your name, etc.). */
  sound: {
    enabled: true,
    customFile: "",
    voiceLine: "Systems online. Welcome.",
  },


  /* Desktop social icons. Replace each url with YOUR profile link.
     (Defaults point to the platform homepages.) */
  socials: [
    { key: "instagram", label: "Instagram", url: "https://instagram.com/" },
    { key: "chess", label: "Chess.com", url: "https://www.chess.com/member/" },
    { key: "youtube", label: "YouTube", url: "https://youtube.com/" },
    { key: "x", label: "X", url: "https://x.com/" },
  ],

  identity: {
    name: "Abhay Kumar",
    handle: "abhay@kali-portfolio",
    tagline: "EEE Undergrad · Artificial Intelligence and Machine Learning",
    summary:
      "Electrical & Electronics Engineering undergraduate with a cross-disciplinary focus on Artificial Intelligence and Machine Learning. Experienced in building end-to-end ML workflows — data analysis, visualization, model development, and deployment — with production-grade MLOps pipelines using TensorFlow, Scikit-learn and Streamlit. Seeking an internship or full-time role to build impactful, real-world AI solutions.",
    location: "Bengaluru, India",
  },

  // Boot screen terminal lines (typed out on load)
  bootLines: [
    "Booting ABHAY-OS v2.0.27 ...",
    "[ OK ] Loading kernel module: tensorflow.ko",
    "[ OK ] Loading kernel module: scikit-learn.ko",
    "[ OK ] Mounting /dev/neural-network",
    "[ OK ] Starting MLOps pipeline daemon",
    "[ OK ] Initializing dragon.service",
    "Welcome, recruiter. Access granted.",
  ],

  links: {
    github: "https://github.com/AbhayKumar2021",
    linkedin: "https://www.linkedin.com/in/AbhayKumar2021",
    email: "abhaykr1891@gmail.com",
    phone: "+91 8969480165",
    resumeFile: "assets/Resume.pdf", // put your PDF at this path
  },

  education: [
    {
      school: "Ramaiah Institute of Technology, Bengaluru",
      degree: "B.E. in Electrical & Electronics Engineering",
      period: "Sept 2023 – June 2027",
      highlight: true, // renders with the accent "current" treatment
      detail:
        "Coursework: Machine Learning, DBMS, DSA, Operating Systems, OOP, Digital Electronics, Cyber Security",
    },
    {
      school: "Sri Agrasen School, Ramgarh, Jharkhand",
      degree: "Class XII (CBSE) — 80.6%",
      period: "2022",
      detail: "",
    },
    {
      school: "DAV Public School, Patratu, Jharkhand",
      degree: "Class X (CBSE) — 93.4%",
      period: "2020",
      detail: "",
    },
  ],

  /* Each project becomes a desktop "window preview" card.
     `url` — where the thumbnail click takes the visitor (GitHub repo / live demo).
     `image` — optional thumbnail path (assets/...); falls back to an ASCII banner. */
  projects: [
    {
      id: "churn",
      title: "End-to-End Customer Churn Prediction",
      stack: ["Python", "TensorFlow", "Scikit-learn", "Streamlit"],
      year: "2025",
      url: "https://github.com/Abhaykumar2021/End-to-End-Customer-Churn-Prediction",
      image: "assets/projects/churn.jpg",
      bullets: [
        "Deep Neural Network achieving 80% recall, optimised to minimise false negatives and revenue loss from missed churners.",
        "Production-grade MLOps pipeline with modular coding standards, custom logging, and Scikit-learn pipelines to eliminate training-serving skew.",
        "Deployed as a live Streamlit web app for real-time customer risk assessment targeting high-risk month-to-month subscribers.",
        "Feature engineering + hyperparameter tuning across batch-normalised layers; trade-offs evaluated with precision-recall curves.",
      ],
    },
    // ➕ ADD MORE PROJECTS HERE — copy the object above and edit.
  ],

  certifications: [
    {
      name: "Machine Learning Specialisation",
      issuer: "DeepLearning.AI / Stanford Online / Coursera — Andrew Ng",
      year: "Sep 2025",
      url: "https://coursera.org/share/e147faa260f68e0dcb158b6442b79cab",
      file: "assets/certs/ML_Specialisation.pdf",
    },
    {
      name: "Neural Networks & Deep Learning",
      issuer: "DeepLearning.AI / Coursera — Andrew Ng",
      year: "Oct 2025",
      url: "https://coursera.org/share/cd647c361a1aa4f3ea26474351b8a5e8",
      file: "assets/certs/Neural_Network.pdf",
    },
    // ➕ ADD MORE CERTIFICATIONS HERE
  ],

  /* Skills painted onto the wallpaper + listed in the Skills window */
  skills: {
    Languages: ["Python", "C", "C++"],
    "ML / DL": ["TensorFlow", "Scikit-learn", "Hugging Face Transformers"],
    "Data & Analysis": ["NumPy", "Pandas", "Matplotlib", "Seaborn", "MATLAB", "Scilab"],
    "MLOps & Deployment": ["Streamlit", "Modular Pipelines", "Custom Logging"],
    Databases: ["SQL", "MySQL"],
    "Version Control": ["Git", "GitHub"],
    "AI Ecosystem": ["Claude", "Gemini", "ChatGPT", "DeepSeek", "LLaMA", "Qwen"],
  },

  achievements: [
    "Completed two Andrew Ng deep learning certifications covering supervised/unsupervised learning, regularisation, optimisation and NN architecture design.",
    "Actively experiments with open-source LLMs (LLaMA, Qwen, DeepSeek) for local deployment and prompt engineering.",
    "Bridges hardware systems knowledge with applied ML — a cross-disciplinary edge for embedded AI and edge deployment roles.",
  ],
};
