import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
}

export function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  return (
    <Link 
      href={link}
      className="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:bg-card/50"
    >
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
} 