export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'mastering-typescript-generics',
    title: 'Mastering TypeScript Generics: A Deep Dive',
    date: '2024-03-15',
    excerpt: 'Learn how to write more flexible and reusable code using TypeScript generics with practical examples.',
    category: 'TypeScript',
    content: `
## Introduction

TypeScript generics are one of the most powerful features for creating reusable code. They allow you to write functions and classes that can work with multiple types while maintaining type safety.

## Why Generics?

Without generics, we'd have to either use \`any\` (losing type safety) or write separate functions for each type. Generics give us the best of both worlds.

## Basic Syntax

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Constraints

You can constrain generics to ensure they have certain properties:

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## Conclusion

Generics are essential for building robust TypeScript applications. Master them and your code will be more flexible and type-safe.
    `
  },
  {
    slug: 'building-performant-react-apps',
    title: 'Building Performant React Applications in 2024',
    date: '2024-02-28',
    excerpt: 'Explore the latest techniques and best practices for optimizing React application performance.',
    category: 'React',
    content: `
## Introduction

Performance is crucial for user experience. In this post, we'll explore modern techniques for building fast React applications.

## Key Optimization Strategies

1. **Use React Server Components**
2. **Implement proper code splitting**
3. **Optimize re-renders with useMemo and useCallback**
4. **Leverage lazy loading**

## Server Components

React Server Components allow you to render components on the server, reducing the JavaScript bundle sent to the client.

## Conclusion

Always measure performance before optimizing. Use React DevTools Profiler to identify bottlenecks.
    `
  },
  {
    slug: 'my-journey-learning-nextjs',
    title: 'My Journey Learning Next.js: From Beginner to Pro',
    date: '2024-01-20',
    excerpt: 'Reflecting on my learning journey with Next.js and the key lessons I learned along the way.',
    category: 'Learning',
    content: `
## The Beginning

My journey with Next.js started when I needed to build a fast, SEO-friendly website. I was coming from a vanilla React background and was overwhelmed by the new concepts.

## Key Learnings

- **App Router** changed how I think about routing
- **Server Components** revolutionized my approach to data fetching
- **API Routes** made backend development seamless

## Tips for Beginners

1. Start with the basics
2. Build projects
3. Read the documentation
4. Join the community

## Conclusion

Learning Next.js has been transformative. The ecosystem is mature, and the community is supportive.
    `
  }
]
