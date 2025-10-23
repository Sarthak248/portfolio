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
          { img: "/project.png", text: "Developed an enterprise-grade management system using Spring Boot and React for Omnicard, enabling secure CRUD operations and role-based access control." },
          { img: "/work.png", text: "Integrated REST APIs and automated workflows with MySQL, Docker, and AWS S3 to improve scalability and deployment consistency." },
          { img: "/cali.png", text: "Implemented service-layer validation, Swagger documentation, and exception handling for production readiness." },
        ],
      },
      {
        title: "PneumoScan",
        description: "AI-based pneumonia detection system using deep learning on X-ray datasets.",
        thumb: "/window.svg",
        slides: [
          { img: "/msft.png", text: "Built a CNN model using TensorFlow and Keras, leveraging transfer learning to achieve high diagnostic accuracy." },
          { img: "/sf.png", text: "Deployed as a Flask web app with an intuitive UI for clinicians to upload and analyze X-rays." },
          { img: "/project.png", text: "Implemented Grad-CAM visualizations for model explainability and clinical transparency." },
        ],
      },
      {
        title: "CodeCure",
        description: "AI-powered VS Code extension offering real-time bug and code quality suggestions.",
        thumb: "/window.svg",
        slides: [
          { img: "/globe.svg", text: "Designed and developed an AI-driven developer tool leveraging OpenAI APIs and Python for intelligent debugging assistance." },
          { img: "/work.png", text: "Integrated the extension with VS Code’s API and React-based front-end for seamless developer interaction." },
          { img: "/project.png", text: "Optimized response generation with prompt engineering for contextual feedback during live coding." },
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
          { img: "/manulife.png", text: "Built Python and Azure-based backends for PCI redaction of 50K+ reports using GPT-4o, Azure Functions, and Terraform, improving accuracy by 40%." },
          { img: "/work.png", text: "Developed an AI-driven Customer Case Processor integrating Azure AI and Salesforce, reducing manual processing time by 50%." },
          { img: "/project.png", text: "Created a Quote Engine app using React and Node.js to simulate life insurance benefits in real time." },
          { img: "/sf.png", text: "Developed secure APIs and CI/CD pipelines using Jenkins, GraphQL, and Snyk for continuous delivery." },
        ],
      },
      {
        title: "Omnicard Inc.",
        description: "Software Engineer Intern (Jun–Sep 2023)",
        thumb: "/omni.webp",
        slides: [
          { img: "/omni.webp", text: "Built REST APIs for an Enterprise Spend Management System using Spring Boot and MySQL." },
          { img: "/work.png", text: "Containerized microservices using Docker and deployed to AWS S3 and EC2 instances." },
          { img: "/project.png", text: "Integrated external bank APIs to automate transaction flows within the fintech platform." },
        ],
      },
      {
        title: "J.P. Morgan Chase",
        description: "Virtual Software Engineering Program",
        thumb: "/jp.webp",
        slides: [
          { img: "/jp.webp", text: "Enhanced Python-based stock data analysis for twin-momentum trading strategies." },
          { img: "/work.png", text: "Developed React dashboards for traders to visualize and compare correlated stock data." },
          { img: "/project.png", text: "Streamlined code for faster data aggregation and decision support in simulated trading environments." },
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
          { img: "/cali.png", text: "Focus on functional movement, balance, and body control through progressive routines." },
          { img: "/hobbies.png", text: "Combines consistency and goal-setting similar to software iteration and optimization." },
        ],
      },
      {
        title: "Guitar",
        description: "Acoustic and electric rhythm guitarist.",
        thumb: "/guitar.png",
        slides: [
          { img: "/guitar.png", text: "Play modern rock and fingerstyle arrangements for creative balance outside coding." },
          { img: "/hobbies.png", text: "Occasionally compose short instrumentals, emphasizing rhythm precision and technique." },
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
          { img: "/msft.png", text: "Learned key Azure concepts like Functions, KeyVaults, and Storage Accounts." },
          { img: "/work.png", text: "Applied Azure knowledge during Manulife backend deployments using Terraform and serverless functions." },
        ],
      },
      {
        title: "Salesforce Certified Administrator",
        description: "Expertise in Salesforce configuration, flows, and process automation.",
        thumb: "/sf.png",
        slides: [
          { img: "/sf.png", text: "Configured objects, workflows, and automation for case management solutions." },
          { img: "/msft.png", text: "Used Apex and Service Cloud for building custom logic and AI integrations." },
        ],
      },
      {
        title: "Salesforce Platform Developer I",
        description: "Advanced understanding of Apex programming and Lightning components.",
        thumb: "/sf.png",
        slides: [
          { img: "/sf.png", text: "Built and deployed Apex triggers and classes to automate internal workflows." },
          { img: "/work.png", text: "Collaborated with Salesforce teams to integrate AI-driven customer sentiment tools." },
        ],
      },
      {
        title: "Salesforce Platform App Builder",
        description: "Specialization in building scalable applications within Salesforce ecosystem.",
        thumb: "/sf.png",
        slides: [
          { img: "/project.png", text: "Developed and customized Lightning Apps for internal data processing at Manulife." },
          { img: "/sf.png", text: "Enhanced UI/UX through declarative development and optimized record flows." },
        ],
      },
      {
        title: "Agentforce AI Specialist",
        description: "Salesforce AI tools certification for conversational and sentiment-based automation.",
        thumb: "/sf.png",
        slides: [
          { img: "/sf.png", text: "Integrated OpenAI APIs with Salesforce for automated case summarization." },
          { img: "/work.png", text: "Reduced client response time by 23% through intelligent routing and summarization." },
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
