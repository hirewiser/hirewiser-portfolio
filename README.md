# 🛠️ Contributing Guide

Thank you for contributing!
This guide explains how to run the project, add templates, follow conventions, and maintain code quality.

---

## 📁 Project Structure

The main structure of the repository:

```
src/
│── assets/
│── components/
│── context/
│── lib/
│── pages/
│── templates/
│   └── template-xx/
│       ├── components/
│       ├── experience-page.tsx
│       ├── experiences-page.tsx
│       ├── project-page.tsx
│       ├── projects-page.tsx
│       ├── root-page.tsx
│── types/
│── utils/
│── App.tsx
│── index.css
│── main.tsx
```

---

## 🧩 Adding a New Template

When contributing a new template:

1. Navigate to:
   `src/templates/`

2. Create a new folder — **you can choose any name**, e.g. `template-04`.

3. Inside that folder, create a `components/` directory.

4. Your template **must include these exact filenames**:

   ```
   root-page.tsx
   projects-page.tsx
   project-page.tsx
   experiences-page.tsx
   experience-page.tsx
   ```

5. You can structure your internal components any way you like.

6. As long as these filenames exist, the template will integrate automatically with the routing system.

---

## 🚀 Getting Started (Development)

### 1. Install dependencies

This project uses **pnpm**:

```sh
pnpm install
```

### 2. Add environment variables

Create a `.env` file at the project root with the following variable:

```
VITE_COFOUNDS_API_URL="https://www.buildarclabs.in/api/v3/portfolio"
```

### 3. Remove PostHog (Dev Only)

When working locally, you should **remove or comment out all PostHog-related code** inside `main.tsx`.

Comment out this block:

```ts
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
});
```

You should also remove:

```tsx
<PostHogProvider client={posthog}>
  ...
</PostHogProvider>
```

This avoids analytics being triggered during development.

### 4. Run the dev server

```sh
pnpm dev
```

---

## 🧠 App Overview

### `main.tsx`

* Sets up:

  * `React.StrictMode`
  * `QueryClientProvider` (React Query)
  * `BrowserRouter` (Routing)
  * `PortfolioProvider` (Portfolio data state)
* PostHog is enabled **only for production builds**.

### `App.tsx`

* Loads all portfolio data from context.
* Sends a PostHog event when the portfolio loads.
* Shows a loading spinner during fetch.
* Wraps all routes with:

  * `SmoothScrollProvider`
  * `AnimatedRoutes`
* Declares all app routes:

  * `/`
  * `/projects`
  * `/projects/:id`
  * `/experiences`
  * `/experiences/:id`

---

## ✨ Code Guidelines

### ✔️ Do

* Use **TypeScript** and reference types from `/types`.
* Keep components small and well-structured.
* Use React Query instead of manual `fetch` inside components.
* Understand the folder boundaries (templates must stay inside `src/templates/`).

### ❌ Avoid

* Hardcoding API URLs.
* Sending PostHog events in development.
* Creating template files outside their folder.
* Ignoring TypeScript errors.

---

## 🧪 Testing Your Template

Before submitting a PR:

1. Set up `.env`

2. Run with:

   ```sh
   pnpm dev
   ```

3. Verify all required routes work:

   * `/`
   * `/projects`
   * `/projects/:id`
   * `/experiences`
   * `/experiences/:id`

4. Ensure the layout and components do not break global styles or other templates.

5. Keep your folder and filenames correct.

---

## 📦 Submitting a Pull Request

When opening a PR:

* Describe your template/feature clearly.
* Attach screenshots for UI changes.
* Ensure the code is clean.
* Follow the naming conventions.
* Confirm the project builds with:

  ```sh
  pnpm build
  ```
