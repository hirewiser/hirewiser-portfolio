# Multi-Template System - Quick Reference

A quick reference guide for understanding the multi-template portfolio system.

---

## 🎯 What Is This?

Cofounds Portfolio is evolving from a single hardcoded template to a **multi-template system** where:
- Users can choose from multiple portfolio designs
- Contributors can easily add new templates
- Code is clean, organized, and maintainable
- Everything is type-safe and well-documented

---

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────┐
│  User visits: username.cofounds.in                      │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Server fetches portfolio data (includes templateId)     │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Template Registry selects template by ID               │
│  (Falls back to default if invalid/missing)             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Selected template renders with user's data             │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Key Directories

| Directory | Purpose | Who Uses It |
|-----------|---------|-------------|
| `/src/templates` | Portfolio templates | Template creators |
| `/src/components/shared` | System core | Core contributors |
| `/src/components/common` | Reusable UI | Everyone |
| `/src/lib/api` | API integration | Backend contributors |
| `/src/types` | Type definitions | Everyone |
| `/docs` | Documentation | Everyone |

---

## 🎨 Creating a Template (Quick Start)

### 1. Setup

```bash
# Create directory
mkdir -p src/templates/template-XX

# Create files
touch src/templates/template-XX/index.tsx
touch src/templates/template-XX/config.ts
touch src/templates/template-XX/README.md
```

### 2. Config (`config.ts`)

```typescript
export const templateXXConfig = {
  id: 'template-XX',
  name: 'My Template',
  description: 'A cool portfolio template',
  thumbnail: '/templates/template-XX-preview.png',
  author: 'Your Name',
  version: '1.0.0',
  tags: ['minimal', 'modern'],
  features: ['Responsive', 'Dark mode', 'Animated'],
};
```

### 3. Component (`index.tsx`)

```typescript
'use client';

import { TemplateProps } from '@/types/template';
import { templateXXConfig } from './config';

export default function TemplateXX({ portfolioData }: TemplateProps) {
  return (
    <main>
      <h1>Hi, I'm {portfolioData.name}</h1>
      <p>{portfolioData.description}</p>
      {/* Your design here */}
    </main>
  );
}

export { templateXXConfig as config };
```

### 4. Register (`templates/index.ts`)

```typescript
import TemplateXX from './template-XX';

export const TEMPLATES = {
  // ... existing templates
  'template-XX': {
    id: 'template-XX',
    component: TemplateXX,
    config: TemplateXX.config,
  },
};
```

### 5. Document (`README.md`)

```markdown
# Template XX - My Template

## Features
- Feature 1
- Feature 2

## Preview
![Preview](preview.png)

## Author
Your Name
```

---

## 🔧 Common Tasks

### Add a New Section to Template

```typescript
// templates/template-01/sections/NewSection.tsx
export default function NewSection({ data }) {
  return (
    <section id="new-section">
      {/* Section content */}
    </section>
  );
}

// templates/template-01/index.tsx
import NewSection from './sections/NewSection';

export default function Template01({ portfolioData }) {
  return (
    <main>
      {/* Other sections */}
      <NewSection data={portfolioData} />
    </main>
  );
}
```

### Use Shared Components

```typescript
import { ProjectCard } from '@/components/common/ProjectCard';
import { AnimationWrapper } from '@/components/common/AnimationWrapper';

function Projects({ projects }) {
  return (
    <div>
      {projects.map((project, index) => (
        <AnimationWrapper key={project.id} delay={index * 0.1}>
          <ProjectCard project={project} />
        </AnimationWrapper>
      ))}
    </div>
  );
}
```

### Handle Missing Data

```typescript
// ✅ Always check before rendering
function Skills({ data }) {
  if (!data.skills || data.skills.length === 0) {
    return null; // Don't render empty section
  }
  
  return (
    <section>
      {data.skills.map(skill => (
        <Badge key={skill}>{skill}</Badge>
      ))}
    </section>
  );
}
```

### Support Dark Mode

```typescript
// Use semantic color tokens
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// These automatically switch between light/dark
```

---

## 📊 Available Data

### PortfolioData Structure

