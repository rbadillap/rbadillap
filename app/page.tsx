import { Metadata } from 'next';
import { RootLayout } from "@/components/layout/RootLayout";
import { HomeContent } from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: 'Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Architect',
  description: 'Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Expert - @rbadillap in socials',
};

export default function HomePage() {
  return (
    <RootLayout>
      <HomeContent />
    </RootLayout>
  );
}
