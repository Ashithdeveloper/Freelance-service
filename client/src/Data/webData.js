// import hero from "../assets/hero.jpg";

const webData = {
  heroSection: [
    {
      content: "We Build Modern Web & Mobile Applications",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format",
    },
  ],

  aboutSection: [
    {
      heading: "Full Stack Developer",
      content:
        "We design and develop scalable web and mobile applications, admin dashboards, and custom business solutions using the MERN stack. I help startups and businesses transform ideas into powerful digital products.",
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
      techStack: ["MERN stack", "Next js", "React Native"],
      images: ["https://miro.medium.com/1*VNoETQG1aBwujmj9qMBbLQ.png"],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 25000,
      type: "ecommerce",
    },

    {
      _id: "2",
      title: "School Management System",
      description:
        "Complete ERP system for schools including student management, attendance tracking, exam reports and admin control.",
      techStack: ["MERN stack", "Next js", "React Native"],
      images: [
        "https://mir-s3-cdn-cf.behance.net/projects/404/31e824134274771.Y3JvcCwxMzA5LDEwMjQsODcsMA.jpg",
      ],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 30000,
      type: "erp",
    },

    {
      _id: "3",
      title: "Hospital Management Dashboard",
      description:
        "Web-based hospital system with patient records, doctor scheduling, billing and analytics dashboard.",
      techStack: ["MERN stack", "Next js", "React Native"],
      images: [
        "https://www.mephics.co.tz/images/uploads/hospital_management_system_hms_dashboard.png",
      ],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 40000,
      type: "healthcare",
    },

    {
      _id: "4",
      title: "Restaurant Ordering System",
      description:
        "Online food ordering web app with menu management, live order tracking and admin dashboard.",
      techStack: ["MERN stack", "Next js", "React Native"],
      images: [
        "https://trufflesystems.io/wp-content/uploads/truffle-pos_online-ordering_pos_kds.png",
      ],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 30000,
      type: "restaurant",
    },

    {
      _id: "5",
      title: "SaaS Subscription Platform",
      description:
        "Multi-user SaaS application with subscription plans, payment integration and role-based access.",
      techStack: ["MERN stack", "Next js", "React Native"],
      images: [
        "https://icubetechnolabs.com/wp-content/uploads/2025/03/icube-blogs-1.png",
      ],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 15000,
      type: "saas",
    },

    {
      _id: "6",
      title: "Real Estate Property Platform",
      description:
        "Property listing web application with search filters, admin approval system and user authentication.",
      techStack: ["MERN stack", "Next js", "React Native"],
      images: [
        "https://cdn.dribbble.com/userupload/31833259/file/original-6fcdf371f24c05beed22572ba3e74375.png?format=webp&resize=400x300&vertical=center",
      ],
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
        "Business CRM system with sales tracking, lead management and reporting dashboard with AI integration.",
      techStack: ["MERN stack", "Next js", "React Native", "AI integration"],
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
      techStack: ["MERN stack", "Next js", "React Native"],
      images: [
        "https://cdn.dribbble.com/userupload/11363173/file/original-4cdec4411c881f750b6911b86183834f.png?resize=400x0",
      ],
      liveLink: "#",
      githubLink: "#",
      isActive: true,
      amount: 25000,
      type: "mobile",
    },
  ],

  contact: {
    phoneNumbers: [{ label: "Freelance", number: "+91 6379351328" }],
    emails: [{ label: "Business", email: "ashithashith593@gmail.com" }],
    address: " kanniyakumari tamil nadu, India",
    socialMedia: {
      instagram: "https://www.instagram.com/a4_tech_sentinels",
      linkedin: "linkedin.com/in/ashith-s-f-141612359",
      twitter: "#",
      github: "https://github.com/Ashithdeveloper",
    },
  },
};

export default webData;
