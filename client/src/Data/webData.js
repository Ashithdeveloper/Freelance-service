const webData = {
  heroSection: [
    {
      content: "I Build Modern Web & Mobile Applications",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    },
  ],

  aboutSection: [
    {
      heading: "Full Stack Developer",
      content:
        "I design and develop scalable web applications, admin dashboards, and custom business solutions using the MERN stack. I help startups and businesses transform ideas into powerful digital products.",
    },
  ],

  services: [
    {
      _id: "1",
      title: "Business Website Development",
      description:
        "Professional responsive company websites with SEO optimization and CMS integration.",
      icon: "Code",
      type: "website",
      isActive: true,
    },
    {
      _id: "2",
      title: "Custom Web Applications",
      description:
        "CRM systems, booking systems, dashboards, and SaaS platforms built from scratch.",
      icon: "LayoutDashboard",
      type: "webapp",
      isActive: true,
    },
    {
      _id: "3",
      title: "E-Commerce Applications",
      description:
        "Complete online stores with payment gateway, admin panel, and order management.",
      icon: "ShoppingCart",
      type: "ecommerce",
      isActive: true,
    },
    {
      _id: "4",
      title: "Mobile App UI & Backend",
      description:
        "React Native app UI with secure backend APIs and database integration.",
      icon: "Smartphone",
      type: "mobileapp",
      isActive: true,
    },
    {
      _id: "5",
      title: "Custom Software Solutions",
      description:
        "Tailor-made web solutions for startups and enterprises based on specific requirements.",
      icon: "Settings",
      type: "custom",
      isActive: true,
    },
  ],

  projects: [
    {
      _id: "1",
      title: "Advanced E-Commerce Application",
      description:
        "Modern online shopping platform with admin dashboard, order tracking, payment gateway and analytics.",
      techStack: ["React", "Node", "MongoDB", "JWT"],
      images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 75000,
      type: "ecommerce",
    },

    {
      _id: "2",
      title: "School Management System",
      description:
        "Complete ERP system for schools including student management, attendance tracking, exam reports and admin control.",
      techStack: ["React", "Express", "MongoDB"],
      images: ["https://images.unsplash.com/photo-1588072432836-e10032774350"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 80000,
      type: "erp",
    },

    {
      _id: "3",
      title: "Hospital Management Dashboard",
      description:
        "Web-based hospital system with patient records, doctor scheduling, billing and analytics dashboard.",
      techStack: ["React", "Node", "MongoDB"],
      images: ["https://images.unsplash.com/photo-1581091012184-5c1d2a7b6c6a"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 90000,
      type: "healthcare",
    },

    {
      _id: "4",
      title: "Restaurant Ordering System",
      description:
        "Online food ordering web app with menu management, live order tracking and admin dashboard.",
      techStack: ["React", "Node", "MongoDB"],
      images: ["https://images.unsplash.com/photo-1555992336-03a23c4a4f1f"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 60000,
      type: "restaurant",
    },

    {
      _id: "5",
      title: "SaaS Subscription Platform",
      description:
        "Multi-user SaaS application with subscription plans, payment integration and role-based access.",
      techStack: ["React", "Node", "Stripe"],
      images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 95000,
      type: "saas",
    },

    {
      _id: "6",
      title: "Real Estate Property Platform",
      description:
        "Property listing web application with search filters, admin approval system and user authentication.",
      techStack: ["React", "Node", "MongoDB"],
      images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 85000,
      type: "realestate",
    },

    {
      _id: "7",
      title: "Custom CRM System",
      description:
        "Business CRM system with sales tracking, lead management and reporting dashboard.",
      techStack: ["React", "Node", "MongoDB"],
      images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 70000,
      type: "crm",
    },

    {
      _id: "8",
      title: "Mobile App Backend API",
      description:
        "Secure backend system powering a mobile application with authentication, notifications and data sync.",
      techStack: ["Node", "MongoDB", "Firebase"],
      images: ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 55000,
      type: "mobile",
    },
  ],

  contact: {
    phoneNumbers: [{ label: "Freelance", number: "+91 9876543210" }],
    emails: [{ label: "Business", email: "ashithdev@example.com" }],
    address: "Neyyattinkara, Kerala, India",
    socialMedia: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
};

export default webData;
