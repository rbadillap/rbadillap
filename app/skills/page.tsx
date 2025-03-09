import { Metadata } from 'next';
import { RootLayout } from "@/components/layout/RootLayout";
import SkillsCLIWrapper from '@/components/skills-cli/SkillsCLIWrapper';

export const metadata: Metadata = {
  title: 'Skills - Ronny Badilla',
  description: 'Explore my technical skills and expertise as a software developer, DevOps engineer, and cloud architect through an interactive CLI interface.',
};

export default function SkillsPage() {
  return (
    <RootLayout>
      <div className="flex flex-col space-y-12 max-w-3xl">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Skills</h1>
          <p className="text-xl text-muted-foreground">
            Explore my technical skills and expertise through this interactive CLI.
          </p>
        </section>

        <section>
          <SkillsCLIWrapper />
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Pro tip:</strong> Try typing <code className="bg-muted px-1 py-0.5 rounded font-mono">skills</code> followed by a category like <code className="bg-muted px-1 py-0.5 rounded font-mono">devops</code> or <code className="bg-muted px-1 py-0.5 rounded font-mono">genai</code>.
            </p>
            <p>
              The command line interface is fully interactive. Use keyboard shortcuts like 
              <kbd className="mx-1 px-1 py-0.5 bg-muted rounded font-mono">Tab</kbd> for autocompletion and 
              <kbd className="mx-1 px-1 py-0.5 bg-muted rounded font-mono">↑↓</kbd> for command history.
            </p>
          </div>
        </section>
      </div>
    </RootLayout>
  );
} 