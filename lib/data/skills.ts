export interface Skill {
  name: string;
  description?: string;
  subitems?: Skill[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  skills: Skill[];
}

export type SkillsData = Record<string, SkillCategory>;

export const skillsData: SkillsData = {
  dev: {
    id: "dev",
    name: "Software Development",
    count: 13,
    description: "Languages, frameworks, and tools for building modern applications",
    skills: [
      {
        name: "Frontend",
        description: "UI frameworks and libraries",
        subitems: [
          { name: "React", description: "Component-based UI library" },
          { name: "Tailwind CSS", description: "Utility-first CSS framework" },
          { name: "shadcn/ui", description: "UI component collection for React" },
          { name: "Vite", description: "Next-generation frontend tooling" }
        ]
      },
      {
        name: "Backend",
        description: "Server-side technologies and frameworks",
        subitems: [
          { name: "Node.js", description: "JavaScript runtime" },
          { name: "Express", description: "Minimal Node.js web framework" },
          { name: "NestJS", description: "Progressive Node.js framework with TypeScript" },
          { name: "Python", description: "General-purpose programming language" },
          { name: "Golang", description: "Statically typed compiled language" },
          { name: "PHP", description: "Server-side scripting language" },
          { name: "Laravel", description: "PHP web application framework" }
        ]
      },
      {
        name: "Fullstack",
        description: "End-to-end application development",
        subitems: [
          { name: "React + Tailwind + Vite", description: "Modern web stack" },
          { name: "Next.js", description: "React framework for production" },
          { name: "T3 Stack", description: "TypeScript, tRPC, Tailwind, Next.js" }
        ]
      }
    ]
  },
  architecture: {
    id: "architecture",
    name: "Solutions Architecture",
    count: 5,
    description: "Designing scalable and maintainable system architectures",
    skills: [
      {
        name: "Cloud Architecture",
        description: "Designing cloud-native solutions",
        subitems: [
          { name: "AWS Solutions Architect Professional", description: "Professional level AWS certification" },
          { name: "Cloud Migration", description: "Moving applications to cloud environments" },
          { name: "Cost Optimization", description: "Efficient resource allocation and usage" },
          { name: "FedRAMP / SOC 2 Experience", description: "Compliance frameworks for cloud systems" }
        ]
      },
      {
        name: "System Design",
        description: "Architectural patterns and approaches",
        subitems: [
          { name: "Microservices", description: "Distributed architecture pattern" },
          { name: "Event-Driven Architecture", description: "Asynchronous communication pattern" },
          { name: "API Design", description: "RESTful and GraphQL API design principles" },
          { name: "Domain-Driven Design", description: "Software development approach" }
        ]
      }
    ]
  },
  devops: {
    id: "devops",
    name: "DevOps / Infrastructure",
    count: 23,
    description: "Tools and practices for reliable deployment and operations",
    skills: [
      {
        name: "Containers / Serverless",
        description: "Technologies for application deployment",
        subitems: [
          { name: "Docker", description: "Containerization platform" },
          { name: "Kubernetes (EKS)", description: "Container orchestration" },
          { name: "ECS / Fargate", description: "AWS container services" },
          { name: "AWS Lambda", description: "Serverless compute service" },
          { name: "API Gateway", description: "API management service" },
          { name: "CloudFront", description: "Content delivery network" }
        ]
      },
      {
        name: "Infrastructure as Code",
        description: "Provisioning and managing infrastructure programmatically",
        subitems: [
          { name: "Terraform", description: "Infrastructure as code tool" },
          { name: "CloudFormation", description: "AWS infrastructure templating" },
          { name: "Ansible", description: "Automation tool" }
        ]
      },
      {
        name: "CI/CD",
        description: "Continuous integration and deployment pipelines",
        subitems: [
          { name: "GitHub Actions", description: "CI/CD platform integrated with GitHub" },
          { name: "GitLab CI", description: "CI/CD capabilities built into GitLab" },
          { name: "Bitbucket Pipelines", description: "CI/CD service for Bitbucket" },
          { name: "ArgoCD", description: "GitOps continuous delivery for Kubernetes" },
          { name: "Flux / Flagger", description: "GitOps operators for Kubernetes" }
        ]
      },
      {
        name: "Monitoring",
        description: "Observability and monitoring solutions",
        subitems: [
          { name: "Prometheus / Grafana", description: "Monitoring and visualization" },
          { name: "Loki", description: "Log aggregation system" },
          { name: "OpenSearch", description: "Search and analytics suite" },
          { name: "Fluentd", description: "Open source data collector" },
          { name: "ELK Stack", description: "Elasticsearch, Logstash, Kibana" },
          { name: "AWS CloudWatch", description: "Monitoring service for AWS resources" },
          { name: "Datadog", description: "Cloud monitoring as a service" }
        ]
      },
      {
        name: "Cloud Providers",
        description: "Cloud platforms and hosting services",
        subitems: [
          { name: "AWS", description: "Amazon Web Services cloud platform" },
          { name: "Cloudflare", description: "Web performance and security" },
          { name: "Vercel", description: "Frontend deployment platform" }
        ]
      }
    ]
  },
  genai: {
    id: "genai",
    name: "Generative AI",
    count: 27,
    description: "AI models, techniques, and tools for generating content",
    skills: [
      {
        name: "Large Language Models",
        description: "LLM technologies and capabilities",
        subitems: [
          { name: "OpenAI o3 family", description: "GPT-4o, GPT-4o mini, etc." },
          { name: "DeepSeek R1", description: "Open-weight large language model" },
          { name: "Perplexity AI", description: "AI-powered answer engine" },
          { name: "Claude", description: "Anthropic's conversational AI assistant" }
        ]
      },
      {
        name: "Image Generation",
        description: "AI image creation tools",
        subitems: [
          { name: "Midjourney", description: "AI image generation tool" },
          { name: "Leonardo.AI", description: "AI image generation platform" },
          { name: "OpenAI Sora", description: "Text-to-video model" }
        ]
      },
      {
        name: "Prompt Engineering",
        description: "Techniques for effective AI prompting",
        subitems: [
          { name: "ReAct Technique", description: "Reasoning and action generation" },
          { name: "Prompt Chaining", description: "Multi-step prompting process" },
          { name: "RAG", description: "Retrieval Augmented Generation" },
          { name: "Knowledge Bases", description: "Structured information for LLMs" },
          { name: "Temporary Memory", description: "Context retention techniques" }
        ]
      },
      {
        name: "Agentic Frameworks",
        description: "Tools for building AI agents and workflows",
        subitems: [
          { name: "CrewAI", description: "Framework for orchestrating role-based agents" },
          { name: "Pydantic AI", description: "Data validation for AI systems" },
          { name: "Phidata", description: "Framework for AI applications" },
          { name: "AgentOps", description: "Autonomous AI systems platform" },
          { name: "LangChain / LangStudio", description: "Framework for LLM applications" }
        ]
      },
      {
        name: "Cloud AI Solutions",
        description: "Cloud-based AI services",
        subitems: [
          { name: "AWS Bedrock", description: "Managed service for foundation models" },
          { name: "AWS SageMaker Studio", description: "Machine learning service" }
        ]
      },
      {
        name: "AI Tools",
        description: "Specialized tools for AI workflows",
        subitems: [
          { name: "Firecrawl", description: "Web crawling for AI training" },
          { name: "mem0", description: "AI memory and knowledge management" },
          { name: "Stripe", description: "Payment processing integration" },
          { name: "Browserbase", description: "Browser automation for AI" }
        ]
      }
    ]
  }
};

// Helper function to flatten the skills structure for searching
export function flattenSkills(): Record<string, { path: string[], data: Skill | SkillCategory }> {
  const result: Record<string, { path: string[], data: Skill | SkillCategory }> = {};
  
  function traverse(
    obj: Record<string, SkillCategory>, 
    currentPath: string[] = []
  ) {
    if (!obj) return;
    
    Object.entries(obj).forEach(([key, category]) => {
      // Add the category
      result[category.id] = { path: [...currentPath], data: category };
      
      // Process category skills
      category.skills.forEach((skill, idx) => {
        const skillKey = `${category.id}-skill-${idx}`;
        result[skillKey] = { 
          path: [...currentPath, category.id], 
          data: skill 
        };
        
        // Process subitems if they exist
        if (skill.subitems) {
          skill.subitems.forEach((subitem, subIdx) => {
            const subitemKey = `${category.id}-skill-${idx}-subitem-${subIdx}`;
            result[subitemKey] = {
              path: [...currentPath, category.id, skillKey],
              data: subitem
            };
          });
        }
      });
    });
  }
  
  traverse(skillsData);
  return result;
}

// Get category by path
export function getSkillByPath(path: string[]): SkillCategory | Skill | null {
  if (!path || path.length === 0) return null;
  
  // Get the top level category
  const category = skillsData[path[0]];
  if (!category) return null;
  
  // Return the category if only the first path segment is provided
  if (path.length === 1) return category;
  
  // Parse the skill index from the second path segment
  const skillMatch = path[1].match(/skill-(\d+)/);
  if (!skillMatch) return null;
  
  const skillIndex = parseInt(skillMatch[1], 10);
  if (isNaN(skillIndex) || skillIndex >= category.skills.length) return null;
  
  const skill = category.skills[skillIndex];
  
  // Return the skill if only two path segments are provided
  if (path.length === 2) return skill;
  
  // Parse the subitem index from the third path segment
  const subitemMatch = path[2].match(/subitem-(\d+)/);
  if (!subitemMatch || !skill.subitems) return null;
  
  const subitemIndex = parseInt(subitemMatch[1], 10);
  if (isNaN(subitemIndex) || subitemIndex >= skill.subitems.length) return null;
  
  return skill.subitems[subitemIndex];
} 