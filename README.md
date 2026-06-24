# Ajit Kumar Sharma - Personal Portfolio Website

A modern, highly responsive, single-page personal portfolio website built for **Ajit Kumar Sharma**, an MCA Candidate and Software Developer based in Bangalore, India.

The project features a sleek dark mode by default (with light mode toggle), custom typing animation effects, interactive HTML5 canvas particle background, custom scroll reveal transitions, education & experience timelines, dynamic skills ratings, and contact form validation.

---

## 🚀 Features

- **Double Themes**: Sleek dark mode (#0A0F1E default) and light mode (#F8FAFC) toggle with system selection persistence.
- **Glassmorphism Styling**: Frosted glass sticky navbar and card designs using modern CSS variables.
- **Dynamic Particles**: Lightweight custom JavaScript-driven HTML5 canvas particle grid adjusting automatically to theme colors.
- **Automated Typewriter**: Smooth typing animation for roles ("Software Developer", "Full Stack Developer", "MCA Student").
- **Professional Timelines**: Detailed education and experience milestones using glowing timeline markers.
- **Form Validator**: Interactive contact form with floating input labels, validation regex, and simulated submit loaders.
- **Performance Optimized**: Zero frameworks, zero external bundlers, and zero packages — loads instantly.

---

## 🛠️ Tech Stack

- **Structure**: HTML5 (Semantic elements & SEO tags)
- **Styling**: Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Custom Keyframes)
- **Interactivity**: Vanilla JavaScript (ES6+, Canvas API, IntersectionObserver API)
- **Icons**: Font Awesome (CDN)
- **Fonts**: Google Fonts (Inter & Poppins)

---

## 💻 Local Development

Since this project is built using native web technologies, it requires no build, compilation, or compilation dependencies. You can run it instantly.

### Option 1: Live Server (Recommended)
If using VS Code, install the **Live Server** extension, open the project directory, and click **Go Live** at the bottom-right corner.

### Option 2: Node.js (Local Command Line)
If you have Node.js installed, you can start a local development server using any lightweight npm module. For example, using `http-server`:

```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Run the server inside the project root folder
http-server .
```

Alternatively, run it dynamically without global installation:

```bash
npx http-server .
```

Open `http://127.0.0.1:8080` in your web browser.

---

## 📦 Deployment Instructions

### 1. Deploying to GitHub Pages
To host your portfolio for free on GitHub Pages:
1. Initialize a Git repository, commit all files, and push them to a public GitHub repository.
2. In your repository on GitHub, navigate to **Settings** > **Pages** (under Code and Automation).
3. Under **Build and deployment**, select **Deploy from a branch** for Source.
4. Select your main branch (e.g. `main` or `master`) and folder `/ (root)`. Click **Save**.
5. Your site will be published at `https://<your-username>.github.io/<your-repo-name>/` within a few minutes.

### 2. Deploying to Vercel
To deploy to Vercel:
1. Sign in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
2. Import your GitHub repository containing the portfolio project.
3. Keep the default settings (Vercel automatically detects it as an HTML/CSS/JS project with no build commands).
4. Click **Deploy**. Your site will be live on a custom `.vercel.app` domain.
