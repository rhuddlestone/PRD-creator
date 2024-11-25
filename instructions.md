# Project Requirement Document: PRD Generator

## Introduction

This document outlines the requirements and specifications for PRD Generator, a micro SaaS application designed to streamline the creation of Project Requirement Documents. The system will leverage AI capabilities to assist product designers and programmers in generating comprehensive PRDs efficiently.

## Project Overview

PRD Generator is a web-based application that automates and simplifies the process of creating Project Requirement Documents. Users can input basic project information, including project name, description, tech stack, and page descriptions.  These deatils are sent to the LLM and the user receives an AI-generated PRD draft that can be further refined and exported.

### Target Audience

-   Product Managers
-   Software Developers
-   UX/UI Designers
-   Project Stakeholders

### Key Features

-   AI-powered PRD generation
-   Real-time document editing
-   Markdown export functionality



## Technical Specifications

### Core Technologies

#### Frontend

-   **NextJS 14 (App Router)**
    -   Chosen for server-side rendering and optimal performance
    -   Enables efficient routing and data fetching
    -   Provides robust development environment
-   **TypeScript**
    -   Ensures type safety and code reliability
    -   Improves development experience with better IDE support
    -   Reduces runtime errors through static typing

#### Backend & Database

-   **Postgres (Supabase)**
    -   Reliable relational database for structured data storage
    -   Excellent performance and scalability
    -   Built-in real-time capabilities
-   **Prisma ORM**
    -   Type-safe database access
    -   Automated migrations and schema management
    -   Simplified database operations

#### Authentication & Security

-   **Clerk**
    -   Complete authentication solution
    -   Built-in security features
    -   Easy social login integration

#### UI/UX

-   **Shadcn & Tailwind CSS**
    -   Consistent component library
    -   Utility-first CSS framework
    -   Responsive design capabilities

#### AI Integration

-   **Vercel AI SDK with Anthropic LLM**
    -   Seamless AI integration
    -   Efficient streaming responses
    -   Production-ready AI capabilities

### Recommended Packages

json

Copy

`{   "dependencies":  { "@clerk/nextjs":  "latest", "@prisma/client":  "latest", "@tanstack/react-query":  "latest", "@mdxeditor/editor":  "latest", "zod":  "latest", "zod-prisma-types":  "latest", "@vercel/ai":  "latest", "tailwindcss":  "latest", "shadcn-ui":  "latest" } }`

## Page-by-Page Breakdown

### Landing Page

#### Overview

Modern SaaS landing page showcasing the application's features and benefits.

#### Key Components

-   Hero section with value proposition
-   Feature highlights
-   Pricing section
-   Call-to-action buttons
-   Testimonials section

#### File Structure

Copy

`/app/page.tsx /components/landing/
 ├── hero.tsx ├── features.tsx ├── pricing.tsx ├── testimonials.tsx └── cta-button.tsx`

### Dashboard

#### Overview

Central hub for managing PRDs with creation and management capabilities.

#### Key Features

