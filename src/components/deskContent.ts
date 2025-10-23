export type Slide = { img: string; text: string };

export type DeskItem = {
  title: string;
  description: string;
  thumb: string;
  slides?: Slide[];
};

export type DeskCategory = {
  id: "projects" | "experience" | "hobbies" | "certifications" | "settings";
  label: string;
  items: DeskItem[];
};
export const deskCategories: DeskCategory[] = [
  {
    id: "projects",
    label: "projects",
    items: [
      {
        title: "Corposync",
        description: "Enterprise Management System for fintech operations.",
        thumb: "/globe.svg",
        slides: [
          {
            img: "/project.png",
            text: "Developed a full-stack enterprise management system using Spring Boot and React to streamline internal financial operations, enabling secure CRUD operations, dynamic dashboards, and real-time expense tracking."
          },
          {
            img: "/work.png",
            text: "Built RESTful microservices with MySQL and Spring Data JPA, ensuring modularity and transaction consistency across multiple business modules. Implemented role-based access control for enhanced data security."
          },
          {
            img: "/cali.png",
            text: "Automated workflows and API integrations to synchronize data between services, improving system efficiency by 35%. Used Docker and AWS S3 for containerization and cloud storage."
          },
          {
            img: "/sf.png",
            text: "Created detailed Swagger documentation and integrated CI/CD pipelines for faster QA deployment cycles. Designed intuitive UI components with React and TypeScript for smooth user experiences."
          },
          {
            img: "/msft.png",
            text: "Delivered a production-ready fintech platform improving operational transparency and reducing manual data entry errors by over 40%."
          },
        ],
      },
      {
        title: "PneumoScan",
        description: "AI-based pneumonia detection system using deep learning on X-ray datasets.",
        thumb: "/window.svg",
        slides: [
          {
            img: "/msft.png",
            text: "Developed a CNN-based deep learning model using TensorFlow and Keras to classify chest X-rays for pneumonia detection, achieving high accuracy with transfer learning and data augmentation."
          },
          {
            img: "/sf.png",
            text: "Built and deployed a Flask web app with a clean React interface, allowing clinicians to upload and visualize diagnostic predictions in real-time."
          },
          {
            img: "/project.png",
            text: "Integrated Grad-CAM visualizations to provide interpretable model outputs, assisting healthcare professionals in clinical validation and decision support."
          },
          {
            img: "/work.png",
            text: "Implemented asynchronous image processing pipelines and optimized inference times by leveraging GPU acceleration and efficient caching."
          },
        ],
      },
      {
        title: "CodeCure",
        description: "AI-powered VS Code extension offering real-time bug and code quality suggestions.",
        thumb: "/window.svg",
        slides: [
          {
            img: "/globe.svg",
            text: "Created an AI-driven developer productivity tool leveraging OpenAI APIs to provide real-time linting, code analysis, and intelligent bug fix recommendations directly within VS Code."
          },
          {
            img: "/work.png",
            text: "Implemented natural language explanations and quick-fix actions, allowing developers to understand and resolve code issues instantly without leaving the IDE."
          },
          {
            img: "/project.png",
            text: "Built the backend using Python and Flask for request processing and prompt generation, connected via WebSocket APIs to ensure low-latency feedback."
          },
          {
            img: "/cali.png",
            text: "Utilized TypeScript and VS Code’s extension API for front-end logic, achieving stable user experience with responsive UI and contextual code insights."
          },
          {
            img: "/sf.png",
            text: "Recognized at HackThe6ix 2024 as a finalist project for its innovation in combining AI and developer tooling."
          },
        ],
      },
    ],
  },
  {
    id: "experience",
    label: "experience",
    items: [
      {
        title: "Manulife / John Hancock",
        description: "Software Engineer Intern (Jan–Aug 2024, May–Aug 2025)",
        thumb: "/manulife.png",
        slides: [
          {
            img: "/manulife.png",
            text: "Led backend development for PCI redaction across 50K+ financial reports using Python, GPT-4o, and Azure Functions. Improved redaction accuracy by 40% through ML model tuning and data validation."
          },
          {
            img: "/work.png",
            text: "Built an AI-driven Customer Case Processor integrating Azure AI, Salesforce Flows, and Apex classes, reducing manual handling by 50% and automating sentiment-driven case triage."
          },
          {
            img: "/project.png",
            text: "Developed a Quote Engine web app using React and Node.js to generate real-time life insurance policy illustrations and benefit simulations for client advisors."
          },
          {
            img: "/sf.png",
            text: "Deployed microservices using Jenkins pipelines, Snyk security scans, and Terraform-based infrastructure on Azure. Collaborated with cross-functional teams using Agile practices and CI/CD automation."
          },
          {
            img: "/msft.png",
            text: "Implemented a Salesforce sentiment summarization tool using Apex, OpenAI, and Amazon Connect APIs to reduce client case resolution time by 23%."
          },
        ],
      },
      {
        title: "Omnicard Inc.",
        description: "Software Engineer Intern (Jun–Sep 2023)",
        thumb: "/omni.webp",
        slides: [
          {
            img: "/omni.webp",
            text: "Developed RESTful APIs for an Enterprise Spend Management System using Java Spring Boot and MySQL, improving internal transaction management efficiency."
          },
          {
            img: "/work.png",
            text: "Implemented Docker-based deployment pipelines and automated build processes on AWS EC2 and S3 for secure cloud scalability."
          },
          {
            img: "/project.png",
            text: "Integrated external Bank Service APIs to facilitate automated expense approval workflows and transaction verification."
          },
          {
            img: "/sf.png",
            text: "Improved API performance by optimizing database queries and caching, reducing average response times by 45%."
          },
        ],
      },
      {
        title: "J.P. Morgan Chase",
        description: "Virtual Software Engineering Program (Jun 2021 – Feb 2022)",
        thumb: "/jp.webp",
        slides: [
          {
            img: "/jp.webp",
            text: "Analyzed and refactored Python scripts for twin-momentum stock prediction to enhance trade signal accuracy and reduce execution latency."
          },
          {
            img: "/work.png",
            text: "Built interactive React dashboards for real-time visualization of correlated stock performance, improving trader decision visibility."
          },
          {
            img: "/project.png",
            text: "Optimized backtesting pipelines to handle larger datasets efficiently, ensuring consistent results under different volatility conditions."
          },
        ],
      },
    ],
  },
  {
    id: "hobbies",
    label: "hobbies",
    items: [
      {
        title: "Calisthenics",
        description: "Bodyweight strength training and endurance building.",
        thumb: "/cali.png",
        slides: [
          {
            img: "/cali.png",
            text: "Focus on progressive overload and mobility training to enhance strength and balance. Approach workouts with the same iteration mindset used in coding—refine, test, and optimize."
          },
          {
            img: "/hobbies.png",
            text: "Apply discipline learned from software development to physical routines, ensuring long-term consistency and measurable progress."
          },
        ],
      },
      {
        title: "Guitar",
        description: "Acoustic and electric rhythm guitarist.",
        thumb: "/guitar.png",
        slides: [
          {
            img: "/guitar.png",
            text: "Play rhythm and fingerstyle arrangements blending rock and instrumental music for creative balance outside technical work."
          },
          {
            img: "/hobbies.png",
            text: "Use music as a mental reset—combining structure, timing, and flow much like writing clean, efficient code."
          },
        ],
      },
    ],
  },
  {
    id: "certifications",
    label: "certifications",
    items: [
      {
        title: "Microsoft Azure Fundamentals (AZ-900)",
        description: "Validated knowledge in core Azure services, cloud architecture, and governance.",
        thumb: "/msft.png",
        slides: [
          {
            img: "/msft.png",
            text: "Covered Azure Functions, KeyVaults, EventGrid, and StorageAccounts concepts applied in live deployments at Manulife."
          },
          {
            img: "/work.png",
            text: "Used Terraform to define infrastructure as code for serverless environments, contributing to enterprise-level automation."
          },
        ],
      },
      {
        title: "Salesforce Certified Administrator",
        description: "Expertise in Salesforce configuration, flows, and process automation.",
        thumb: "/sf.png",
        slides: [
          {
            img: "/sf.png",
            text: "Configured workflows and automation for case management tools and service cloud processes."
          },
          {
            img: "/msft.png",
            text: "Streamlined user provisioning and data visibility, enabling more efficient cross-department collaboration."
          },
        ],
      },
      {
        title: "Salesforce Platform Developer I",
        description: "Advanced understanding of Apex programming and Lightning components.",
        thumb: "/sf.png",
        slides: [
          {
            img: "/sf.png",
            text: "Built Apex triggers and classes to automate core financial workflows in Salesforce, optimizing data handling and case tracking."
          },
          {
            img: "/work.png",
            text: "Integrated Lightning Components for custom dashboards improving advisor productivity."
          },
        ],
      },
      {
        title: "Salesforce Platform App Builder",
        description: "Specialization in building scalable applications within the Salesforce ecosystem.",
        thumb: "/sf.png",
        slides: [
          {
            img: "/project.png",
            text: "Created and deployed Lightning Apps for internal process automation using declarative tools and flows."
          },
          {
            img: "/sf.png",
            text: "Improved system scalability and user experience with low-code customization strategies."
          },
        ],
      },
      {
        title: "Agentforce AI Specialist",
        description: "Salesforce AI tools certification for conversational and sentiment-based automation.",
        thumb: "/sf.png",
        slides: [
          {
            img: "/sf.png",
            text: "Integrated OpenAI APIs with Salesforce Agentforce to automatically summarize customer interactions and detect sentiment."
          },
          {
            img: "/work.png",
            text: "Reduced average client response time by 23% through case prioritization automation using Apex and AI-driven routing."
          },
        ],
      },
    ],
  },
  {
    id: "settings",
    label: "settings",
    items: [],
  },
];
