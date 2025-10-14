export type DeskItem = {
  title: string;
  description: string;
  thumb: string;
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
      { title: "Corposync", description: "Enterprise Mgmt System.", thumb: "/globe.svg" },
      { title: "PneumoScan", description: "Deep-learning based pneumonia detection system using CNNs and transfer learning on X-ray datasets.", thumb: "/window.svg" },
      { title: "CodeCure", description: "AI-powered Developer Tool providing real-time bug suggestions,", thumb: "/window.svg" },
    ],
  },
  {
    id: "experience",
    label: "experience",
    items: [
      { title: "Manulife", description: "Software Engineer Intern.", thumb: "/manulife.png" },
      { title: "Omnicard", description: "Software Engineer Intern.", thumb: "/omni.webp" },
      { title: "JPMC", description: "Software Engineer Intern.", thumb: "/jp.webp" },
    ],
  },
  {
    id: "hobbies",
    label: "hobbies",
    items: [
      { title: "Calisthenics", description: "Cillum dolore eu fugiat.", thumb: "/cali.png" },
      { title: "Guitar", description: "Excepteur sint ocadfadfcaecat.", thumb: "/guitar.png" },
    ],
  },
  {
    id: "certifications",
    label: "certifications",
    items: [
      { title: "AZ900", description: "Microsoft Certified: Azure Fundamentals.", thumb: "/msft.png" },
      { title: "SCA", description: "Salesforce Certified Administrator.", thumb: "/sf.png" },
      { title: "PAB", description: "Salesforce Platform App Builder.", thumb: "/sf.png" },
      { title: "PD1", description: "Salesforce Platform Developer I.", thumb: "/sf.png" },
      { title: "Agentforce", description: "Salesforce Agentforce Specialist.", thumb: "/sf.png" },
    ],
  },
  {
    id: "settings",
    label: "settings",
    items: [],
  },
];
