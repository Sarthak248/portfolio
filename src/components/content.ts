export type NodeContent = {
  id: string;
  title: string;
  blurb: string;
  items?: Array<{
    title: string;
    description: string;
    image: string;
  }>;
};

export const nodes: NodeContent[] = [
  {
    id: "about",
    title: "About",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
  },
  {
    id: "projects",
    title: "projects",
    blurb:
      "A selection of work demonstrating problem solving, craft, and impact.",
    items: [
      {
        title: "Project Alpha",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/window.svg",
      },
      {
        title: "Project Beta",
        description: "Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh.",
        image: "/globe.svg",
      },
    ],
  },
  {
    id: "experience",
    title: "experience",
    blurb:
      "Roles and responsibilities that shaped my approach to building software.",
    items: [
      {
        title: "Company One",
        description: "Mauris massa. Vestibulum lacinia arcu eget nulla.",
        image: "/file.svg",
      },
      {
        title: "Company Two",
        description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
        image: "/next.svg",
      },
    ],
  },
  {
    id: "contact",
    title: "contact",
    blurb:
      "Say hello. I'm always open to meaningful collaborations and conversations.",
  },
];
