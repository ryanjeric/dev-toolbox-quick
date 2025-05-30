# Dev Toolbox Quick

A modern React application built with Vite, TypeScript, and shadcn-ui components.

## Project Overview

This project is a development toolbox application that provides a collection of useful development tools and utilities. It's built with modern web technologies and follows best practices for React development.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui (based on Radix UI)
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query
- **Routing**: React Router DOM
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Notifications**: Sonner
- **Development Tools**: ESLint, TypeScript, SWC

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or bun package manager

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd dev-toolbox-quick

# Install dependencies
npm install
# or if using bun
bun install

# Start the development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173` by default.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## Development Guidelines

1. Follow TypeScript best practices and maintain type safety
2. Use shadcn-ui components for consistent UI
3. Follow the established project structure
4. Write clean, maintainable code with proper documentation
5. Use ESLint for code quality

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c4bcb002-2ff4-43bb-acfc-db23a9182a15

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c4bcb002-2ff4-43bb-acfc-db23a9182a15) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c4bcb002-2ff4-43bb-acfc-db23a9182a15) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
