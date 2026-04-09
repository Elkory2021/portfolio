export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  github?: string
  liveDemo?: string
  gradient: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with cart functionality, user authentication, and payment integration.',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, drag-and-drop boards, and team workspaces.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    title: 'AI Content Generator',
    description: 'Intelligent content generation tool powered by machine learning for marketing and social media.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: '4',
    title: 'Real-time Chat Application',
    description: 'Modern messaging platform with channels, direct messages, file sharing, and end-to-end encryption.',
    techStack: ['Next.js', 'WebSocket', 'Redis', 'Prisma'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: '5',
    title: 'Portfolio CMS',
    description: 'Headless CMS for managing portfolio content with markdown support and image optimization.',
    techStack: ['Node.js', 'GraphQL', 'Apollo', 'AWS S3'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    gradient: 'from-indigo-500 to-violet-500'
  },
  {
    id: '6',
    title: 'Weather Dashboard',
    description: 'Interactive weather visualization with forecasts, historical data, and location-based alerts.',
    techStack: ['React', 'D3.js', 'OpenWeather API', 'Vercel'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    gradient: 'from-sky-500 to-blue-500'
  }
]