-   PRD list view (this should show the user's PRDs)
-   Create new PRD dialog.  This is where the user adds the Project Name, Project Details, Tech Stack and a Description of the required pags and their functions.
-   Delete PRD functionality
-   Search and filter capabilities

#### Data Requirements

typescript

Copy

`interface  PRD  {   id:  string; title:  string; description:  string; techStack:  string[]; createdAt:  Date; updatedAt:  Date; content:  string; }`

#### File Structure

Copy

`/app/dashboard/  ├── page.tsx ├── loading.tsx └── error.tsx /components/dashboard/
 ├── prd-list.tsx ├── create-prd-dialog.tsx ├── delete-prd-button.tsx └── search-bar.tsx`

### PRD Page

#### Overview

Dedicated page for viewing and editing individual PRDs.

#### Key Features

-   Rich text editor (MDXEditor)
-   Real-time saving
-   Export functionality (Markdown/PDF)


#### Required Packages

-   MDXEditor for rich text editing
-   react-to-pdf for PDF export

#### File Structure

Copy

`/app/prd/[id]/  ├── page.tsx ├── loading.tsx └── error.tsx /components/prd/
 ├── editor.tsx ├── toolbar.tsx ├── export-button.tsx └── version-history.tsx`

## Additional Features and Requirements

### Authentication & Authorization

-   User registration and login via Clerk
-   Role-based access control
-   Secure session management

### Data Management

-   Real-time database updates
-   Automated backups
-   Data validation using Zod

### API Integration

-   REST API endpoints for CRUD operations
-   Websocket connections for real-time updates
-   Rate limiting and security measures

### Performance Requirements

-   Page load time < 3 seconds
-   Time to First Byte < 1 second
-   99.9% uptime SLA

### Security Considerations

-   HTTPS encryption
-   CSRF protection
-   Input sanitization
-   Regular security audits

## Timeline and Milestones

### Phase 1: Foundation (Week 1-2)

-   Project setup and configuration
-   Authentication implementation
-   Database schema design

### Phase 2: Core Features (Week 3-4)

-   Landing page development
-   Dashboard implementation
-   Basic PRD creation flow

### Phase 3: Advanced Features (Week 5-6)

-   Rich text editor integration
-   Export functionality
-   Real-time collaboration features

### Phase 4: Polish (Week 7-8)

-   UI/UX refinement
-   Performance optimization
-   Testing and bug fixes

## Next Steps

1.  Review and approve technical specifications
2.  Set up development environment
3.  Create initial project structure
4.  Begin implementation of Phase 1 components



# Important Implementation Notes
## 0. Adding logs
   - Always add server side logs to your code so we can debug any potential issues

## 1. Project setup
   - All new components should go in /components at the root (not in the app folder) and be named like example-component.tsx unless otherwise specified
   - All new pages go in /app
   - Use the Next.js 14 app router
   - All data fetching should be done in a server component and pass the data down as props
   - Client components (useState, hooks, etc) require that 'use client' is set at the top of the file

## 2. Server-Side API Calls:
   - All interactions with external APIs (e.g., Reddit, OpenAI) should be performed server-side.
   - Create dedicated API routes in the `pages/api` directory for each external API interaction.
   - Client-side components should fetch data through these API routes, not directly from external APIs.

## 3. Environment Variables:
   - Store all sensitive information (API keys, credentials) in environment variables.
   - Use a `.env.local` file for local development and ensure it's listed in `.gitignore`.
   - For production, set environment variables in the deployment platform (e.g., Vercel).
   - Access environment variables only in server-side code or API routes.

## 4. Error Handling and Logging:
   - Implement comprehensive error handling in both client-side components and server-side API routes.
   - Log errors on the server-side for debugging purposes.
   - Display user-friendly error messages on the client-side.

## 5. Type Safety:
   - Use TypeScript interfaces for all data structures, especially API responses.
   - Avoid using `any` type; instead, define proper types for all variables and function parameters.

## 6. API Client Initialization:
   - Initialize API clients (e.g., Snoowrap for Reddit, OpenAI) in server-side code only.
   - Implement checks to ensure API clients are properly initialized before use.

## 7. Data Fetching in Components:
   - Use React hooks (e.g., `useEffect`) for data fetching in client-side components.
   - Implement loading states and error handling for all data fetching operations.

## 8. Next.js Configuration:
   - Utilize `next.config.mjs` for environment-specific configurations.
   - Use the `env` property in `next.config.mjs` to make environment variables available to the application.

## 9.  CORS and API Routes:
   - Use Next.js API routes to avoid CORS issues when interacting with external APIs.
   - Implement proper request validation in API routes.

## 10. Component Structure:
   - Separate concerns between client and server components.
   - Use server components for initial data fetching and pass data as props to client components.

## 11. Security:
    - Never expose API keys or sensitive credentials on the client-side.
    - Implement proper authentication and authorization for API routes if needed.

## 12. Special syntax:
   - When use shadcn, use npx shadcn@latest add xxx, instead of shadcn-ui@latest, this is deprecated

