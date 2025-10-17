# Folder Structure Comparison

## 📊 Current vs. Proposed Structure

### CURRENT STRUCTURE (Single Template)

```
cofounds-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                           ❌ Fetches data + hardcoded template
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── types/
│   │       └── portfolio.ts                    ❌ Just re-exports
│   │
│   ├── components/
│   │   ├── portfolio-content.tsx              ❌ Monolithic template component
│   │   ├── portfolio-content-wrapper.tsx      ⚠️ Hydration only
│   │   ├── portfolio-data-provider.tsx        ⚠️ Contains types + context
│   │   ├── portfolio-components.tsx           ❌ Error components
│   │   ├── hackathon-card.tsx                 ⚠️ Mixed with other components
│   │   ├── project-card.tsx                   ⚠️ Mixed with other components
│   │   ├── resume-card.tsx                    ⚠️ Mixed with other components
│   │   ├── responsive-navbar.tsx              ⚠️ Mixed with other components
│   │   ├── theme-provider.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── icons.tsx
│   │   ├── portfolio-icons.tsx
│   │   ├── mdx.tsx
│   │   ├── magicui/                           ✅ UI library
│   │   └── ui/                                ✅ Base components
│   │
│   ├── lib/
│   │   ├── portfolio-utils.ts                 ❌ Mixed concerns (fetch + transform + extract)
│   │   └── utils.ts                           ✅ General utilities
│   │
│   ├── data/
│   │   ├── resume.tsx                         ❌ Sample data (should be in docs/examples)
│   │   └── blog.ts
│   │
│   └── hooks/
│       ├── use-hydrated.ts
│       ├── use-isomorphic-layout-effect.ts
│       └── use-portfolio-client.ts
│
├── public/
└── content/

PROBLEMS:
❌ No template system - hardcoded layout
❌ No clear separation of concerns
❌ Difficult to add new templates
❌ Types scattered across files
❌ Utils file does too many things
❌ Components not organized by purpose
❌ Hard for contributors to understand
```

---

### PROPOSED STRUCTURE (Multi-Template)

