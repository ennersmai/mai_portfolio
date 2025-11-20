# Systems Engineer Portfolio

A modern, cyberpunk-inspired portfolio showcasing 10+ years of experience in high-performance systems, AI architecture, and agentic workflows.

## Features

- **Interactive Terminal**: AI-powered chat interface using Google Gemini API
- **3D Animations**: Custom 3D logo and hero animations
- **Project Showcase**: Detailed project cards with hover effects and stats
- **Responsive Design**: Optimized for all screen sizes
- **Modern Stack**: React 19, TypeScript, Vite

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd portafolio-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Add your project images to `public/images/`:
   - `mysweetie.png`
   - `billi-voice.png`
   - `meetjeeves.png`
   - `ehb-bot.png`
   - `tpe-field-agent.png`
   - `hospitality-ai-dashboard.png`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `GEMINI_API_KEY` as an environment variable in Vercel
4. Deploy!

The project is already configured for Vercel deployment.

## Project Structure

```
├── components/          # React components
├── public/
│   └── images/         # Project images
├── services/           # API services
├── App.tsx            # Main app component
├── constants.ts       # Project data and configuration
└── types.ts           # TypeScript type definitions
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required for the terminal chat feature)

## License

Private project - All rights reserved
