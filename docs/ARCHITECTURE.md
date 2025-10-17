# Architecture Overview

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js App Router                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  app/page.tsx (Server Component)                         │  │
│  │  - Extract subdomain from headers                        │  │
│  │  - Fetch portfolio data from API                         │  │
│  │  - Transform data                                         │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└─────────────────────────┼──────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Client Components Layer                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  PortfolioWrapper (Client)                               │  │
│  │  - Hydration handling                                    │  │
│  │  - Error boundaries                                      │  │
│  │  └─────┬──────────────────────────────────────────────┘  │  │
│  │        │                                                  │  │
│  │        ▼                                                  │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │  TemplateRenderer (Client)                      │    │  │
│  │  │  - Select template by ID                        │    │  │
│  │  │  - Fallback to default                          │    │  │
│  │  │  └─────┬───────────────────────────────────────┘    │  │
│  │  │        │                                              │  │
│  │  │        ▼                                              │  │
│  │  │  ┌─────────────────────────────────────────┐        │  │
│  │  │  │  Template Component (e.g., Template-01) │        │  │
│  │  │  │  - Compose sections                     │        │  │
│  │  │  │  - Handle layout                        │        │  │
│  │  │  │  - Apply animations                     │        │  │
│  │  │  └─────┬───────────────────────────────────┘        │  │
│  │  │        │                                              │  │
│  │  │        ▼                                              │  │
│  │  │  ┌─────────────────────────────────────────┐        │  │
│  │  │  │  Template Sections                      │        │  │
│  │  │  │  - Hero, About, Projects, etc.          │        │  │
│  │  │  │  - Use shared components                │        │  │
│  │  │  └──────────────────────────────────────────┘       │  │
│  │  │                                                       │  │
│  └──┴───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Component Layer                        │
│  - ProjectCard, ResumeCard, HackathonCard                       │
│  - UI Components (shadcn/ui)                                    │
│  - Animation Wrappers (BlurFade, etc.)                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Module Structure

### Data Flow Architecture

```
┌──────────────┐
│   API Call   │
│ (Subdomain)  │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  fetch-portfolio.ts  │
│  - Fetch from API    │
│  - Handle errors     │
│  - Return raw data   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  transform-data.ts   │
│  - Normalize data    │
│  - Extract templateId│
│  - Type conversion   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│   PortfolioData      │
│   + templateId       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Template Registry   │
│  - Match templateId  │
│  - Return component  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Template Renderer   │
│  - Instantiate       │
│  - Pass props        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Rendered Portfolio  │
└──────────────────────┘
```

---

## 🗂️ Directory Structure Explanation

### `/src/app`
**Purpose:** Next.js App Router pages and layouts  
**Type:** Server Components  
**Responsibility:** Data fetching, routing, initial rendering

```typescript
// app/page.tsx - Entry point
export default async function Page() {
  // 1. Extract subdomain
  // 2. Fetch portfolio data
  // 3. Pass to client wrapper
}
```

---

### `/src/templates`
**Purpose:** Portfolio template definitions  
**Type:** Client Components (mostly)  
**Structure:**

```
templates/
├── index.ts                    # Template registry and selector
├── template-01/                # Classic template
│   ├── index.tsx              # Main template component
│   ├── config.ts              # Template metadata
│   ├── README.md              # Template documentation
│   └── sections/              # Template-specific sections
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       └── ...
└── template-{id}/             # Other templates follow same pattern
```

**Key Principles:**
- Each template is self-contained
- Templates don't import from other templates
- Shared logic goes in `/components/common`
- Configuration is declarative

---

### `/src/components`

#### `/components/shared` - Core System Components
**Purpose:** Template-agnostic system functionality

```typescript
// TemplateRenderer.tsx
export function TemplateRenderer({ portfolioData, templateId }) {
  const template = getTemplate(templateId);
  return <template.component portfolioData={portfolioData} />;
}

// PortfolioWrapper.tsx
export function PortfolioWrapper({ portfolioData, templateId }) {
  return (
    <ErrorBoundary>
      <PortfolioDataProvider data={portfolioData}>
        <HydrationWrapper>
          <TemplateRenderer templateId={templateId} />
        </HydrationWrapper>
      </PortfolioDataProvider>
    </ErrorBoundary>
  );
}
```