```
cofounds-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                           ✅ Clean: fetch → pass to wrapper
│   │   ├── layout.tsx                         ✅ No changes needed
│   │   ├── globals.css
│   │   └── types/
│   │       └── portfolio.ts                   ⚠️ Deprecated - use src/types/
│   │
│   ├── templates/                             ✨ NEW: Template system
│   │   ├── index.ts                           ✨ Template registry
│   │   │
│   │   ├── template-01/                       ✨ Classic template (current design)
│   │   │   ├── index.tsx                      ✅ Main component
│   │   │   ├── config.ts                      ✅ Metadata
│   │   │   ├── README.md                      ✅ Documentation
│   │   │   ├── sections/                      ✅ Modular sections
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Experience.tsx
│   │   │   │   ├── Education.tsx
│   │   │   │   ├── Skills.tsx
│   │   │   │   ├── Projects.tsx
│   │   │   │   ├── Certificates.tsx
│   │   │   │   └── Contact.tsx
│   │   │   └── components/                    ⚠️ Template-specific (if needed)
│   │   │
│   │   ├── template-02/                       ✨ Minimal template
│   │   │   ├── index.tsx
│   │   │   ├── config.ts
│   │   │   ├── README.md
│   │   │   └── sections/
│   │   │       ├── Hero.tsx
│   │   │       ├── About.tsx
│   │   │       ├── Projects.tsx
│   │   │       └── Contact.tsx
│   │   │
│   │   └── template-03/                       ✨ Modern template
│   │       ├── index.tsx
│   │       ├── config.ts
│   │       ├── README.md
│   │       ├── sections/
│   │       └── components/
│   │
│   ├── components/
│   │   ├── shared/                            ✨ NEW: System components
│   │   │   ├── TemplateRenderer.tsx           ✅ Selects & renders templates
│   │   │   ├── PortfolioWrapper.tsx           ✅ Hydration + error handling
│   │   │   ├── PortfolioDataProvider.tsx      ✅ Context provider (moved)
│   │   │   ├── ErrorBoundary.tsx              ✅ Error boundaries
│   │   │   ├── ErrorPages.tsx                 ✅ Error & no subdomain pages
│   │   │   └── ThemeProvider.tsx              ✅ Theme context
│   │   │
│   │   ├── common/                            ✨ NEW: Reusable components
│   │   │   ├── ProjectCard.tsx                ✅ Moved here
│   │   │   ├── ResumeCard.tsx                 ✅ Moved here
│   │   │   ├── HackathonCard.tsx              ✅ Moved here
│   │   │   ├── ResponsiveNavbar.tsx           ✅ Moved here
│   │   │   ├── AnimationWrapper.tsx           ✅ NEW: Wraps BlurFade
│   │   │   ├── MarkdownRenderer.tsx           ✅ NEW: Wraps react-markdown
│   │   │   ├── ModeToggle.tsx                 ✅ Moved here
│   │   │   └── Icons.tsx                      ✅ Consolidated icons
│   │   │
│   │   ├── ui/                                ✅ shadcn components (no change)
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   │
│   │   └── magicui/                           ✅ Magic UI library (no change)
│   │       ├── blur-fade.tsx
│   │       ├── blur-fade-text.tsx
│   │       └── dock.tsx
│   │
│   ├── lib/
│   │   ├── api/                               ✨ NEW: API logic
│   │   │   ├── fetch-portfolio.ts             ✅ Extracted from utils
│   │   │   └── transform-data.ts              ✅ Extracted from utils
│   │   │
│   │   ├── utils/                             ✨ NEW: Utility functions
│   │   │   ├── cn.ts                          ✅ Class name utility
│   │   │   └── url.ts                         ✅ Extracted from portfolio-utils
│   │   │
│   │   └── constants/                         ✨ NEW: Constants
│   │       ├── templates.ts                   ✅ Template metadata
│   │       └── config.ts                      ✅ App config
│   │
│   ├── types/                                 ✨ NEW: Centralized types
│   │   ├── api.ts                             ✅ Raw API types
│   │   ├── portfolio.ts                       ✅ Transformed types
│   │   └── template.ts                        ✅ Template system types
│   │
│   ├── hooks/                                 ✅ Custom hooks
│   │   ├── use-portfolio-data.ts              ✅ Portfolio context hook
│   │   ├── use-hydrated.ts                    ✅ Hydration state
│   │   ├── use-template.ts                    ✨ NEW: Template logic
│   │   └── use-isomorphic-layout-effect.ts    ✅ Layout effect
│   │
│   └── data/                                  ⚠️ Deprecated
│       ├── resume.tsx                         ⚠️ Move to docs/examples/
│       └── blog.ts                            ⚠️ Move to docs/examples/
│
├── docs/                                      ✨ NEW: Documentation
│   ├── ARCHITECTURE.md                        ✅ System architecture
│   ├── TEMPLATE_CREATION.md                   ✅ Template guide
│   ├── API.md                                 ✅ API documentation
│   └── examples/                              ✅ Sample data
│       ├── sample-data.ts
│       └── test-portfolios/
│
├── public/                                    ✅ Static assets
│   └── templates/                             ✨ NEW: Template previews
│       ├── template-01-preview.png
│       ├── template-02-preview.png
│       └── template-03-preview.png
│
├── content/                                   ✅ MDX content
│
├── CONTRIBUTING.md                            ✨ NEW: Contribution guide
├── README.md                                  ⚠️ Update with new info
├── package.json
└── tsconfig.json

BENEFITS:
✅ Clear template system with registry
✅ Separation of concerns
✅ Easy to add new templates
✅ Organized by purpose
✅ Self-documenting structure
✅ Contributor-friendly
✅ Scalable architecture
✅ Type safety throughout
```

