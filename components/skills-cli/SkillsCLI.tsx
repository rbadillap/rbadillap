'use client';

import React, { useState, useEffect, useRef } from 'react';
import { skillsData, Skill, SkillCategory } from '@/lib/data/skills';
import { Badge } from '@/components/ui/badge';
import { Terminal as TerminalIcon, Folder, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/layout/ThemeProvider';
import Image from 'next/image';

type HistoryItem = {
  type: string;
  content: string;
  data?: any;
  avatar?: string;
  website?: string;
};

type Path = {
  category?: string;
  area?: string;
  areaKeyword?: string;
  skill?: string;
};

// Add more specific types for the directory contents
type CategoryContent = {
  type: 'categories';
  items: SkillCategory[];
};

type AreaContent = {
  type: 'areas';
  category: SkillCategory;
  items: Skill[];
};

type SkillContent = {
  type: 'skills';
  category: SkillCategory;
  area: Skill;
  items: Skill[];
};

type SkillItemContent = {
  type: 'skill-item';
  category: SkillCategory;
  area: Skill;
  skill: Skill;
};

type DirectoryContent = CategoryContent | AreaContent | SkillContent | SkillItemContent | null;

// Add keyword mapping for each area
const areaKeywords: Record<string, Record<string, string>> = {
  devops: {
    'Containers / Serverless': 'containers',
    'Infrastructure as Code': 'iac',
    'CI/CD': 'ci-cd',
    'Monitoring': 'monitoring',
    'Cloud Providers': 'cloud-providers'
  },
  genai: {
    'Large Language Models': 'llm',
    'Image Generation': 'image',
    'Prompt Engineering': 'prompt',
    'Agentic Frameworks': 'agents',
    'Cloud AI Solutions': 'cloud-ai',
    'AI Tools': 'tools'
  },
  dev: {
    'Frontend': 'frontend',
    'Backend': 'backend',
    'Fullstack': 'fullstack'
  },
  architecture: {
    'Cloud Architecture': 'cloud',
    'System Design': 'system'
  }
};

// Add descriptive reverse mapping for display
const keywordDescriptions: Record<string, Record<string, string>> = {
  devops: {
    'containers': 'Containers / Serverless',
    'iac': 'Infrastructure as Code',
    'ci-cd': 'CI/CD',
    'monitoring': 'Monitoring',
    'cloud-providers': 'Cloud Providers'
  },
  genai: {
    'llm': 'Large Language Models',
    'image': 'Image Generation',
    'prompt': 'Prompt Engineering',
    'agents': 'Agentic Frameworks',
    'cloud-ai': 'Cloud AI Solutions',
    'tools': 'AI Tools'
  },
  dev: {
    'frontend': 'Frontend',
    'backend': 'Backend',
    'fullstack': 'Fullstack'
  },
  architecture: {
    'cloud': 'Cloud Architecture',
    'system': 'System Design'
  }
};

export default function SkillsCLI() {
  const { theme } = useTheme();
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'system', content: 'Welcome to the my skills cli.' },
    { type: 'system', content: 'Type "help" for available commands or try "ls" to view categories.' },
  ]);
  const [input, setInput] = useState('');
  const [previousCommands, setPreviousCommands] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState<Path>({});
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Get current directory string representation using keywords
  const getCurrentDirString = () => {
    if (!currentPath.category) return '/';
    if (!currentPath.areaKeyword) return `/${currentPath.category}`;
    if (!currentPath.skill) return `/${currentPath.category}/${currentPath.areaKeyword}`;
    return `/${currentPath.category}/${currentPath.areaKeyword}/${currentPath.skill}`;
  };
  
  // Get current prompt
  const getPrompt = () => {
    const dir = getCurrentDirString();
    return `skills:${dir}$`;
  };
  
  // Find a category by name (case insensitive)
  const findCategory = (name: string): SkillCategory | undefined => {
    const categoryId = Object.keys(skillsData).find(
      id => id.toLowerCase() === name.toLowerCase()
    );
    return categoryId ? skillsData[categoryId] : undefined;
  };
  
  // Find an area in a category by keyword or name
  const findArea = (category: SkillCategory, areaKey: string): {area: Skill, keyword: string} | undefined => {
    const areas = category.skills as Skill[];
    
    // Try to find by exact area name first (case insensitive)
    const directMatch = areas.find(area => 
      area.name.toLowerCase() === areaKey.toLowerCase()
    );
    
    if (directMatch) {
      const keyword = getAreaKeyword(category.id, directMatch.name);
      return { area: directMatch, keyword };
    }
    
    // Try to find by keyword mapping
    if (keywordDescriptions[category.id] && keywordDescriptions[category.id][areaKey]) {
      const fullName = keywordDescriptions[category.id][areaKey];
      const area = areas.find(area => area.name === fullName);
      if (area) {
        return { area, keyword: areaKey };
      }
    }
    
    return undefined;
  };
  
  // Get area keyword for display
  const getAreaKeyword = (categoryId: string, areaName: string): string => {
    if (areaKeywords[categoryId] && areaKeywords[categoryId][areaName]) {
      return areaKeywords[categoryId][areaName];
    }
    // Fallback to lowercase with no spaces if not in mapping
    return areaName.toLowerCase().replace(/\s+/g, '-');
  };
  
  // Find a skill in an area by name (case insensitive)
  const findSkill = (area: Skill, skillName: string): Skill | undefined => {
    if (!area.subitems) return undefined;
    return area.subitems.find(skill => skill.name.toLowerCase() === skillName.toLowerCase());
  };
  
  // Get current directory content
  const getCurrentContent = (): DirectoryContent => {
    // Root level - show categories
    if (!currentPath.category) {
      return {
        type: 'categories',
        items: Object.values(skillsData)
      };
    }
    
    // Find category (case insensitive)
    const category = findCategory(currentPath.category);
    if (!category) return null;
    
    if (!currentPath.area) {
      return {
        type: 'areas',
        category,
        items: category.skills as Skill[]
      };
    }
    
    // Find area (case insensitive)
    const areaMatch = findArea(category, currentPath.areaKeyword || '');
    if (!areaMatch) return null;
    
    const area = areaMatch.area;
    
    if (!currentPath.skill) {
      // No skill specified, show all skills in this area
      if (!area.subitems || area.subitems.length === 0) {
        return {
          type: 'skills',
          category,
          area,
          items: []
        };
      }
      
      return {
        type: 'skills',
        category,
        area,
        items: area.subitems
      };
    }
    
    // Find specific skill (case insensitive)
    const skill = findSkill(area, currentPath.skill);
    if (!skill) return null;
    
    return {
      type: 'skill-item',
      category,
      area,
      skill
    };
  };
  
  const commands = {
    help: {
      description: 'List available commands',
      execute: () => {
        return [
          { type: 'command-list', content: '', data: [
            { command: 'help', description: 'Show available commands' },
            { command: 'about', description: 'Brief introduction' },
            { command: 'skills', description: 'List or explore skills' },
            { command: 'skills <category>', description: 'View a category' },
            { command: 'skills <category> <keyword>', description: 'View skills in an area' },
            { command: 'ls', description: 'List items in current directory' },
            { command: 'cd <path>', description: 'Navigate to a directory' },
            { command: 'pwd', description: 'Show current path' },
            { command: 'clear', description: 'Clear the terminal' }
          ]}
        ];
      }
    },
    about: {
      description: 'Display basic information about me',
      execute: () => {
        return [
          { 
            type: 'about', 
            content: 'Ronny Badilla', 
            data: 'Software Developer & DevOps Engineer focused on modern, interoperable systems with minimal design and exceptional user experience.',
            avatar: '/avatars/rbadillap.jpg',
            website: 'https://rbadillap.dev'
          }
        ];
      }
    },
    skills: {
      description: 'List or explore skills',
      execute: (args: string[]) => {
        if (args.length === 0) {
          return [
            { type: 'directory-list', content: 'Categories', data: Object.values(skillsData).map(cat => ({
              name: cat.name,
              path: cat.id,
              keyword: cat.id,
              count: cat.count,
              isDirectory: true
            }))},
            { type: 'tip', content: 'Use "skills <category> <keyword>" (e.g., "skills devops ci-cd")' }
          ];
        }
        
        // First argument is category
        const categoryName = args[0];
        const category = findCategory(categoryName);
        
        if (!category) {
          return [{ type: 'error', content: `Category not found: ${categoryName}` }];
        }
        
        if (args.length === 1) {
          // Show category and its areas with keywords
          return [
            { type: 'category-detail', content: category.name, data: {
              id: category.id,
              description: category.description,
              count: category.count,
              areas: (category.skills as Skill[]).map(skill => ({
                name: skill.name,
                keyword: getAreaKeyword(category.id, skill.name),
                count: skill.subitems?.length || 0
              }))
            }},
            { type: 'tip', content: `Use "skills ${category.id} <keyword>" to view specific skills` }
          ];
        }
        
        // Second argument is area keyword
        const areaKey = args[1];
        const areaMatch = findArea(category, areaKey);
        
        if (!areaMatch) {
          // Generate a helpful error message with available keywords
          const availableKeywords = Object.keys(keywordDescriptions[category.id] || {})
            .map(key => `"${key}"`)
            .join(', ');
          
          return [
            { type: 'error', content: `Area not found: ${areaKey}` },
            { type: 'tip', content: `Available keywords for ${category.name}: ${availableKeywords}` }
          ];
        }
        
        const area = areaMatch.area;
        
        // Show area and its skills
        return [
          { type: 'area-detail', content: area.name, data: {
            description: area.description,
            skills: area.subitems || []
          }}
        ];
      }
    },
    pwd: {
      description: 'Show current directory',
      execute: () => {
        return [
          { type: 'system', content: getCurrentDirString() }
        ];
      }
    },
    ls: {
      description: 'List contents of current directory',
      execute: () => {
        const content = getCurrentContent();
        
        if (!content) {
          return [{ type: 'error', content: 'Invalid path' }];
        }
        
        if (content.type === 'categories') {
          return [
            { 
              type: 'directory-list', 
              content: 'Categories', 
              data: content.items.map((cat) => ({
                name: cat.name,
                path: cat.id,
                keyword: cat.id,
                count: cat.count,
                isDirectory: true
              }))
            }
          ];
        }
        
        if (content.type === 'areas') {
          return [
            { 
              type: 'directory-list', 
              content: 'Areas of Expertise', 
              data: content.items.map((area) => ({
                name: area.name,
                keyword: getAreaKeyword(content.category.id, area.name),
                count: area.subitems?.length || 0,
                isDirectory: true
              }))
            },
            { type: 'tip', content: `For areas with spaces, use keywords: ${Object.keys(keywordDescriptions[content.category.id] || {}).join(', ')}` }
          ];
        }
        
        if (content.type === 'skills') {
          return [
            { 
              type: 'directory-list', 
              content: 'Skills & Technologies', 
              data: content.items.map((skill) => ({
                name: skill.name,
                description: skill.description,
                isDirectory: false
              }))
            }
          ];
        }
        
        if (content.type === 'skill-item') {
          return [
            {
              type: 'skill-detail',
              content: content.skill.name,
              data: content.skill
            }
          ];
        }
        
        return [{ type: 'error', content: 'Unknown directory type' }];
      }
    },
    cd: {
      description: 'Change directory',
      execute: (args: string[]) => {
        if (args.length === 0) {
          // cd with no args goes to root
          setCurrentPath({});
          return [{ type: 'system', content: 'Changed to root directory' }];
        }
        
        const path = args[0];
        
        if (path === '/') {
          // Go to root
          setCurrentPath({});
          return [{ type: 'system', content: 'Changed to root directory' }];
        }
        
        if (path === '..') {
          // Go up one level
          if (currentPath.skill) {
            setCurrentPath({ 
              category: currentPath.category, 
              area: currentPath.area,
              areaKeyword: currentPath.areaKeyword
            });
            return [{ type: 'system', content: `Changed to /${currentPath.category}/${currentPath.areaKeyword}` }];
          } else if (currentPath.area) {
            setCurrentPath({ category: currentPath.category });
            return [{ type: 'system', content: `Changed to /${currentPath.category}` }];
          } else if (currentPath.category) {
            setCurrentPath({});
            return [{ type: 'system', content: 'Changed to root directory' }];
          } else {
            return [{ type: 'system', content: 'Already at root directory' }];
          }
        }
        
        // Handle absolute paths
        if (path.startsWith('/')) {
          const segments = path.split('/').filter(Boolean);
          
          if (segments.length === 0) {
            setCurrentPath({});
            return [{ type: 'system', content: 'Changed to root directory' }];
          }
          
          if (segments.length > 3) {
            return [{ type: 'error', content: 'Path too deep. Maximum depth is 3 levels.' }];
          }
          
          // First segment is category
          const categoryName = segments[0];
          const category = findCategory(categoryName);
          
          if (!category) {
            return [{ type: 'error', content: `Category not found: ${categoryName}` }];
          }
          
          if (segments.length === 1) {
            setCurrentPath({ category: category.id });
            return [{ type: 'system', content: `Changed to /${category.id}` }];
          }
          
          // Second segment is area keyword
          const areaKey = segments[1];
          const areaMatch = findArea(category, areaKey);
          
          if (!areaMatch) {
            return [{ type: 'error', content: `Area not found: ${areaKey}` }];
          }
          
          if (segments.length === 2) {
            setCurrentPath({ 
              category: category.id, 
              area: areaMatch.area.name,
              areaKeyword: areaMatch.keyword
            });
            return [{ type: 'system', content: `Changed to /${category.id}/${areaMatch.keyword}` }];
          }
          
          // Third segment is skill
          const skillName = segments[2];
          const skill = findSkill(areaMatch.area, skillName);
          
          if (!skill) {
            return [{ type: 'error', content: `Skill not found: ${skillName}` }];
          }
          
          setCurrentPath({ 
            category: category.id, 
            area: areaMatch.area.name,
            areaKeyword: areaMatch.keyword,
            skill: skill.name 
          });
          return [{ type: 'system', content: `Changed to /${category.id}/${areaMatch.keyword}/${skill.name}` }];
        }
        
        // Handle relative paths
        if (!currentPath.category) {
          // At root, try to cd to a category
          const category = findCategory(path);
          
          if (!category) {
            return [{ type: 'error', content: `Category not found: ${path}` }];
          }
          
          setCurrentPath({ category: category.id });
          return [{ type: 'system', content: `Changed to /${category.id}` }];
        }
        
        if (!currentPath.area) {
          // At category level, try to cd to an area
          const category = skillsData[currentPath.category!];
          const areaMatch = findArea(category, path);
          
          if (!areaMatch) {
            // Generate a helpful error message with available keywords
            const availableKeywords = Object.keys(keywordDescriptions[currentPath.category!] || {})
              .map(key => `"${key}"`)
              .join(', ');
            
            return [
              { type: 'error', content: `Area not found: ${path}` },
              { type: 'tip', content: `Available keywords: ${availableKeywords}` }
            ];
          }
          
          setCurrentPath({ 
            category: currentPath.category, 
            area: areaMatch.area.name,
            areaKeyword: areaMatch.keyword
          });
          return [{ type: 'system', content: `Changed to /${currentPath.category}/${areaMatch.keyword}` }];
        }
        
        if (!currentPath.skill) {
          // At area level, try to cd to a skill
          const category = skillsData[currentPath.category!];
          const areaMatch = findArea(category, currentPath.areaKeyword!);
          
          if (!areaMatch) {
            return [{ type: 'error', content: `Current area not found` }];
          }
          
          const skill = findSkill(areaMatch.area, path);
          
          if (!skill) {
            return [{ type: 'error', content: `Skill not found: ${path}` }];
          }
          
          setCurrentPath({ 
            category: currentPath.category, 
            area: currentPath.area,
            areaKeyword: currentPath.areaKeyword,
            skill: skill.name 
          });
          return [{ type: 'system', content: `Changed to /${currentPath.category}/${currentPath.areaKeyword}/${skill.name}` }];
        }
        
        return [{ type: 'error', content: 'Already at maximum depth. Use "cd .." to go up.' }];
      }
    },
    clear: {
      description: 'Clear the terminal',
      execute: () => {
        setHistory([]);
        return [];
      }
    }
  };
  
  const handleCommand = (cmdStr: string) => {
    if (!cmdStr.trim()) return;
    
    const args = cmdStr.trim().split(' ');
    const cmd = args.shift()?.toLowerCase() || '';
    
    // Add user input to history
    setHistory(prev => [...prev, { type: 'input', content: `${getPrompt()} ${cmdStr}` }]);
    
    // Add to command history
    setPreviousCommands(prev => [cmdStr, ...prev].slice(0, 10));
    setCommandIndex(-1);
    
    // Process command
    if (cmd && commands[cmd as keyof typeof commands]) {
      const output = commands[cmd as keyof typeof commands].execute(args);
      setHistory(prev => [...prev, ...output]);
    } else if (cmd) {
      setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}. Type "help" for available commands.` }]);
    }
    
    setInput('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'l' && e.ctrlKey) {
      // Ctrl+L shortcut for clear
      e.preventDefault();
      commands.clear.execute();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = Math.min(commandIndex + 1, previousCommands.length - 1);
      if (nextIndex >= 0 && previousCommands[nextIndex]) {
        setCommandIndex(nextIndex);
        setInput(previousCommands[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.max(commandIndex - 1, -1);
      if (nextIndex >= 0) {
        setCommandIndex(nextIndex);
        setInput(previousCommands[nextIndex]);
      } else {
        setCommandIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      if (!input) return;
      
      const parts = input.split(' ').filter(Boolean);
      
      // Case 1: Complete command name
      if (parts.length === 1) {
        const cmdStart = parts[0];
        const matches = Object.keys(commands).filter(cmd => 
          cmd.toLowerCase().startsWith(cmdStart.toLowerCase())
        );
        
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        }
        return;
      }
      
      // Case 2: Complete category name for 'skills' or 'cd' command
      if ((parts[0] === 'skills' || parts[0] === 'cd') && parts.length === 2) {
        const categoryStart = parts[1];
        const matches = Object.keys(skillsData).filter(cat => 
          cat.toLowerCase().startsWith(categoryStart.toLowerCase())
        );
        
        if (matches.length === 1) {
          setInput(`${parts[0]} ${matches[0]} `);
        }
        return;
      }
      
      // Case 3: Complete area keyword for 'skills' command
      if (parts[0] === 'skills' && parts.length === 3) {
        const categoryName = parts[1];
        const areaStart = parts[2];
        
        // Find the category
        const category = findCategory(categoryName);
        if (!category) return;
        
        // Find matching area keywords
        const areaKeywords = Object.keys(keywordDescriptions[category.id] || {});
        const matches = areaKeywords.filter(keyword => 
          keyword.toLowerCase().startsWith(areaStart.toLowerCase())
        );
        
        if (matches.length === 1) {
          setInput(`${parts[0]} ${parts[1]} ${matches[0]}`);
        }
        return;
      }
      
      // Case 4: Complete area keyword for 'cd' command when in a category directory
      if (parts[0] === 'cd' && parts.length === 2 && currentPath.category) {
        const areaStart = parts[1];
        
        // Only if we're at the category level
        if (!currentPath.area) {
          // Find matching area keywords
          const areaKeywords = Object.keys(keywordDescriptions[currentPath.category] || {});
          const matches = areaKeywords.filter(keyword => 
            keyword.toLowerCase().startsWith(areaStart.toLowerCase())
          );
          
          if (matches.length === 1) {
            setInput(`${parts[0]} ${matches[0]}`);
          }
        }
        return;
      }
    }
  };
  
  // Auto-scroll to bottom of terminal and focus input
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    
    // Focus the input whenever it's rendered
    inputRef.current?.focus();
  }, [history]);
  
  // Refocus the input when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        inputRef.current.focus();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Render different types of history items
  const renderHistoryItem = (item: HistoryItem, idx: number) => {
    switch (item.type) {
      case 'system':
        return (
          <div key={idx} className="text-muted-foreground">{item.content}</div>
        );
      case 'input':
        return (
          <div key={idx} className="text-primary font-bold">{item.content}</div>
        );
      case 'error':
        return (
          <div key={idx} className="text-destructive font-mono">{item.content}</div>
        );
      case 'command-list':
        return (
          <div key={idx} className="mt-2 mb-2">
            <div className="grid grid-cols-1 gap-1">
              {item.data.map((cmd: any, i: number) => (
                <div key={i} className="flex items-center font-mono">
                  <span className="text-primary font-bold mr-4 w-32">{cmd.command}</span>
                  <span className="text-muted-foreground">{cmd.description}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div key={idx} className="mt-2 mb-4">
            <div className="flex items-center gap-3 mb-2">
              {item.avatar && (
                <div className="relative w-10 h-10 overflow-hidden rounded-full border border-primary/50 shadow-sm">
                  <Image
                    src={item.avatar}
                    alt="Ronny Badilla"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-2xl font-bold text-primary font-mono">{item.content}</div>
            </div>
            <div className="text-foreground font-mono mb-2">{item.data}</div>
            {item.website && (
              <div className="font-mono text-sm">
                <span className="text-muted-foreground">Website: </span>
                <a 
                  href={item.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  {item.website}
                </a>
              </div>
            )}
          </div>
        );
      case 'directory-list':
        return (
          <div key={idx} className="mt-2 mb-2">
            <div className="text-lg font-mono text-primary mb-2">{item.content}</div>
            {item.data.length === 0 ? (
              <div className="text-muted-foreground font-mono italic">Empty directory</div>
            ) : (
              <div className="grid grid-cols-1 gap-1">
                {item.data.map((entry: any, i: number) => (
                  <div key={i} className="flex items-center font-mono hover:bg-muted/50 p-1 rounded transition-colors">
                    {entry.isDirectory ? (
                      <Folder size={16} className="text-primary mr-2" />
                    ) : (
                      <FileText size={16} className="text-secondary mr-2" />
                    )}
                    <span className={`${entry.isDirectory ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {entry.name}
                    </span>
                    {entry.keyword && (
                      <span className="ml-2 text-muted-foreground text-xs">[{entry.keyword}]</span>
                    )}
                    {entry.count !== undefined && (
                      <Badge variant="outline" className="ml-2 text-xs">{entry.count}</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 italic text-muted-foreground font-mono text-sm">
              {item.data.some((entry: any) => entry.isDirectory) && 
                `Use "cd <keyword>" to navigate to a directory.`}
            </div>
          </div>
        );
      case 'skill-detail':
        return (
          <div key={idx} className="mt-2 mb-2">
            <div className="text-xl font-bold text-primary font-mono mb-1">{item.content}</div>
            {item.data.description && (
              <div className="text-foreground font-mono mb-3 px-2 py-1 bg-muted/40 rounded border-l-2 border-primary">
                {item.data.description}
              </div>
            )}
          </div>
        );
      case 'category-detail':
        return (
          <div key={idx} className="mt-2 mb-2">
            <div className="text-2xl font-bold text-primary font-mono mb-1">{item.content}</div>
            <div className="text-foreground font-mono mb-3">{item.data.description}</div>
            
            <Badge className="mb-4 bg-primary/80 text-primary-foreground font-mono">{item.data.count} items</Badge>
            
            <div className="text-lg font-mono text-foreground mb-2">Areas of Expertise</div>
            
            {item.data.areas.map((area: any, i: number) => (
              <div key={i} className="flex items-center mt-1 font-mono p-1 hover:bg-muted/50 rounded transition-colors">
                <Folder size={16} className="text-primary mr-2" />
                <span className="text-foreground">{area.name}</span>
                <span className="ml-2 text-muted-foreground text-xs">[{area.keyword}]</span>
                {area.count > 0 && (
                  <Badge variant="outline" className="ml-2">{area.count}</Badge>
                )}
              </div>
            ))}
            
            <div className="mt-3 italic text-muted-foreground font-mono text-sm">
              Try "skills {item.data.id} &lt;keyword&gt;" to view specific skills.
            </div>
          </div>
        );
      case 'area-detail':
        return (
          <div key={idx} className="mt-2 mb-2">
            <div className="text-xl font-bold text-primary font-mono mb-1">{item.content}</div>
            {item.data.description && (
              <div className="text-foreground font-mono mb-3">{item.data.description}</div>
            )}
            
            {item.data.skills.length > 0 ? (
              <>
                <div className="text-lg font-mono text-foreground mb-2">Skills & Technologies</div>
                <div className="grid grid-cols-2 gap-2">
                  {item.data.skills.map((skill: any, i: number) => (
                    <div 
                      key={i}
                      className="bg-muted/50 border border-border rounded p-2 hover:border-primary transition-colors"
                    >
                      <div className="font-mono text-primary">{skill.name}</div>
                      {skill.description && (
                        <div className="text-xs text-muted-foreground font-mono mt-1 line-clamp-1">
                          {skill.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-muted-foreground font-mono">No specific skills listed for this area.</div>
            )}
          </div>
        );
      case 'tip':
        return (
          <div key={idx} className="mt-2 text-muted-foreground italic font-mono text-sm">{item.content}</div>
        );
      default:
        return (
          <div key={idx} className="font-mono">{item.content}</div>
        );
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-lg">
      {/* Terminal header */}
      <div className="bg-muted px-4 py-2 flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-muted-foreground text-sm font-mono">skills.cli</div>
        <TerminalIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      
      {/* Terminal content */}
      <AnimatePresence>
        <motion.div 
          ref={terminalRef}
          className="p-4 h-[400px] overflow-y-auto font-mono text-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {history.map(renderHistoryItem)}
          
          {/* Current input line */}
          <div className="flex items-center mt-2">
            <span className="text-primary mr-2 font-mono">{getPrompt()}</span>
            <motion.span className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none text-foreground font-mono w-full"
                aria-label="Command input"
                autoComplete="off"
                spellCheck="false"
              />
              {/* Cursor */}
              <motion.div 
                className="absolute right-0 top-1 w-1.5 h-4 bg-foreground/70"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </motion.span>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Terminal footer */}
      <div className="bg-muted px-4 py-2 text-xs text-muted-foreground font-mono flex justify-between items-center">
        <span>Try: skills devops ci-cd, skills genai llm, help</span>
        <span className="text-xs">
          <kbd className="px-1 py-0.5 bg-card rounded text-foreground font-mono">Tab</kbd>
          <span className="mx-1">to autocomplete</span>
          <kbd className="px-1 py-0.5 bg-card rounded text-foreground font-mono">↑↓</kbd>
          <span className="ml-1">for history</span>
        </span>
      </div>
    </div>
  );
} 