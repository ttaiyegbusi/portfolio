export interface MediumArticle {
  id: string;
  title: string;
  subtitle: string;
  source: "Medium";
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  url: string;
  coverImage?: string;
}

export const mediumArticles: MediumArticle[] = [
  {
    id: "taste-subjectivity",
    title: "The Subjectivity of Taste",
    subtitle: "Exploring how personal preferences shape design perception",
    source: "Medium",
    date: "2024-09-15",
    readTime: "6 min read",
    tags: ["Design", "Taste", "Aesthetics"],
    excerpt: "Taste is subjective, yet designers are often expected to have 'good taste.' This paradox sits at the heart of creative work. In this article, we explore what taste really means, how it develops, and why it matters in design.",
    url: "https://medium.com/@aiyegbusitope/the-subjectivity-of-taste-042245935382",
    coverImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "ai-design-workflow",
    title: "7 Things You Need to Know When Incorporating AI Into Your Design Workflow",
    subtitle: "Essential considerations for designers adopting AI tools",
    source: "Medium",
    date: "2024-08-22",
    readTime: "8 min read",
    tags: ["AI", "Design", "Workflow", "Tools"],
    excerpt: "AI is reshaping design workflows, but not all implementations are created equal. This guide covers the critical considerations every designer should know before integrating AI into their process.",
    url: "https://medium.com/design-bootcamp/7-things-you-need-to-know-when-incorporating-ai-into-your-design-workflow-dbe1c6a4d353",
    coverImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "taste-ai",
    title: "How Designers Can Develop Good Taste Using Artificial Intelligence",
    subtitle: "Leveraging AI to refine and elevate your design aesthetic",
    source: "Medium",
    date: "2024-08-10",
    readTime: "7 min read",
    tags: ["Design", "AI", "Taste", "Professional Growth"],
    excerpt: "Good taste isn't innate. It's cultivated through exposure, study, and practice. Discover how artificial intelligence can accelerate this process and help designers develop a stronger creative voice.",
    url: "https://medium.com/@aiyegbusitope/how-designers-can-develop-good-taste-using-artificial-intelligence-a733a57e2639",
    coverImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "design-handoff",
    title: "Design Hand-off From a Designer's POV",
    subtitle: "Bridging the gap between design and development",
    source: "Medium",
    date: "2024-07-30",
    readTime: "9 min read",
    tags: ["Design Process", "Collaboration", "Handoff", "Case Study"],
    excerpt: "The handoff between design and development is where great design often falls apart. From a designer's perspective, here's what makes a successful handoff and how to prepare for it.",
    url: "https://medium.com/@aiyegbusitope/design-hand-off-from-a-designers-pov-4b88dbb738e5",
    coverImage: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: "design-chapter-2",
    title: "Design Chapter 2",
    subtitle: "Reflecting on growth and evolution in the design journey",
    source: "Medium",
    date: "2024-07-15",
    readTime: "5 min read",
    tags: ["Design", "Career", "Reflection"],
    excerpt: "Every designer reaches a turning point where they must evolve or stagnate. This article explores what that transition looks like and what it means for your design practice.",
    url: "https://medium.com/@aiyegbusitope/design-chapter-2-117bb5c3c8b7",
    coverImage: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: "gamification-ux",
    title: "Gamification in UX Design",
    subtitle: "Using game mechanics to create engaging user experiences",
    source: "Medium",
    date: "2024-06-20",
    readTime: "8 min read",
    tags: ["UX Design", "Gamification", "Engagement", "Product Design"],
    excerpt: "Gamification is more than points and badges. When done right, it creates meaningful engagement and drives user behavior. Learn how to apply game mechanics thoughtfully in your UX work.",
    url: "https://medium.com/@aiyegbusitope/gamification-in-ux-design-8e9127555e71",
    coverImage: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  },
  {
    id: "heuristic-evaluation",
    title: "Heuristic Evaluation in UX Design",
    subtitle: "A practical guide to evaluating user experience systematically",
    source: "Medium",
    date: "2024-06-05",
    readTime: "7 min read",
    tags: ["UX Design", "Evaluation", "Research", "Process"],
    excerpt: "Heuristic evaluation is a cost-effective method for identifying usability issues. This guide covers the ten usability heuristics and how to apply them to your design critiques.",
    url: "https://medium.com/@aiyegbusitope/heuristic-evaluation-in-ux-design-b4e08bf2f737",
    coverImage: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
];