---

## 📋 Migration Mapping

### File Movements & Transformations

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `components/portfolio-content.tsx` | `templates/template-01/` | Split into sections |
| `lib/portfolio-utils.ts` | `lib/api/` | Split into fetch & transform |
| `components/portfolio-data-provider.tsx` | `components/shared/` + `types/` | Split types & provider |
| `components/project-card.tsx` | `components/common/` | Move |
| `components/resume-card.tsx` | `components/common/` | Move |
| `components/hackathon-card.tsx` | `components/common/` | Move |
| `components/responsive-navbar.tsx` | `components/common/` | Move |
| `components/portfolio-content-wrapper.tsx` | `components/shared/PortfolioWrapper.tsx` | Enhance |
| `data/resume.tsx` | `docs/examples/` | Move |

### New Files to Create

| File | Purpose |
|------|---------|
| `templates/index.ts` | Template registry |
| `templates/template-01/index.tsx` | Main template component |
| `templates/template-01/config.ts` | Template configuration |
| `templates/template-01/README.md` | Template docs |
| `templates/template-01/sections/*.tsx` | Individual sections |
| `components/shared/TemplateRenderer.tsx` | Template selector |
| `components/shared/ErrorBoundary.tsx` | Error handling |
| `components/common/AnimationWrapper.tsx` | Animation wrapper |
| `components/common/MarkdownRenderer.tsx` | Markdown wrapper |
| `lib/api/fetch-portfolio.ts` | API fetching |
| `lib/api/transform-data.ts` | Data transformation |
| `lib/utils/url.ts` | URL utilities |
| `types/api.ts` | API types |
| `types/portfolio.ts` | Portfolio types |
| `types/template.ts` | Template types |
| `hooks/use-template.ts` | Template hook |
| `docs/ARCHITECTURE.md` | Architecture docs |
| `docs/TEMPLATE_CREATION.md` | Template guide |
| `docs/API.md` | API docs |
| `CONTRIBUTING.md` | Contribution guide |

---

## 🔄 Component Dependency Graph

### Current (Tightly Coupled)

```
app/page.tsx
    ↓
portfolio-content-wrapper.tsx
    ↓
portfolio-content.tsx (MONOLITH)
    ├── Hero
    ├── About
    ├── Work
    ├── Education
    ├── Skills
    ├── Projects
    ├── Hackathons
    └── Contact
    
❌ Problem: All in one file, hard to maintain
❌ Problem: Can't swap layouts
❌ Problem: Difficult for contributors
```

### Proposed (Loosely Coupled)

```
app/page.tsx (Server Component)
    ↓
    [Fetches portfolio data + templateId]
    ↓
PortfolioWrapper (Client Component)
    ├── ErrorBoundary
    ├── HydrationWrapper
    └── PortfolioDataProvider
        ↓
        TemplateRenderer
            ↓
            [Selects template by ID]
            ↓
        Template Component (e.g., Template01)
            ├── sections/Hero
            ├── sections/About
            ├── sections/Experience
            ├── sections/Education
            ├── sections/Skills
            ├── sections/Projects
            ├── sections/Certificates
            └── sections/Contact
                ↓
                [Each section uses components from common/]
                ├── ProjectCard
                ├── ResumeCard
                ├── HackathonCard
                └── AnimationWrapper

✅ Benefit: Modular and testable
✅ Benefit: Easy to swap templates
✅ Benefit: Clear boundaries
✅ Benefit: Reusable components
```

---

## 📦 Module Organization

### API Layer (`lib/api/`)

```typescript
// fetch-portfolio.ts - Fetching logic
export async function fetchPortfolio(username: string)

// transform-data.ts - Data transformation
export function transformUserData(raw: UserProfile): PortfolioData
```

**Responsibility:** API communication and data normalization

---

### Template Layer (`templates/`)

