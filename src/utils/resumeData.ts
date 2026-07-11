export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  challenges: string;
  learning: string;
  futureImprovements: string[];
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  caseStudy: ProjectCaseStudy;
  imagePlaceholderColor: string; // Tailwind color class for modern visual fallback
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  details: string[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  objective: string;
  aboutMe: string;
  socials: {
    github: string;
    linkedin: string;
    hackerrank: string;
  };
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: string[];
  awards: {
    title: string;
    issuer: string;
    date: string;
  }[];
}

export const resumeData: ResumeData = {
  name: "Siddharth Gavali",
  title: "Aspiring Software Developer",
  email: "siddharthgavali55@gmail.com",
  phone: "+91 8767994740",
  location: "Sangli, Maharashtra, India",
  objective: "Computer Science and Business Systems student with hands-on experience in full-stack web and mobile application development, REST API integration, and Java-based object-oriented programming. Skilled in building responsive, data-driven applications and collaborating in agile, Git-based team workflows. Seeking a Software Developer role to apply strong DSA and OOP fundamentals to build scalable, real-world solutions.",
  aboutMe: "Hi, I'm Siddharth Gavali! I am a 3rd-year Computer Science and Business Systems (CSBS) student at KIT College of Engineering, Kolhapur. My academic path bridges technology and business strategy, equipping me to solve core computational problems while thinking about scalability, user experience, and business goals. I am highly passionate about full-stack development, mobile architectures, clean API design, and creating sleek user interfaces. I love tackling complex logical puzzles using Data Structures & Algorithms, and I thrive in collaborative team environments that value clean code and performance.",
  socials: {
    github: "https://github.com/siddharthgavali11-dev",
    linkedin: "https://linkedin.com/in/siddharth-gavali-84b68a2a6",
    hackerrank: "https://hackerrank.com/profile/siddharthgavali1"
  },
  skills: [
    {
      category: "Programming Languages",
      skills: [
        { name: "Java", level: 90 },
        { name: "Python", level: 80 },
        { name: "C++", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "SQL", level: 85 }
      ]
    },
    {
      category: "Web & Backend Technologies",
      skills: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "Bootstrap", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "REST APIs", level: 85 }
      ]
    },
    {
      category: "Tools & Platforms",
      skills: [
        { name: "Git", level: 85 },
        { name: "GitHub", level: 90 },
        { name: "VS Code", level: 90 },
        { name: "Canva", level: 75 }
      ]
    },
    {
      category: "Core Concepts",
      skills: [
        { name: "Data Structures & Algorithms (DSA)", level: 85 },
        { name: "Object-Oriented Programming (OOP)", level: 90 },
        { name: "Problem Solving", level: 90 },
        { name: "Responsive Design", level: 95 }
      ]
    }
  ],
  experience: [
    {
      company: "Wolfox Services Pvt. Ltd.",
      role: "Web Development Intern",
      location: "Kolhapur, India",
      duration: "06/2023 - 07/2023",
      responsibilities: [
        "Developed responsive web pages using HTML5, CSS3, JavaScript, and Bootstrap, ensuring pixel-perfect layout and rendering.",
        "Improved UI responsiveness and resolved critical front-end styling and layout bugs to enhance overall user experience.",
        "Collaborated with the core development team using Git and Agile Scrum practices to deliver scheduled feature iterations.",
        "Participated actively in team debugging sessions, system testing, and code reviews during the project development lifecycle."
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Business Systems (CSBS)",
      institution: "Kolhapur Institute of Technology (KIT)",
      location: "Kolhapur, India",
      duration: "2024 - 2027",
      score: "CGPA: 7.7 / 10",
      details: [
        "Specialized curriculum bridging Computer Science foundations (DSA, OOPs, DBMS) and business systems (financial accounting, marketing, software project management).",
        "Engaged in academic labs and projects focusing on full-stack web architectures and algorithm optimization."
      ]
    },
    {
      degree: "Diploma in Computer Science Engineering",
      institution: "Government Polytechnic",
      location: "Miraj, India",
      duration: "2021 - 2024",
      score: "85.54% (First Class with Distinction)",
      details: [
        "Comprehensive training in core computing subjects: C programming, operating systems, databases, and software engineering.",
        "Completed independent academic projects and gained practical experience in mobile/web systems design."
      ]
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "New English School",
      location: "Miraj, India",
      duration: "2020 - 2021",
      score: "79.40%",
      details: [
        "Completed general secondary education with a strong emphasis on mathematics and sciences."
      ]
    }
  ],
  projects: [
    {
      title: "StudentSync - Smart Attendance System",
      slug: "studentsync",
      description: "A smart, automated attendance tracking ecosystem using GPS, Wi-Fi, and BLE signals to eliminate manual roll calls, integrated with a real-time parent-teacher notification system and visual reporting.",
      techStack: ["Flutter", "Firebase", "GPS", "BLE", "Wi-Fi"],
      githubUrl: "https://github.com/siddharthgavali11-dev/studentsync",
      imagePlaceholderColor: "from-blue-500/20 to-cyan-500/20 border-blue-500/50",
      caseStudy: {
        problem: "Manual roll calls in academic institutions consume valuable instruction time, are highly prone to proxy attendance, and suffer from administrative delays in reporting absentees to parents.",
        solution: "StudentSync automates attendance logging by validating a student's physical presence in the classroom using tri-factor verification: GPS coordinates, local Wi-Fi connection, and Bluetooth Low Energy (BLE) beacon detection from the instructor's device.",
        architecture: [
          "Cross-platform Flutter app for both students and faculty members.",
          "Firebase Authentication for secure role-based student and teacher accounts.",
          "Cloud Firestore for real-time attendance logs, scheduling, and course lists.",
          "Firebase Cloud Functions to automate absent reports and send push notifications.",
          "Geolocator and flutter_blue packages for local physical proximity checks."
        ],
        features: [
          "Tri-factor Proximity Validation (GPS, BLE beacons, and class Wi-Fi network SSID).",
          "Automated real-time absentee notifications pushed instantly to parents and teachers.",
          "Role-Based Access Control (RBAC) separating administrative, teacher, and student dashboards.",
          "Visual analytics dashboard rendering attendance percentages, trends, and charts."
        ],
        challenges: "Ensuring highly accurate BLE beacon signal strength detection across diverse mobile hardware platforms, and handling intermittent GPS drift when inside multi-story concrete academic buildings.",
        learning: "Mastered mobile device background execution limitations, optimized client battery usage while active-scanning for beacons, and designed secure, tamper-proof Firestore security rules.",
        futureImprovements: [
          "Integrating offline sync capabilities to log attendance without active internet and sync later.",
          "Incorporating face verification using client-side TensorFlow Lite model for a fourth layer of proxy prevention."
        ]
      }
    },
    {
      title: "LendFlow - Private Money Lending Dashboard",
      slug: "lendflow",
      description: "A modular, client-side web dashboard that simplifies loan tracking, interest computations, and repayment schedules for private lenders, featuring CSV reporting and fully local data persistence.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Chart.js", "LocalStorage"],
      githubUrl: "https://github.com/siddharthgavali11-dev/money-lending-app.git",
      imagePlaceholderColor: "from-violet-500/20 to-purple-500/20 border-violet-500/50",
      caseStudy: {
        problem: "Private money lenders often manage loan portfolios using chaotic paper logs or static spreadsheets, leading to mistakes in interest computations, missed due dates, and lack of overall financial visibility.",
        solution: "LendFlow provides an intuitive, offline-first dashboard that records borrower transactions, automatically calculates interest based on flexible rates and tenures, tracks upcoming payments, and visualizes financial health.",
        architecture: [
          "Responsive front-end built using HTML5, CSS3, and Bootstrap 5.",
          "Vanilla JavaScript application architecture structured with ES6 modules.",
          "Chart.js for rendering loan distributions, monthly yields, and repayment statistics.",
          "Web LocalStorage for persistent data storage, containing automated backup/restore scripts as JSON configurations."
        ],
        features: [
          "Automated financial interest calculators (simple and compound structures).",
          "Interactive transaction logs for borrowers, showing remaining principal and accrued interest.",
          "Repayment due-date tracking with highlighting for overdue accounts.",
          "Instant data export to CSV format for external ledger synchronization."
        ],
        challenges: "Managing state consistency in vanilla JavaScript across multiple separate views and implementing custom backup-and-restore systems to prevent browser cache clearing from destroying critical records.",
        learning: "Deepened knowledge of browser storage capacities, asynchronous file actions in JavaScript, and utilizing object serialization/deserialization for secure backups.",
        futureImprovements: [
          "Migrating the codebase to React and TypeScript for modular component lifecycle management.",
          "Integrating IndexedDB to support heavy file attachments (borrower identity proofs, agreements)."
        ]
      }
    },
    {
      title: "Online Quiz Web Application",
      slug: "quiz-app",
      description: "A responsive, client-side quiz application featuring dynamic question streams, validation steps, and instantaneous results, engineered for low-latency performance.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      githubUrl: "https://github.com/siddharthgavali11-dev/quiz-app",
      imagePlaceholderColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/50",
      caseStudy: {
        problem: "Existing online test tools are often bloated, suffer from noticeable latency during question transitions, and lack reliable offline flow management if network signals drop.",
        solution: "A lightweight, highly responsive frontend web application designed with static quiz rendering structures, optimizing browser paint cycles for snappy question changes and instant score evaluations.",
        architecture: [
          "Semantic HTML5 structure optimized for screen readers and accessibility.",
          "Bootstrap 5 utility classes for adaptive grid system layouts across screen dimensions.",
          "Vanilla JavaScript engine managing state vectors, quiz countdown timers, and response validity lists."
        ],
        features: [
          "Dynamic question generation, randomizing choices to prevent cheating patterns.",
          "Real-time countdown timer tracking and automatic submission on time expiration.",
          "Interactive dashboard summarizing correct answers, speed, and subject analysis.",
          "Progress bar tracking and clean feedback animations for answer inputs."
        ],
        challenges: "Preventing form submission resubmission triggers and keeping the timer synchronized with browser animation loops when users minimize the tab.",
        learning: "Understood DOM performance optimization, event delegation, and browser tab visibility APIs to control timer state dynamically.",
        futureImprovements: [
          "Adding a teacher portal where custom questions can be uploaded using Excel/JSON files.",
          "Connecting to a web-socket backend server to support synchronous multiplayer trivia rooms."
        ]
      }
    }
  ],
  achievements: [
    "Completed a Diploma in Computer Science Engineering with 85.54% (First Class with Distinction).",
    "Gained practical industry exposure through two software internships spanning web development and mobile solutions.",
    "Shipped multiple independent academic projects, demonstrating full-stack, mobile, and client-side problem-solving capabilities."
  ],
  awards: [
    {
      title: "NCC 'A' Certificate",
      issuer: "16 Maharashtra Battalion NCC, Sangli (National Cadet Corps)",
      date: "11/07/2019"
    },
    {
      title: "C Programming Certification (A+ Grade)",
      issuer: "Phoenix Computer Education Center, Miraj",
      date: "15/05/2022"
    }
  ]
};
