'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import the CLI component in a client component
const SkillsCLI = dynamic(() => import('./SkillsCLI'), {
  ssr: false,
  loading: () => (
    <div className="border border-border rounded-lg overflow-hidden bg-card shadow-lg h-[400px] flex items-center justify-center">
      <div className="text-muted-foreground font-mono text-sm">Loading CLI interface...</div>
    </div>
  )
});

export default function SkillsCLIWrapper() {
  return <SkillsCLI />;
} 