```typescript
// index.ts - Template registry
export const TEMPLATES: Record<string, Template>
export function getTemplate(id?: string): Template

// template-{id}/index.tsx - Template component
export default function Template01({ portfolioData }: TemplateProps)

// template-{id}/config.ts - Template metadata
export const template01Config: TemplateConfig
```

**Responsibility:** Portfolio layouts and rendering

---

### Shared Components (`components/shared/`)

```typescript
// TemplateRenderer.tsx - Template selection
export function TemplateRenderer({ portfolioData, templateId })

// PortfolioWrapper.tsx - Composition
export function PortfolioWrapper({ portfolioData, templateId })

// PortfolioDataProvider.tsx - Context
export function PortfolioDataProvider({ children, data })

// ErrorBoundary.tsx - Error handling
export class ErrorBoundary extends React.Component
```

**Responsibility:** System functionality (not template-specific)

---

### Common Components (`components/common/`)

```typescript
// ProjectCard.tsx
export function ProjectCard({ project, variant, className })

// ResumeCard.tsx
export function ResumeCard({ title, subtitle, description, ... })

// AnimationWrapper.tsx
export function AnimationWrapper({ children, delay, ... })
```

**Responsibility:** Reusable UI components across templates

---

### Types (`types/`)

```typescript
// api.ts - Raw API
export interface UserProfile { ... }

// portfolio.ts - UI data
export interface PortfolioData { ... }

// template.ts - Template system
export interface Template { ... }
export interface TemplateConfig { ... }
export interface TemplateProps { ... }
```

**Responsibility:** Type definitions for the entire app

---

## 🎯 Key Improvements

### 1. Clear Separation of Concerns

| Layer | Responsibility | Examples |
|-------|---------------|----------|
| **App** | Routing, data fetching | `app/page.tsx` |
| **Templates** | Layout & presentation | `templates/template-01/` |
| **Shared** | System functionality | `components/shared/` |
| **Common** | Reusable UI | `components/common/` |
| **API** | Data fetching | `lib/api/` |
| **Types** | Type definitions | `types/` |

### 2. Scalability

```
Adding a new template:
1. Create templates/template-{id}/ directory
2. Add index.tsx, config.ts, README.md
3. Register in templates/index.ts
4. Done! ✅

Before: Had to modify core files ❌
After: Self-contained template ✅
```

### 3. Contributor Experience

```
Understanding the codebase:
Before: 
- "Where's the main component?" 
- "Where do I put this?"
- "What can I modify?"
❌ Confusing structure

After:
- templates/ → Portfolio layouts
- components/shared/ → Core system
- components/common/ → Reusable UI
- lib/api/ → API integration
✅ Self-documenting structure
```

### 4. Maintainability

```
Before:
- 500+ line monolithic component
- Mixed concerns
- Hard to test
- Risky to change

After:
- Small focused modules
- Clear boundaries
- Easy to test
- Safe to modify
```

---

## 📊 Metrics & Goals

### Code Quality Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Average file size | 300 lines | < 200 lines |
| Cyclomatic complexity | High | Low-Medium |
| Type coverage | 80% | 95%+ |
| Component coupling | Tight | Loose |
| Documentation coverage | 20% | 80%+ |

### Developer Experience Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Time to add template | N/A | < 4 hours |
| Time to understand codebase | 4+ hours | < 1 hour |
| Contribution barriers | High | Low |
| Code review time | 60+ min | < 30 min |

---

## ✅ Next Steps

1. **Phase 1**: Refactor types and utilities (Week 1)
2. **Phase 2**: Build template system core (Week 2)
3. **Phase 3**: Convert current design to Template-01 (Week 2-3)
4. **Phase 4**: API integration for templateId (Week 3)
5. **Phase 5**: Create new templates (Week 4)
6. **Phase 6**: Documentation and polish (Week 5)

See [tasks.md](../tasks.md) for detailed breakdown.
