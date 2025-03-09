'use client';

import React, { useState, useEffect, useRef } from 'react';
import { skillsData } from '@/lib/data/skills';
import { Badge } from '@/components/ui/badge';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HistoryItem = {
  type: string;
  content: string;
  data?: any;
};

export default function SkillsCLI() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'system', content: 'Welcome to Ronny Badilla\'s CLI.' },
    { type: 'system', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [previousCommands, setPreviousCommands] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const commands = {
    help: {
      description: 'List available commands',
      execute: () => {
        return [
          { type: 'heading', content: 'Available Commands' },
          { type: 'command-item', content: 'help', data: 'Show this help menu' },
          { type: 'command-item', content: 'about', data: 'Display information about me' },
          { type: 'command-item', content: 'skills', data: 'List all skill categories' },
          { type: 'command-item', content: 'skills <category>', data: 'Show details about a category' },
          { type: 'command-item', content: 'skills <category>/<subcategory>', data: 'Show details about a subcategory' },
          { type: 'command-item', content: 'contact', data: 'Show contact information' },
          { type: 'command-item', content: 'clear', data: 'Clear the terminal' },
        ];
      }
    },
    about: {
      description: 'Display basic information about me',
      execute: () => {
        return [
          { type: 'heading', content: 'Ronny Badilla' },
          { type: 'paragraph', content: 'Software Developer, DevOps Engineer, and Cloud Architect with a focus on creating modern, interoperable systems.' },
          { type: 'paragraph', content: 'With over a decade of experience in software development, I\'ve evolved my practice to embrace the intersection of development, operations, and cloud infrastructure.' },
          { type: 'paragraph', content: 'My approach combines technical excellence with a focus on user experience and system design.' },
        ];
      }
    },
    skills: {
      description: 'List or explore skills',
      execute: (args: string[]) => {
        if (args.length === 0) {
          return [
            { type: 'heading', content: 'Skill Categories' },
            ...Object.values(skillsData).map(category => ({
              type: 'category-item',
              content: category.id,
              data: category
            })),
            { type: 'tip', content: 'Try "skills <category>" to see details about a specific category.' },
          ];
        }
        
        const path = args[0].split('/');
        const categoryId = path[0];
        const subcategoryId = path[1];
        
        const category = skillsData[categoryId];
        
        if (!category) {
          return [{ type: 'error', content: `Category not found: ${categoryId}` }];
        }
        
        if (!subcategoryId) {
          // Show category details
          const result: HistoryItem[] = [
            { type: 'heading', content: category.name },
            { type: 'paragraph', content: category.description },
            { type: 'level', content: `Level: ${category.level}` }
          ];
          
          if (Array.isArray(category.skills)) {
            result.push({ type: 'skill-list', content: '', data: category.skills });
          } else {
            result.push({ type: 'subheading', content: 'Subcategories' });
            Object.values(category.skills).forEach(subcat => {
              result.push({
                type: 'category-item',
                content: subcat.id,
                data: subcat
              });
            });
            result.push({ type: 'tip', content: `Try "skills ${categoryId}/<subcategory>" to explore a specific area.` });
          }
          
          return result;
        }
        
        // Show subcategory details
        if (Array.isArray(category.skills)) {
          return [{ type: 'error', content: `No subcategories in ${category.name}` }];
        }
        
        const subcategory = category.skills[subcategoryId];
        
        if (!subcategory) {
          return [{ type: 'error', content: `Subcategory not found: ${subcategoryId}` }];
        }
        
        return [
          { type: 'heading', content: subcategory.name },
          { type: 'paragraph', content: subcategory.description },
          { type: 'level', content: `Level: ${subcategory.level}` },
          { type: 'skill-list', content: '', data: subcategory.skills }
        ];
      }
    },
    contact: {
      description: 'Show contact information',
      execute: () => {
        return [
          { type: 'heading', content: 'Contact Information' },
          { type: 'contact-item', content: 'Email', data: 'info@ronnybadilla.com' },
          { type: 'contact-item', content: 'GitHub', data: 'github.com/rbadillap' },
          { type: 'contact-item', content: 'LinkedIn', data: 'linkedin.com/in/ronnybadilla' },
          { type: 'contact-item', content: 'Twitter', data: 'twitter.com/rbadillap' },
        ];
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
    setHistory(prev => [...prev, { type: 'input', content: cmdStr }]);
    
    // Add to command history
    setPreviousCommands(prev => [cmdStr, ...prev].slice(0, 10));
    setCommandIndex(-1);
    
    // Process command
    if (cmd && commands[cmd as keyof typeof commands]) {
      const output = commands[cmd as keyof typeof commands].execute(args);
      setHistory(prev => [...prev, ...output]);
    } else if (cmd) {
      setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}. Type "help" to see available commands.` }]);
    }
    
    setInput('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
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
      
      // Simple command completion
      const cmdStart = input.split(' ')[0];
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(cmdStart));
      
      if (matches.length === 1) {
        if (input.includes(' ')) {
          // Only replace the command part
          setInput(matches[0] + input.substring(input.indexOf(' ')));
        } else {
          setInput(matches[0] + ' ');
        }
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
      case 'input':
        return (
          <div key={idx} className="flex items-center text-gray-300 font-mono">
            <span className="mr-2 text-purple-500">$</span>
            <span>{item.content}</span>
          </div>
        );
      case 'error':
        return (
          <div key={idx} className="text-red-400 font-mono">{item.content}</div>
        );
      case 'system':
        return (
          <div key={idx} className="text-gray-400 font-mono">{item.content}</div>
        );
      case 'heading':
        return (
          <div key={idx} className="text-xl font-bold mb-2 text-purple-500 font-mono">{item.content}</div>
        );
      case 'subheading':
        return (
          <div key={idx} className="text-lg font-semibold my-1 text-gray-300 font-mono">{item.content}</div>
        );
      case 'paragraph':
        return (
          <div key={idx} className="mb-3 text-gray-300 font-mono">{item.content}</div>
        );
      case 'command-item':
        return (
          <div key={idx} className="ml-4 font-mono flex items-start mb-1">
            <span className="text-purple-500 font-mono w-24 inline-block">{item.content}</span>
            <span className="text-gray-400 flex-1">{item.data}</span>
          </div>
        );
      case 'level':
        return (
          <div key={idx} className="mb-3 flex items-center font-mono">
            <Badge className="bg-purple-500 text-white font-mono">{item.content}</Badge>
          </div>
        );
      case 'category-item':
        return (
          <div key={idx} className="ml-4 font-mono flex items-center mb-1">
            <span className="text-purple-500 mr-2">•</span>
            <span className="text-gray-400 mr-2 font-mono">{item.data.id}:</span>
            <span className="text-white font-mono">{item.data.name}</span>
            <Badge className="ml-2 bg-purple-500 text-white font-mono">{item.data.level}</Badge>
          </div>
        );
      case 'contact-item':
        return (
          <div key={idx} className="ml-4 font-mono flex items-center mb-1">
            <span className="text-purple-500 mr-2 font-mono w-20 inline-block">{item.content}:</span>
            <span className="text-white font-mono">{item.data}</span>
          </div>
        );
      case 'skill-list':
        return (
          <div key={idx} className="grid grid-cols-2 gap-2 mb-3 mt-2">
            {item.data.map((skill: any, i: number) => (
              <Badge 
                key={i} 
                variant="outline" 
                className="bg-purple-900/20 border-purple-700 text-purple-300 font-mono"
              >
                {skill.name}
                {skill.level && <span className="ml-2 text-xs opacity-75">{skill.level}</span>}
              </Badge>
            ))}
          </div>
        );
      case 'tip':
        return (
          <div key={idx} className="mt-2 text-gray-400 italic font-mono text-sm">{item.content}</div>
        );
      default:
        return (
          <div key={idx} className="font-mono">{item.content}</div>
        );
    }
  };

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950 shadow-lg">
      {/* Terminal header */}
      <div className="bg-gray-900 px-4 py-2 flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-gray-400 text-sm font-mono">about.cli</div>
        <TerminalIcon className="h-4 w-4 text-gray-400" />
      </div>
      
      {/* Terminal content */}
      <AnimatePresence>
        <motion.div 
          ref={terminalRef}
          className="p-4 h-[400px] overflow-y-auto font-mono text-gray-200 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {history.map(renderHistoryItem)}
          
          {/* Current input line */}
          <div className="flex items-center mt-2">
            <span className="text-purple-500 mr-2 font-mono">$</span>
            <motion.span className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none text-gray-200 font-mono w-full"
                aria-label="Command input"
                autoComplete="off"
                spellCheck="false"
              />
              {/* Cursor */}
              <motion.div 
                className="absolute right-0 top-1 w-1.5 h-4 bg-gray-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </motion.span>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Terminal footer */}
      <div className="bg-gray-900 px-4 py-2 text-xs text-gray-500 font-mono flex justify-between items-center">
        <span>Try: help, about, skills, contact</span>
        <span className="text-xs">
          <kbd className="px-1 py-0.5 bg-gray-800 rounded text-gray-400 font-mono">Tab</kbd>
          <span className="mx-1">to autocomplete</span>
          <kbd className="px-1 py-0.5 bg-gray-800 rounded text-gray-400 font-mono">↑↓</kbd>
          <span className="ml-1">for history</span>
        </span>
      </div>
    </div>
  );
} 