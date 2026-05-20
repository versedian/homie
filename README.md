# homie

A minimal, privacy-first personal homepage & search interface for [Cloudflare Pages](https://pages.cloudflare.com/).

**No analytics. No tracking. No telemetry. Just search.**

## Features

- 🔍 **Fast search** – Eight search engines at your fingertips: Google, DuckDuckGo, Bing, and Brave (plus image search variants)
- 🌙 **Dark mode by default** – Handcrafted dark theme with muted pastels and neon accents
- 🎨 **Brand-aware colors** – Each search engine has a distinct, recognizable color
- ⚡ **Static & lightweight** – ~764 KB production build, zero external dependencies for tracking
- 🔐 **Privacy first** – Locally persisted search state via sessionStorage, no external requests
- ♿ **Keyboard shortcuts** – Start typing from anywhere on the page to search
- 📱 **Fully responsive** – Works beautifully on desktop, tablet, and mobile

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Building for Production

```bash
npm run build
```

Static files are exported to the `out/` directory.

## Deployment

### Cloudflare Pages (Recommended)

1. Fork this repository or push it to your own GitHub account.
2. Log in to your [Cloudflare Pages](https://pages.cloudflare.com/) dashboard.
3. Create a new project and connect your GitHub repository.
4. Set these deployment settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. Deploy and configure your custom domain in Cloudflare DNS.

The site will build and deploy automatically on every push to `main`.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime**: Node.js 25+
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/) + [Cloudflare Workers](https://workers.cloudflare.com/) (optional)

## Privacy & Philosophy

This project is built with privacy as a first-class concern:

- ✅ No Google Analytics, Segment, or tracking pixels
- ✅ No external requests beyond search engine redirects
- ✅ No cookies (only sessionStorage for search state)
- ✅ No telemetry or diagnostics uploads
- ✅ Static export means no server logs
- ✅ Public domain license — use it for anything

Search queries are stored locally in your browser's sessionStorage and persist across redirects for consistency. They are **never** sent to any server except the search engine you explicitly choose.

## License

This project is released under [The Unlicense](https://unlicense.org/) — it is free and unencumbered software released into the public domain.

## Contributing

Suggestions and pull requests are welcome! Please ensure any changes:

- Maintain the minimal dependency philosophy
- Preserve privacy-first principles (no tracking, no telemetry)
- Keep the build output under 1 MB
- Pass ESLint and TypeScript strict mode checks

## See Also

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