#### `/components/common` - Reusable Components
**Purpose:** Components that can be used across templates

Examples:
- `ProjectCard` - Reusable but customizable per template
- `ResumeCard` - Standard layout for work experience
- `AnimationWrapper` - Wrapper for animation libraries
- `MarkdownRenderer` - Standard markdown rendering

**Guidelines:**
- Accept styling props for customization
- Keep logic minimal
- Focus on presentation
- Document prop interfaces

#### `/components/ui` - Base UI Components
**Purpose:** shadcn/ui components (do not modify directly)

---

### `/src/lib`

#### `/lib/api` - API Integration
```typescript
// fetch-portfolio.ts
export async function fetchPortfolio(username: string): Promise<ApiResponse> {
  // Fetch from Cofounds API
  // Handle errors
  // Return typed response
}

// transform-data.ts
export function transformUserData(raw: UserProfile): PortfolioData {
  // Normalize API response
  // Extract templateId
  // Transform to UI format
}
```

#### `/lib/utils` - Utility Functions
```typescript
// url.ts
export function extractUsername(headers: Headers): UsernameResult {
  // Parse subdomain
  // Validate
  // Return username + validation status
}

// cn.ts
export function cn(...inputs: ClassValue[]) {
  // Tailwind class merging utility
}
```

---

### `/src/types`

#### Type Organization
```typescript
// api.ts - Raw API response types
export interface UserProfile {
  id: string;
  userName: string;
  firstName: string;
  // ... matches API structure exactly
}

// portfolio.ts - Transformed UI types
export interface PortfolioData {
  username: string;
  name: string;
  templateId: string;
  // ... optimized for UI consumption
}

// template.ts - Template system types
export interface Template {
  id: string;
  component: React.ComponentType<TemplateProps>;
  config: TemplateConfig;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  // ... template metadata
}
```

---

## 🔄 Component Interaction Patterns

### Pattern 1: Server → Client Data Flow
```typescript
// Server Component (app/page.tsx)
async function ServerPage() {
  const data = await fetchPortfolio(username); // Server-side
  return <ClientWrapper data={data} />;        // Serialize & pass
}

// Client Component
'use client';
function ClientWrapper({ data }: { data: PortfolioData }) {
  // Client-side hydration and interactivity
}
```

### Pattern 2: Context-Based Data Sharing
```typescript
// Provider (top-level)
<PortfolioDataProvider data={portfolioData}>
  <TemplateRenderer />
</PortfolioDataProvider>

// Consumer (anywhere in tree)
function SomeComponent() {
  const { portfolioData } = usePortfolioData();
  // Access data without prop drilling
}
```

### Pattern 3: Template Section Composition
```typescript
// Template main component
export function Template01({ portfolioData }: TemplateProps) {
  return (
    <main>
      <Hero data={portfolioData} />
      <About data={portfolioData} />
      <Projects data={portfolioData.projects} />
      {/* Sections composed together */}
    </main>
  );
}

// Individual section
function Projects({ data }: { data: Project[] }) {
  return (
    <section id="projects">
      {data.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
```

---

## 🎨 Template System Design

### Template Lifecycle

```
1. Request Received
   ↓
2. Extract Subdomain → Get Username
   ↓
3. Fetch Portfolio Data (includes templateId)
   ↓
4. Transform API Data → PortfolioData
   ↓
5. Template Registry Lookup
   ├─ templateId found → Load specific template
   └─ templateId missing/invalid → Load default template
   ↓
6. Render Template Component
   ↓
7. Template Composes Sections
   ↓
8. Sections Use Shared Components
   ↓
9. Final Render to Browser
```

### Template Registration

