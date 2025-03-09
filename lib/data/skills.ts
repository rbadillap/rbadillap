export interface Skill {
  name: string;
  level?: number;
  description?: string;
  years?: number;
  related?: string[];
  projects?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  level: number;
  description: string;
  skills: Skill[] | Record<string, SkillCategory>;
}

export type SkillsData = Record<string, SkillCategory>;

export const skillsData: SkillsData = {
  dev: {
    id: "dev",
    name: "Software Development",
    level: 13,
    description: "Building modern applications with a focus on performance, maintainability, and user experience.",
    skills: {
      frontend: {
        id: "frontend",
        name: "Frontend",
        level: 15,
        description: "Creating responsive, accessible, and beautiful user interfaces.",
        skills: [
          { name: "React", level: 17, years: 5, related: ["Next.js", "Remix"] },
          { name: "TypeScript", level: 16, years: 4 },
          { name: "CSS/Tailwind", level: 14, years: 8 },
          { name: "Performance Optimization", level: 13, years: 3 },
          { name: "Accessibility", level: 12, years: 2 },
          { name: "Animation/Framer Motion", level: 10, years: 2 }
        ]
      },
      backend: {
        id: "backend",
        name: "Backend",
        level: 14,
        description: "Developing robust, scalable APIs and services.",
        skills: [
          { name: "Node.js", level: 15, years: 6 },
          { name: "Python", level: 14, years: 8 },
          { name: "Go", level: 11, years: 3 },
          { name: "API Design", level: 16, years: 5 },
          { name: "Database Design", level: 13, years: 7 }
        ]
      },
      architecture: {
        id: "architecture",
        name: "Architecture",
        level: 12,
        description: "Designing systems with scalability and maintainability in mind.",
        skills: [
          { name: "Microservices", level: 13, years: 4 },
          { name: "Event-Driven Architecture", level: 12, years: 3 },
          { name: "Domain-Driven Design", level: 11, years: 2 },
          { name: "API Gateway Patterns", level: 10, years: 3 }
        ]
      }
    }
  },
  devops: {
    id: "devops",
    name: "DevOps / Infrastructure",
    level: 23,
    description: "Implementing CI/CD pipelines, infrastructure as code, and observability solutions.",
    skills: {
      container: {
        id: "container",
        name: "Containerization",
        level: 25,
        description: "Managing applications with container technologies.",
        skills: [
          { name: "Docker", level: 24, years: 6 },
          { name: "Kubernetes", level: 22, years: 5 },
          { name: "Helm", level: 18, years: 3 },
          { name: "Service Mesh", level: 16, years: 2 }
        ]
      },
      cicd: {
        id: "cicd",
        name: "CI/CD",
        level: 24,
        description: "Building and deploying applications automatically.",
        skills: [
          { name: "GitHub Actions", level: 25, years: 4 },
          { name: "GitLab CI", level: 20, years: 3 },
          { name: "Jenkins", level: 18, years: 5 },
          { name: "ArgoCD", level: 22, years: 2 }
        ]
      },
      iac: {
        id: "iac",
        name: "Infrastructure as Code",
        level: 22,
        description: "Defining and managing infrastructure programmatically.",
        skills: [
          { name: "Terraform", level: 23, years: 5 },
          { name: "CloudFormation", level: 18, years: 4 },
          { name: "Pulumi", level: 20, years: 2 },
          { name: "Ansible", level: 19, years: 6 }
        ]
      },
      observability: {
        id: "observability",
        name: "Observability",
        level: 21,
        description: "Monitoring and understanding system behavior.",
        skills: [
          { name: "Prometheus", level: 22, years: 4 },
          { name: "Grafana", level: 23, years: 4 },
          { name: "ELK Stack", level: 20, years: 5 },
          { name: "Distributed Tracing", level: 18, years: 3 }
        ]
      }
    }
  },
  genai: {
    id: "genai",
    name: "Generative AI",
    level: 27,
    description: "Leveraging AI to build smarter applications and tools.",
    skills: {
      implementation: {
        id: "implementation",
        name: "AI Implementation",
        level: 26,
        description: "Integrating AI models into applications.",
        skills: [
          { name: "LLM API Integration", level: 28, years: 2 },
          { name: "Vector Databases", level: 24, years: 1 },
          { name: "Embeddings", level: 25, years: 1 },
          { name: "RAG Patterns", level: 26, years: 1 }
        ]
      },
      engineering: {
        id: "engineering",
        name: "Prompt Engineering",
        level: 29,
        description: "Crafting effective prompts for AI models.",
        skills: [
          { name: "System Prompts", level: 30, years: 2 },
          { name: "Chain-of-Thought", level: 27, years: 1 },
          { name: "Function Calling", level: 28, years: 1 }
        ]
      },
      adaptation: {
        id: "adaptation",
        name: "Model Adaptation",
        level: 25,
        description: "Customizing models for specific use cases.",
        skills: [
          { name: "Fine-tuning", level: 23, years: 1 },
          { name: "RLHF", level: 20, years: 0.5 },
          { name: "Model Evaluation", level: 24, years: 1 }
        ]
      }
    }
  },
  cloud: {
    id: "cloud",
    name: "Cloud Architecture",
    level: 20,
    description: "Designing and implementing cloud-native solutions.",
    skills: {
      aws: {
        id: "aws",
        name: "AWS",
        level: 22,
        description: "Building on Amazon Web Services.",
        skills: [
          { name: "EC2/ECS/EKS", level: 24, years: 6 },
          { name: "Lambda", level: 21, years: 5 },
          { name: "S3/DynamoDB", level: 23, years: 6 },
          { name: "CloudFront/Route53", level: 22, years: 5 }
        ]
      },
      gcp: {
        id: "gcp",
        name: "GCP",
        level: 18,
        description: "Leveraging Google Cloud Platform.",
        skills: [
          { name: "GKE", level: 19, years: 3 },
          { name: "Cloud Functions", level: 17, years: 2 },
          { name: "BigQuery", level: 18, years: 3 }
        ]
      },
      azure: {
        id: "azure",
        name: "Azure",
        level: 16,
        description: "Working with Microsoft Azure.",
        skills: [
          { name: "AKS", level: 17, years: 2 },
          { name: "Azure Functions", level: 16, years: 2 },
          { name: "Cosmos DB", level: 15, years: 1 }
        ]
      },
      patterns: {
        id: "patterns",
        name: "Cloud Patterns",
        level: 21,
        description: "Implementing cloud-native design patterns.",
        skills: [
          { name: "Serverless", level: 22, years: 4 },
          { name: "Multi-Cloud", level: 19, years: 3 },
          { name: "Cloud Security", level: 20, years: 5 },
          { name: "Cost Optimization", level: 21, years: 4 }
        ]
      }
    }
  }
};

