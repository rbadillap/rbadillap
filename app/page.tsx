import { Metadata } from 'next';
import { RootLayout } from "@/components/layout/RootLayout";
import { HomeContent } from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: 'Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Architect',
  description: 'Personal website of Ronny Badilla, showcasing expertise in software development, DevOps, cloud architecture, and generative AI.',
};

export default function HomePage() {
  return (
    <RootLayout>
      <HomeContent />
    </RootLayout>
  );
}
