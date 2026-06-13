export interface MediumArticle {
  id: string;
  title: string;
  subtitle: string;
  source: "Medium";
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  bodyPreview?: string[];
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
    bodyPreview: [
      "We tend to treat taste as something you either have or you don't. But taste is not a fixed trait. It is a sensibility that gets built over time through exposure, attention, and a willingness to sit with work that is better than yours.",
      "The designers we admire for their taste are usually the ones who have seen the most, questioned the most, and refined their eye through thousands of small decisions. Their confidence is earned, not given.",
    ],
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
    bodyPreview: [
      "The temptation is to bolt AI onto every step and call it innovation. But the designers getting real value are selective. They know which parts of the process benefit from speed and which parts still demand human judgment.",
      "AI is excellent at generating options, summarizing research, and handling repetitive production work. It is far weaker at understanding context, making trade-offs, and knowing when something simply feels wrong. The skill is knowing the difference.",
    ],
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
    bodyPreview: [
      "AI can act like a tireless study partner. Feed it a direction and it will return dozens of interpretations in seconds, letting you compare, react, and articulate why one resonates and another falls flat.",
      "That rapid feedback loop is where taste sharpens. The more references you process and the more you practice naming what works, the faster your own judgment matures. AI does not replace the eye, it trains it.",
    ],
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
    bodyPreview: [
      "A handoff is not a moment, it is a relationship. The best ones start long before the final file is ready, with designers and engineers building shared understanding as the work takes shape.",
      "When I prepare a handoff, I think less about documentation and more about intent. What should never break? What is flexible? Where did I make a deliberate choice that might look like a mistake? Answering those questions up front saves everyone days.",
    ],
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
    bodyPreview: [
      "Chapter one is about proving you can do the work. Chapter two is about deciding what work is worth doing. The shift is quieter than it sounds, and most people miss the moment it happens.",
      "For me, the turning point came when craft stopped being the hard part. Suddenly the harder questions were about judgment, direction, and saying no to good ideas so the great ones had room to breathe.",
    ],
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
    bodyPreview: [
      "Most gamification fails because it rewards the wrong thing. Points and streaks can drive activity, but activity is not the same as value. The best systems tie game mechanics to outcomes users actually care about.",
      "Think about progress, mastery, and a sense of momentum. When a product makes someone feel like they are getting better at something that matters to them, engagement follows naturally, without the gimmicks.",
    ],
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
    bodyPreview: [
      "You do not always have the time or budget for a full usability study. Heuristic evaluation gives you a structured way to catch the most common problems quickly, using a small set of well-tested principles.",
      "The ten heuristics cover things like visibility of system status, match with the real world, user control, and error prevention. Walk any interface against them and the friction points start to reveal themselves fast.",
    ],
    url: "https://medium.com/@aiyegbusitope/heuristic-evaluation-in-ux-design-b4e08bf2f737",
    coverImage: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
];
