# Template Creation Guide

A comprehensive guide for creating new portfolio templates for the Cofounds Portfolio platform.

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Template Structure](#template-structure)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Component Guidelines](#component-guidelines)
6. [Styling & Theming](#styling--theming)
7. [Data Handling](#data-handling)
8. [Testing Your Template](#testing-your-template)
9. [Best Practices](#best-practices)
10. [Submission Checklist](#submission-checklist)

---

## 🎯 Overview

### What is a Template?

A template is a complete portfolio layout that:
- Displays user data in a unique visual style
- Follows a consistent structure and API
- Can be selected by users for their portfolio
- Is responsive and accessible

### Template Types

1. **Minimal** - Clean, text-focused, fast loading
2. **Professional** - Traditional, business-oriented
3. **Creative** - Bold, interactive, artistic
4. **Modern** - Contemporary, trendy, animated
5. **Custom** - Unique combination of styles

---

## ✅ Prerequisites

### Required Knowledge
- React & TypeScript
- Next.js App Router
- Tailwind CSS
- Responsive design principles

### Tools & Setup
```bash
# Clone the repository
git clone https://github.com/devasaya2003/cofounds-portfolio.git
cd cofounds-portfolio

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

---

## 📁 Template Structure

### Standard Template Directory

```
src/templates/template-{id}/
├── index.tsx                 # Main template component (required)
├── config.ts                 # Template configuration (required)
├── README.md                 # Template documentation (required)
├── sections/                 # Section components (optional)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Certificates.tsx
│   └── Contact.tsx
├── components/              # Template-specific components (optional)
│   ├── CustomCard.tsx
│   └── SpecialButton.tsx
└── utils/                   # Template-specific utilities (optional)
    └── helpers.ts
```

### File Purposes

| File | Purpose | Required |
|------|---------|----------|
| `index.tsx` | Main template component | ✅ Yes |
| `config.ts` | Metadata and configuration | ✅ Yes |
| `README.md` | Documentation | ✅ Yes |
| `sections/` | Reusable section components | ⚠️ Recommended |
| `components/` | Template-specific components | ❌ Optional |
| `utils/` | Helper functions | ❌ Optional |

---

## 🚀 Step-by-Step Guide

### Step 1: Create Template Directory

```bash
# Create template directory
mkdir -p src/templates/template-04

# Navigate to directory
cd src/templates/template-04
```

### Step 2: Create Configuration File

**File:** `src/templates/template-04/config.ts`

```typescript
import { TemplateConfig } from '@/types/template';

export const template04Config: TemplateConfig = {
  id: 'template-04',
  name: 'Your Template Name',
  description: 'A brief description of what makes your template unique',
  thumbnail: '/templates/template-04-preview.png',
  author: 'Your Name',
  version: '1.0.0',
  tags: ['minimal', 'modern', 'animated'], // Choose relevant tags
  features: [
    'Unique feature 1',
    'Unique feature 2',
    'Unique feature 3',
  ],
};
```

### Step 3: Create Main Template Component

**File:** `src/templates/template-04/index.tsx`

```typescript
'use client';

import { TemplateProps } from '@/types/template';
import { template04Config } from './config';

// Import sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
// ... other sections

export default function Template04({ portfolioData, config }: TemplateProps) {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero data={portfolioData} />
      
      {/* About Section */}
      <About data={portfolioData} />
      
      {/* Projects Section - Conditional rendering */}
      {portfolioData.projects && portfolioData.projects.length > 0 && (
        <Projects data={portfolioData.projects} />
      )}
      
      {/* Add more sections as needed */}
    </main>
  );
}

// Export config for registration
export { template04Config as config };
```

### Step 4: Create Section Components

**File:** `src/templates/template-04/sections/Hero.tsx`

```typescript
'use client';

import { PortfolioData } from '@/types/portfolio';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface HeroProps {
  data: PortfolioData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section id="hero" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <Avatar className="w-32 h-32">
            <AvatarImage src={data.avatarUrl} alt={data.name} />
            <AvatarFallback>{data.initials}</AvatarFallback>
          </Avatar>
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm {data.name.split(' ')[0]}
            </h1>
            <p className="text-xl text-muted-foreground">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Step 5: Register Template

**File:** `src/templates/index.ts`

```typescript
import { Template } from '@/types/template';
import Template01 from './template-01';
import Template02 from './template-02';
import Template03 from './template-03';
import Template04 from './template-04'; // Import your template

export const TEMPLATES: Record<string, Template> = {
  'template-01': {
    id: 'template-01',
    component: Template01,
    config: Template01.config,
  },
  'template-02': {
    id: 'template-02',
    component: Template02,
    config: Template02.config,
  },
  'template-03': {
    id: 'template-03',
    component: Template03,
    config: Template03.config,
  },
  'template-04': { // Register your template
    id: 'template-04',
    component: Template04,
    config: Template04.config,
  },
};

export const DEFAULT_TEMPLATE_ID = 'template-01';

export function getTemplate(templateId?: string): Template {
  const id = templateId || DEFAULT_TEMPLATE_ID;
  return TEMPLATES[id] || TEMPLATES[DEFAULT_TEMPLATE_ID];
}
```

### Step 6: Create Documentation

**File:** `src/templates/template-04/README.md`

```markdown
# Template 04 - [Your Template Name]

## Overview
Brief description of your template, its design philosophy, and intended use case.

## Features
- Feature 1
- Feature 2
- Feature 3

## Preview
![Template Preview](preview.png)

## Sections Included
- [x] Hero
- [x] About
- [x] Projects
- [x] Experience
- [ ] Skills (optional)
- [ ] Certificates (optional)

## Customization Options
Describe any customization options available.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues
List any known issues or limitations.

## Author
Your Name (@yourusername)

## License
MIT
```

---

## 🎨 Component Guidelines

### Use Shared Components

Always prefer shared components over creating new ones:

```typescript
// ✅ Good - Use shared component
import { ProjectCard } from '@/components/common/ProjectCard';

// ❌ Bad - Create duplicate
function MyCustomProjectCard() { ... }
```

### Common Shared Components

| Component | Path | Use Case |
|-----------|------|----------|
| `ProjectCard` | `@/components/common/ProjectCard` | Display projects |
| `ResumeCard` | `@/components/common/ResumeCard` | Work experience, education |
| `HackathonCard` | `@/components/common/HackathonCard` | Certificates, achievements |
| `AnimationWrapper` | `@/components/common/AnimationWrapper` | Animated elements |
| `MarkdownRenderer` | `@/components/common/MarkdownRenderer` | Render markdown |

### Create Template-Specific Components

When shared components don't fit your needs:

```typescript
// src/templates/template-04/components/SpecialCard.tsx
interface SpecialCardProps {
  title: string;
  description: string;
  variant?: 'default' | 'highlight';
}

export function SpecialCard({ title, description, variant = 'default' }: SpecialCardProps) {
  // Your custom implementation
}
```

---

## 🎨 Styling & Theming

### Use Tailwind CSS

All templates should use Tailwind CSS for styling:

```typescript
// ✅ Good
<div className="bg-background text-foreground p-6 rounded-lg">
  Content
</div>

// ❌ Bad - Inline styles
<div style={{ backgroundColor: '#fff', padding: '24px' }}>
  Content
</div>
```

### Theme Support

Support both light and dark themes:

```typescript
// Use semantic color tokens
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// Available color tokens:
// - background, foreground
// - primary, primary-foreground
// - secondary, secondary-foreground
// - muted, muted-foreground
// - accent, accent-foreground
// - destructive, destructive-foreground
```

### Responsive Design

Use Tailwind's responsive utilities:

```typescript
<div className="
  flex flex-col          // Mobile: vertical stack
  md:flex-row            // Tablet+: horizontal layout
  lg:grid lg:grid-cols-3 // Desktop: 3-column grid
  gap-4 md:gap-6 lg:gap-8
">
  {/* Content */}
</div>
```

### Breakpoints

| Breakpoint | Min Width | Description |
|------------|-----------|-------------|
| `sm` | 640px | Small devices |
| `md` | 768px | Medium devices |
| `lg` | 1024px | Large devices |
| `xl` | 1280px | Extra large |
| `2xl` | 1536px | 2X large |

---

## 📊 Data Handling

### Portfolio Data Structure

```typescript
interface PortfolioData {
  // Personal Info
  username: string;
  name: string;
  initials: string;
  avatarUrl: string;
  description: string;
  summary: string;
  
  // Professional
  work: TransformedWork[];
  education: TransformedEducation[];
  skills: string[];
  
  // Projects & Achievements
  projects: TransformedProject[];
  hackathons: TransformedCertificate[];
  
  // Contact
  contact: {
    email?: string;
    social: Record<string, {
      name: string;
      url: string;
      navbar: boolean;
    }>;
  };
}
```

### Handle Missing Data

Always handle optional/missing data gracefully:

```typescript
// ✅ Good - Graceful handling
export default function Skills({ data }: { data: PortfolioData }) {
  // Don't render if no skills
  if (!data.skills || data.skills.length === 0) {
    return null;
  }
  
  return (
    <section id="skills">
      {data.skills.map(skill => (
        <Badge key={skill}>{skill}</Badge>
      ))}
    </section>
  );
}

// ❌ Bad - Will crash if skills is undefined
export default function Skills({ data }: { data: PortfolioData }) {
  return (
    <section id="skills">
      {data.skills.map(skill => ( // Error if undefined!
        <Badge key={skill}>{skill}</Badge>
      ))}
    </section>
  );
}
```

### Default Values

Provide sensible defaults:

```typescript
function Section({ data, maxItems = 6 }: SectionProps) {
  const items = data?.slice(0, maxItems) ?? [];
  
  return (
    <div>
      {items.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
```

---

## 🧪 Testing Your Template

### Manual Testing Checklist

- [ ] Template renders without errors
- [ ] All sections display correctly
- [ ] Responsive on mobile (375px, 414px)
- [ ] Responsive on tablet (768px, 1024px)
- [ ] Responsive on desktop (1280px, 1920px)
- [ ] Light theme works correctly
- [ ] Dark theme works correctly
- [ ] Handles missing data gracefully
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] Accessibility (keyboard navigation)

### Test with Sample Data

Create a test file with sample data:

```typescript
// src/templates/template-04/__tests__/sample-data.ts
import { PortfolioData } from '@/types/portfolio';

export const sampleData: PortfolioData = {
  username: 'testuser',
  name: 'Test User',
  initials: 'TU',
  avatarUrl: 'https://via.placeholder.com/150',
  description: 'Test description',
  summary: 'Test summary',
  // ... complete sample data
};
```

### Testing Different States

Test with:
1. **Full data** - All fields populated
2. **Minimal data** - Only required fields
3. **Empty arrays** - No projects, no skills, etc.
4. **Long text** - Very long descriptions
5. **Many items** - 50+ projects, skills, etc.

---

## ✨ Best Practices

### 1. Performance

```typescript
// ✅ Use React.memo for expensive components
const ProjectGrid = React.memo(({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid gap-4">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
});

// ✅ Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ✅ Optimize images
<Image 
  src={project.image}
  alt={project.title}
  width={600}
  height={400}
  loading="lazy"
/>
```

### 2. Accessibility

```typescript
// ✅ Use semantic HTML
<main>
  <section id="hero" aria-labelledby="hero-heading">
    <h1 id="hero-heading">Welcome</h1>
  </section>
</main>

// ✅ Add ARIA labels
<button aria-label="Open navigation menu">
  <MenuIcon />
</button>

// ✅ Keyboard navigation
<a href="#projects" className="focus:ring-2 focus:ring-primary">
  View Projects
</a>
```

### 3. Code Organization

```typescript
// ✅ Group related components
templates/
  template-04/
    sections/
      Hero.tsx
      About.tsx
    components/
      CustomCard.tsx
    utils/
      helpers.ts

// ✅ Use clear naming
function ProjectsSection() { ... }    // ✅ Clear
function Proj() { ... }                // ❌ Unclear

// ✅ Extract constants
const ANIMATION_DELAY = 0.04;
const MAX_PROJECTS = 6;
```

### 4. Type Safety

```typescript
// ✅ Define proper interfaces
interface SectionProps {
  data: PortfolioData;
  className?: string;
}

// ✅ Use discriminated unions for variants
type CardVariant = 'default' | 'compact' | 'detailed';

interface CardProps {
  variant: CardVariant;
  // ... other props
}

// ❌ Avoid `any`
function processData(data: any) { ... }  // Bad

// ✅ Use proper types
function processData(data: PortfolioData) { ... }  // Good
```

### 5. Comments & Documentation

```typescript
/**
 * Hero section for Template 04
 * 
 * Displays user's name, avatar, and tagline with a custom
 * background gradient animation.
 * 
 * @param data - Portfolio data containing user info
 */
export default function Hero({ data }: HeroProps) {
  // Initialize animation on mount
  useEffect(() => {
    // Animation logic here
  }, []);
  
  return (
    // Component JSX
  );
}
```

---

## 📋 Submission Checklist

Before submitting your template:

### Code Quality
- [ ] TypeScript - No `any` types
- [ ] ESLint - No errors or warnings
- [ ] Formatting - Run `pnpm format`
- [ ] Comments - Key logic documented
- [ ] No console.log statements

### Functionality
- [ ] All sections render correctly
- [ ] Handles missing data gracefully
- [ ] No runtime errors
- [ ] Animations work smoothly
- [ ] Links function properly

### Design
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Light theme supported
- [ ] Dark theme supported
- [ ] Consistent spacing
- [ ] Professional appearance

### Documentation
- [ ] `config.ts` completed
- [ ] `README.md` created
- [ ] Preview screenshot added
- [ ] Code comments added
- [ ] Features documented

### Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested with sample data
- [ ] Tested with missing data
- [ ] Accessibility tested

### Registration
- [ ] Added to `templates/index.ts`
- [ ] Template ID is unique
- [ ] Config exports correctly
- [ ] No build errors

---

## 🚀 Next Steps

1. **Create Pull Request**
   - Fork the repository
   - Create a feature branch
   - Submit PR with your template

2. **PR Description Template**
   ```markdown
   ## Template Submission: [Template Name]
   
   ### Description
   Brief description of your template
   
   ### Preview
   ![Screenshot](link-to-screenshot)
   
   ### Features
   - Feature 1
   - Feature 2
   
   ### Checklist
   - [x] All sections implemented
   - [x] Responsive design
   - [x] Theme support
   - [x] Documentation complete
   
   ### Testing
   Tested on: Chrome, Firefox, Safari
   ```

3. **Wait for Review**
   - Maintainers will review your submission
   - Address any feedback
   - Once approved, template will be merged

---

## 💡 Tips & Tricks

### Animation Best Practices
```typescript
// Use CSS animations for simple effects
<div className="animate-fade-in">Content</div>

// Use Framer Motion for complex animations
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Layout Techniques
```typescript
// Centering
<div className="flex items-center justify-center min-h-screen">
  Centered content
</div>

// Max-width container
<div className="container mx-auto max-w-4xl px-6">
  Constrained width
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  Grid items
</div>
```

### Performance Optimization
```typescript
// Debounce scroll events
const handleScroll = useMemo(
  () => debounce(() => {
    // Scroll logic
  }, 100),
  []
);

// Virtualize long lists
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## 📞 Getting Help

### Resources
- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

### Community
- GitHub Discussions - Ask questions
- GitHub Issues - Report bugs
- Discord - Real-time help

---

## 📄 License

All templates must be submitted under the MIT License.

---

**Good luck creating your template! We can't wait to see what you build! 🎨✨**
