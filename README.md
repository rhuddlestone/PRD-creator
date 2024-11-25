# PRD Generator

A micro SaaS application designed to streamline the creation of Project Requirement Documents using AI capabilities.

## Overview

PRD Generator helps product designers and programmers create comprehensive Project Requirement Documents efficiently. Users can input basic project information such as project name, description, tech stack, and page descriptions, and receive an AI-generated PRD draft that can be further refined and exported.

## Target Audience

- Product Managers
- Software Developers
- UX/UI Designers
- Project Stakeholders

## Key Features

- AI-powered PRD generation
- Real-time document editing
- Markdown export functionality
- Rich text editing with MDXEditor
- Real-time saving
- Export to Markdown/PDF

## Tech Stack

### Frontend
- Next.js 14 (App Router) for server-side rendering and optimal performance
- TypeScript for type safety and code reliability
- Shadcn & Tailwind CSS for UI components and styling
- MDXEditor for rich text editing

### Backend & Database
- Postgres (Supabase) for data storage
- Prisma ORM for type-safe database access
- Clerk for authentication
- Vercel AI SDK with Anthropic LLM for AI integration

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file with the following variables
DATABASE_URL="your-database-url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-key"
CLERK_SECRET_KEY="your-clerk-secret"
ANTHROPIC_API_KEY="your-anthropic-key"
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
/app
├── dashboard/        # Dashboard for managing PRDs
├── prd/[id]/        # Individual PRD view/edit page
└── page.tsx         # Landing page
/components
├── landing/         # Landing page components
├── dashboard/       # Dashboard components
└── prd/            # PRD editing components
```

## Security Features

- HTTPS encryption
- CSRF protection
- Input sanitization
- Regular security audits
- Secure session management
- Role-based access control

## Performance

- Page load time < 3 seconds
- Time to First Byte < 1 second
- 99.9% uptime SLA

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.
