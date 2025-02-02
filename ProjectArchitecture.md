# Arbolitics Dashboard - Architecture Documentation

## Project Overview
Arbolitics Dashboard is a Next.js application built with TypeScript, featuring a modern tech stack including Tailwind CSS for styling. The application follows Next.js 13+ App Router architecture patterns.

## Directory Structure

```
arbolitics/
├── src/                      # Source code directory
│   ├── app/                  # Next.js App Router directory
│   │   ├── api/             # API routes
│   │   ├── dashboard/       # Dashboard page
│   │   ├── login/          # Login page
│   │   ├── layout.tsx      # Root layout component
│   │   ├── page.tsx        # Root page component
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   ├── contexts/           # React Context providers
│   ├── types/             # TypeScript type definitions
│   └── middleware.ts      # Next.js middleware
├── public/                # Static assets
├── .next/                # Next.js build output
└── node_modules/         # Dependencies
```

## Core Components

### 1. Application Layer (`src/app/`)
- Implements the Next.js App Router pattern
- Contains page routes and layouts
- Houses API routes for backend functionality

### 2. Components (`src/components/`)
- Contains reusable UI components
- Follows a modular architecture for better maintainability

### 3. Context Layer (`src/contexts/`)
- Manages application state
- Provides shared state across components

### 4. Types (`src/types/`)
- Contains TypeScript type definitions
- Ensures type safety across the application

### 5. Middleware (`src/middleware.ts`)
- Handles request/response pipeline
- Implements authentication and other request processing logic

## Technology Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Development Tools**:
  - ESLint for code linting
  - PostCSS for CSS processing
  - TypeScript for static typing

## Best Practices

1. **Type Safety**
   - Strict TypeScript configuration
   - Type definitions for all components and functions

2. **Code Organization**
   - Modular component architecture
   - Clear separation of concerns
   - Feature-based directory structure

3. **Styling**
   - Tailwind CSS for utility-first styling
   - Global styles in `globals.css`

## Build and Development

The project uses standard Next.js build and development processes:
- Development server: `npm run dev`
- Production build: `npm run build`
- Production server: `npm start`

## Configuration Files

- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.mjs`: ESLint configuration
- `postcss.config.mjs`: PostCSS configuration