```typescript
// templates/index.ts
import Template01 from './template-01';
import Template02 from './template-02';

export const TEMPLATES: Record<string, Template> = {
  'template-01': {
    id: 'template-01',
    component: Template01,
    config: template01Config,
  },
  'template-02': {
    id: 'template-02',
    component: Template02,
    config: template02Config,
  },
};

export function getTemplate(id?: string): Template {
  return TEMPLATES[id || 'template-01'] || TEMPLATES['template-01'];
}
```

### Template Interface Contract

Every template must:
1. Export a default React component
2. Accept `TemplateProps` interface
3. Include a `config.ts` with metadata
4. Provide a `README.md` with documentation
5. Be responsive (mobile, tablet, desktop)
6. Support light/dark themes
7. Handle missing/optional data gracefully

---

## 🧩 Shared Component Guidelines

### When to Create a Shared Component

**Create in `/components/common`** when:
- Used by 2+ templates
- Has template-specific variations
- Contains business logic

**Create in `/components/ui`** when:
- Pure UI component (no business logic)
- Part of design system
- Comes from shadcn/ui

**Keep in template** when:
- Unique to one template
- Tightly coupled to template layout
- Unlikely to be reused

### Shared Component Pattern

```typescript
// components/common/ProjectCard.tsx
interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  onInteraction?: () => void;
}

export function ProjectCard({ 
  project, 
  variant = 'default',
  className,
  onInteraction 
}: ProjectCardProps) {
  // Flexible, reusable implementation
  // Accept styling overrides
  // Support multiple variants
}
```

---

## 🔒 Error Handling Strategy

### Error Boundary Hierarchy

```
App Root
  └─ Global Error Boundary (Unrecoverable errors)
       └─ Portfolio Wrapper (Portfolio-level errors)
            └─ Template Error Boundary (Template-specific errors)
                 └─ Section Error Boundaries (Section-level errors)
```

### Error Types & Handling

```typescript
// 1. API Errors
try {
  const data = await fetchPortfolio(username);
} catch (error) {
  // Show error portfolio with helpful message
  return <ErrorPortfolio username={username} />;
}

// 2. Template Not Found
const template = getTemplate(templateId);
// Always returns valid template (fallback to default)

// 3. Data Validation Errors
function Section({ data }) {
  if (!data || data.length === 0) {
    return null; // Gracefully hide section
  }
  // ... render section
}

// 4. Component Errors
<ErrorBoundary fallback={<SectionError />}>
  <Section data={data} />
</ErrorBoundary>
```

---

## 🎯 Performance Considerations

### Code Splitting
- Each template is a separate chunk
- Lazy load templates on demand
- Share common components efficiently

### Data Fetching
- Server-side fetch (no client waterfalls)
- Cache with `next: { revalidate: 60 }`
- Minimize API calls

### Rendering
- Server Components for static parts
- Client Components only when needed
- Optimize animations for performance

### Bundle Size
- Tree-shaking of unused templates
- Minimize client JavaScript
- Use dynamic imports for heavy components

---

## 🧪 Testing Strategy

### Unit Tests
- Utility functions (`transform-data`, `extractUsername`)
- Individual components
- Template registry logic

### Integration Tests
- Data flow from API to UI
- Template switching
- Error handling

### E2E Tests
- Full user journey
- Template rendering
- Responsive behavior

---

## 📊 Monitoring & Analytics

### Key Metrics
- Template usage distribution
- Load times per template
- Error rates
- User interactions

### Implementation
```typescript
// Track template usage
posthog.capture('template_loaded', {
  templateId: template.id,
  username: portfolioData.username,
});

// Track errors
posthog.capture('template_error', {
  templateId,
  error: error.message,
});
```

---

## 🔮 Future Enhancements

### Phase 2 Features
- Template preview/demo mode
- Template customization UI
- Template marketplace
- Real-time template switching
- Template analytics dashboard

### Advanced Features
- A/B testing templates
- User-specific template customization
- Template themes/color schemes
- Template builder (drag-and-drop)
- Template versioning

---

## 📚 Additional Resources

### Internal Docs
- [Template Creation Guide](./TEMPLATE_CREATION.md)
- [API Documentation](./API.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

### External References
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/react/use-server)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
