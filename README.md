# Doctors Who Code - Headless WordPress

A modern, headless WordPress blog built with Next.js 15, Apollo Client, and Tailwind CSS. Features a beautiful dark theme with glassmorphism design inspired by chukwumaonyeije.com.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** WordPress (Headless via GraphQL)
- **GraphQL Client:** Apollo Client
- **Styling:** Tailwind CSS v4 + Typography Plugin
- **Language:** TypeScript
- **Deployment:** Vercel (recommended)

## 🎨 Features

- ✅ Headless WordPress integration via GraphQL
- ✅ Beautiful blog cards with featured images
- ✅ Full single post pages with SEO metadata
- ✅ Reading time calculation
- ✅ Social sharing (Twitter, LinkedIn, Facebook)
- ✅ Dark theme with brand colors (purple/cyan)
- ✅ Glassmorphism effects
- ✅ Responsive design
- ✅ Code syntax highlighting
- ✅ Open Graph & Twitter Card support

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- WordPress site with WPGraphQL plugin

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd doctors-who-code-headless

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your blog.

## 📁 Project Structure

```
doctors-who-code-headless/
├── app/
│   ├── blog/[slug]/
│   │   └── page.tsx          # Single post page
│   ├── page.tsx               # Homepage (post list)
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── PostCard.tsx           # Blog card component
│   └── ShareButtons.tsx       # Social share buttons
├── lib/
│   ├── graphql-client.ts      # Apollo Client config
│   └── reading-time.ts        # Reading time calculator
└── .warp/
    └── workflows/             # Warp terminal workflows
```

## ⚡ Warp Workflows

This project is optimized for [Warp Terminal](https://www.warp.dev/). Access workflows with `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac):

- **Development Server** - Start dev server
- **Build Project** - Production build
- **Install Dependencies** - Install npm packages
- **Run Linter** - Check code quality
- **Git Commit** - Quick commit with message
- **Deploy to Vercel** - Build and deploy

## 🎨 Customization

### Brand Colors

Edit `app/globals.css`:

```css
:root {
  --background: #0B1120;  /* Deep blue-black */
  --surface: #1E293B;     /* Card backgrounds */
  --primary: #8b5cf6;     /* Purple accent */
  --secondary: #06b6d4;   /* Cyan accent */
}
```

### WordPress GraphQL Endpoint

Edit `lib/graphql-client.ts`:

```typescript
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://your-wordpress-site.com/graphql",
  }),
  cache: new InMemoryCache(),
});
```

### Image Domains

Edit `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-wordpress-site.com",
      },
    ],
  },
};
```

## 📝 Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Vercel auto-detects Next.js configuration
4. Deploy!

### Environment Variables

Add to `.env.local` or Vercel dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://your-site.com
```

## 📦 WordPress Setup

### Required Plugins

1. **WPGraphQL** - Enable GraphQL API
2. **WPGraphQL for SEO** (optional) - SEO metadata
3. **WPGraphQL for Advanced Custom Fields** (optional) - Custom fields

### GraphQL Endpoint

Your WordPress GraphQL endpoint is typically:
```
https://your-wordpress-site.com/graphql
```

Test it in GraphiQL IDE (usually available at `/graphql` on your WP site).

## 🎯 Roadmap

- [ ] Navigation bar with glassmorphism
- [ ] Footer component
- [ ] Related posts section
- [ ] Search functionality
- [ ] Categories/tags filtering
- [ ] Pagination
- [ ] Dark/light mode toggle
- [ ] Comments integration

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📄 License

MIT

## 👨‍⚕️ About

Built by Dr. Chukwuma Onyeije - Maternal-Fetal Medicine Specialist & Physician-Coder.

Part of the [Doctors Who Code](https://doctorswhocode.blog) initiative to help clinicians build their own tech tools.

---

**Need help?** Open an issue or visit [doctorswhocode.blog](https://doctorswhocode.blog).