```typescript
{
  // Personal
  username: string;
  name: string;
  initials: string;
  avatarUrl: string;
  description: string;
  summary: string;
  
  // Professional
  work: Array<{
    company: string;
    title: string;
    description: string;
    start: string;
    end: string | null;
    logoUrl: string;
    // ...
  }>;
  
  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string;
    logoUrl: string;
    // ...
  }>;
  
  skills: string[];
  
  // Projects
  projects: Array<{
    title: string;
    description: string;
    dates: string;
    technologies: string[];
    image: string;
    links: Array<{
      type: string;
      href: string;
    }>;
    // ...
  }>;
  
  // Achievements
  hackathons: Array<{
    title: string;
    description: string;
    dates: string;
    image: string;
    // ...
  }>;
  
  // Contact
  contact: {
    email?: string;
    social: Record<string, {
      name: string;
      url: string;
    }>;
  };
}
```

---

## 🎨 Shared Components Reference

### ProjectCard

```typescript
<ProjectCard
  project={project}
  variant="default" // or "compact", "detailed"
  className="custom-class"
/>
```

### ResumeCard

```typescript
<ResumeCard
  title="Company Name"
  subtitle="Job Title"
  description="What I did"
  period="2020 - 2023"
  logoUrl="/logo.png"
  href="https://company.com"
/>
```

### HackathonCard

```typescript
<HackathonCard
  title="Certificate Name"
  description="What I learned"
  dates="2023"
  image="/cert.png"
  links={[{ type: 'View', href: '/cert.pdf' }]}
/>
```

### AnimationWrapper

```typescript
<AnimationWrapper delay={0.2}>
  <YourComponent />
</AnimationWrapper>
```

### MarkdownRenderer

```typescript
<MarkdownRenderer content={portfolioData.summary} />
```

---

## 🎯 Design Principles

### 1. Modularity
- Each template is self-contained
- Sections are separate components
- Easy to add/remove features

### 2. Reusability
- Use shared components when possible
- Extract common patterns
- Don't duplicate code

### 3. Type Safety
- Everything is typed
- No `any` types
- Compile-time error checking

### 4. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

### 5. Performance
- Lazy loading
- Optimized images
- Minimal JavaScript
- Smooth animations

### 6. Responsive
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Test all breakpoints

### 7. Theme Support
- Light mode
- Dark mode
- Use semantic tokens
- Smooth transitions

---

## 🐛 Common Issues & Solutions

### Issue: Template not rendering

```typescript
// ❌ Problem: Not registered
// Solution: Add to templates/index.ts

export const TEMPLATES = {
  'template-XX': {
    id: 'template-XX',
    component: TemplateXX,
    config: TemplateXX.config,
  },
};
```

### Issue: Data is undefined

```typescript
// ❌ Problem: Not checking for optional data
// Solution: Always check before using

if (!data.projects || data.projects.length === 0) {
  return null;
}
```

### Issue: Styles not working

```typescript
// ❌ Problem: Using hardcoded colors
<div style={{ color: '#000' }}>Text</div>

// ✅ Solution: Use Tailwind tokens
<div className="text-foreground">Text</div>
```

### Issue: Not responsive