// Helper function to flatten the skills structure for searching
export function flattenSkills(): Record<string, { path: string[], data: Skill | SkillCategory }> {
  const result: Record<string, { path: string[], data: Skill | SkillCategory }> = {};
  
  function traverse(
    obj: Record<string, SkillCategory> | Record<string, any>, 
    currentPath: string[] = []
  ) {
    if (!obj) return;
    
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'id' in value) {
        // This is a SkillCategory
        const category = value as SkillCategory;
        result[category.id] = { path: [...currentPath], data: category };
        
        if (Array.isArray(category.skills)) {
          // These are leaf node skills
          category.skills.forEach((skill, index) => {
            result[`${category.id}-${index}`] = { 
              path: [...currentPath, category.id], 
              data: skill 
            };
          });
        } else if (category.skills && typeof category.skills === 'object') {
          // These are nested categories
          traverse(
            category.skills as Record<string, SkillCategory>, 
            [...currentPath, category.id]
          );
        }
      }
    });
  }
  
  traverse(skillsData);
  return result;
}

// Get category by path
export function getSkillByPath(path: string[]): SkillCategory | Skill | null {
  let current: any = { ...skillsData };
  
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    if (!current[segment]) {
      return null;
    }
    
    current = current[segment];
    
    // If we hit skills array, we've reached the end
    if (Array.isArray(current.skills)) {
      return current as SkillCategory;
    }
    
    // Move to the skills object for the next iteration
    if (i < path.length - 1) {
      current = current.skills as Record<string, SkillCategory>;
    }
  }
  
  return current as SkillCategory;
} 