```typescript
// ❌ Problem: No responsive classes
<div className="grid-cols-3">

// ✅ Solution: Use breakpoints
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## 📚 Learning Path

### Beginner (Week 1)
1. ✅ Read ARCHITECTURE.md
2. ✅ Understand folder structure
3. ✅ Study existing templates
4. ✅ Modify a template section
5. ✅ Test responsive design

### Intermediate (Week 2)
1. ✅ Create a simple template
2. ✅ Use shared components
3. ✅ Handle missing data
4. ✅ Add animations
5. ✅ Submit for review

### Advanced (Week 3+)
1. ✅ Create complex template
2. ✅ Add custom components
3. ✅ Optimize performance
4. ✅ Write documentation
5. ✅ Help other contributors

---

## 🔗 Quick Links

### Documentation
- [Full Implementation Plan](../tasks.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Template Creation Guide](./TEMPLATE_CREATION.md)
- [Folder Structure](./FOLDER_STRUCTURE.md)
- [Contributing Guide](../CONTRIBUTING.md)

### Code
- [Template Registry](../src/templates/index.ts)
- [Template-01 (Reference)](../src/templates/template-01/)
- [Shared Components](../src/components/shared/)
- [Common Components](../src/components/common/)
- [Type Definitions](../src/types/)

### External
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## ✅ Checklist Templates

### Template Submission Checklist

```markdown
- [ ] Created template directory
- [ ] Added index.tsx
- [ ] Added config.ts
- [ ] Added README.md
- [ ] All sections implemented
- [ ] Handles missing data
- [ ] Responsive design
- [ ] Light/dark theme support
- [ ] Preview screenshot
- [ ] Registered in templates/index.ts
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Tested on Chrome/Firefox/Safari
- [ ] Documentation complete
```

### Code Review Checklist

```markdown
- [ ] Code follows style guide
- [ ] Types are correct
- [ ] No `any` types
- [ ] Comments explain complex logic
- [ ] Error handling present
- [ ] Performance optimized
- [ ] Accessibility considered
- [ ] Responsive tested
- [ ] Documentation updated
```

---

## 🎓 FAQs

### Q: Do I need to understand the whole codebase?
**A:** No! Just understand the template system. Each template is independent.

### Q: Can I modify shared components?
**A:** Yes, but be careful. Changes affect all templates. Discuss first.

### Q: How do I test my template locally?
**A:** Run `pnpm dev` and modify the API response to include your template ID.

### Q: What if I want a feature that doesn't exist?
**A:** Open a discussion! We can add it to shared components.

### Q: Can I use external libraries?
**A:** Prefer built-in. If needed, discuss first to avoid bloating bundle.

### Q: How do I handle animations?
**A:** Use `AnimationWrapper` or Framer Motion. Keep them smooth (60fps).

### Q: What about SEO?
**A:** Server components handle this. Focus on semantic HTML.

### Q: Can I see examples?
**A:** Yes! Check `templates/template-01/` for a complete reference.

---

## 💡 Pro Tips

### Tip 1: Start Small
Don't try to build everything at once. Start with:
1. Hero section
2. About section
3. One content section
Then expand from there.

### Tip 2: Copy & Adapt
Look at existing templates and adapt patterns. Don't reinvent the wheel.

### Tip 3: Use Shared Components
Always check `components/common/` before creating new components.

### Tip 4: Test Early, Test Often
Test on different screen sizes throughout development, not just at the end.

### Tip 5: Documentation Matters
Good docs help others understand and contribute to your template.

### Tip 6: Ask Questions
Stuck? Open a discussion. The community is here to help!

---

## 🚀 Getting Started Right Now

```bash
# 1. Clone and setup
git clone https://github.com/devasaya2003/cofounds-portfolio.git
cd cofounds-portfolio
pnpm install

# 2. Run dev server
pnpm dev

# 3. Open in browser
# http://localhost:3000

# 4. Study existing template
# Open src/templates/template-01/

# 5. Make a small change
# Modify template-01/sections/Hero.tsx

# 6. See your changes
# Refresh browser

# 7. Create new template (when ready)
mkdir -p src/templates/template-04
# Follow template creation guide

# 8. Submit PR
git checkout -b feat/template-04
git add .
git commit -m "feat(templates): add template-04"
git push origin feat/template-04
# Open PR on GitHub
```

---

## 📈 Project Status

### Phase Status
- ✅ Planning Complete
- ⏳ Implementation In Progress
- ⏳ Template-01 Conversion
- ⏳ New Templates
- ⏳ Documentation

### Current Priority
1. Refactor types and utilities
2. Build template system core
3. Convert current design to Template-01

### Get Involved
- Star the repo ⭐
- Join discussions 💬
- Submit PRs 🔥
- Help others 🤝

---

**Ready to contribute? Let's build something amazing! 🎨✨**

For detailed information, see:
- [tasks.md](../tasks.md) - Complete implementation plan
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [TEMPLATE_CREATION.md](./TEMPLATE_CREATION.md) - Template guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - How to contribute
