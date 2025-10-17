# Multi-Template Portfolio System - Implementation Plan

## 🎯 Project Overview
Transform the current single-template portfolio into a scalable multi-template system where different portfolio layouts can be rendered based on a template ID from the API response.

---

## 📋 Current Architecture Analysis

### Current Structure
```
src/
├── app/
│   ├── page.tsx              # Main entry point - fetches portfolio data
│   ├── layout.tsx            # Root layout with theme provider
│   └── types/
│       └── portfolio.ts      # Type re-exports
├── components/
│   ├── portfolio-content.tsx              # Current template (TEMPLATE-01)
│   ├── portfolio-content-wrapper.tsx     # Hydration wrapper
│   ├── portfolio-data-provider.tsx       # Data context + types
│   ├── portfolio-utils.ts                # API fetch + transform logic
│   └── [UI components]                   # Reusable UI components
└── lib/
    └── portfolio-utils.ts                 # Utilities
```

### Current Data Flow
1. `page.tsx` → Fetches portfolio data from API
2. `portfolio-utils.ts` → Transforms API data to UI format
3. `portfolio-content-wrapper.tsx` → Handles hydration
4. `portfolio-content.tsx` → Renders single template
5. `portfolio-data-provider.tsx` → Provides data context

### Issues to Address
- ❌ Hardcoded template (no template selection)
- ❌ Tightly coupled components
- ❌ No clear separation between template-specific and shared logic
- ❌ Difficult for contributors to add new templates
- ❌ No documentation for template creation

---

## 🎨 New Multi-Template Architecture

### Proposed Folder Structure
```
src/
├── app/
│   ├── page.tsx                          # Entry point (minimal changes)
│   ├── layout.tsx                        # Root layout (no changes)
│   └── types/
│       └── portfolio.ts                  # Centralized types
│
├── templates/
│   ├── index.ts                          # Template registry
│   ├── template-01/                      # Classic template (current design)
│   │   ├── index.tsx                     # Main template component
│   │   ├── sections/                     # Template-specific sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Certificates.tsx
│   │   │   └── Contact.tsx
│   │   ├── config.ts                     # Template configuration
│   │   └── README.md                     # Template documentation
│   │
│   ├── template-02/                      # Minimal template (new)
│   │   ├── index.tsx
│   │   ├── sections/
│   │   ├── config.ts
│   │   └── README.md
│   │
│   └── template-03/                      # Modern template (new)
│       ├── index.tsx
│       ├── sections/
│       ├── config.ts
│       └── README.md
│
├── components/
│   ├── shared/                           # Shared across all templates
│   │   ├── PortfolioDataProvider.tsx    # Context provider
│   │   ├── TemplateRenderer.tsx         # Template selector
│   │   ├── PortfolioWrapper.tsx         # Hydration + error handling
│   │   └── ErrorBoundary.tsx            # Error boundaries
│   │
│   ├── ui/                               # Shadcn UI components
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   │
│   └── common/                           # Reusable across templates
│       ├── ProjectCard.tsx              # Can be customized per template
│       ├── ResumeCard.tsx
│       ├── HackathonCard.tsx
│       ├── ResponsiveNavbar.tsx
│       ├── AnimationWrapper.tsx         # BlurFade wrapper
│       └── MarkdownRenderer.tsx         # Markdown rendering
│
├── lib/
│   ├── api/
│   │   ├── fetch-portfolio.ts           # API fetching logic
│   │   └── transform-data.ts            # Data transformation
│   ├── utils/
│   │   ├── cn.ts                        # Class name utility
│   │   └── url.ts                       # URL/subdomain utils
│   └── constants/
│       └── templates.ts                 # Template metadata
│
├── hooks/
│   ├── use-portfolio-data.ts            # Portfolio data hook
│   ├── use-hydrated.ts                  # Hydration state
│   └── use-template.ts                  # Template selection logic
│
└── types/
    ├── api.ts                            # API response types
    ├── portfolio.ts                      # Portfolio data types
    └── template.ts                       # Template system types
```

---

## 📝 Detailed Implementation Tasks

### Phase 1: Refactoring & Type System (Week 1)

#### Task 1.1: Create Centralized Type System
**Files to Create:**
- `src/types/api.ts` - API response interfaces
- `src/types/portfolio.ts` - Transformed portfolio data types
- `src/types/template.ts` - Template system types

**Type Definitions:**
```typescript
// src/types/template.ts
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  author: string;
  version: string;
  tags: string[];
  features: string[];
}

export interface TemplateProps {
  portfolioData: PortfolioData;
  config?: TemplateConfig;
}

export interface Template {
  id: string;
  component: React.ComponentType<TemplateProps>;
  config: TemplateConfig;
}
```

#### Task 1.2: Restructure Utilities
**Action:** Split `portfolio-utils.ts` into focused modules
- `lib/api/fetch-portfolio.ts` - API fetching
- `lib/api/transform-data.ts` - Data transformation
- `lib/utils/url.ts` - URL/subdomain extraction

#### Task 1.3: Extract Shared Components
**Action:** Move reusable components to `components/common/`
- Extract `ProjectCard`, `ResumeCard`, `HackathonCard`
- Create `AnimationWrapper` (wraps BlurFade logic)
- Create `MarkdownRenderer` (wraps react-markdown)
- Move `ResponsiveNavbar` to common

---

### Phase 2: Template System Core (Week 2)

#### Task 2.1: Create Template Registry
**File:** `src/templates/index.ts`

```typescript
import { Template } from '@/types/template';
import Template01 from './template-01';
import Template02 from './template-02';
import Template03 from './template-03';

export const TEMPLATES: Record<string, Template> = {
  'template-01': Template01,
  'template-02': Template02,
  'template-03': Template03,
};

export const DEFAULT_TEMPLATE_ID = 'template-01';

export function getTemplate(templateId?: string): Template {
  const id = templateId || DEFAULT_TEMPLATE_ID;
  return TEMPLATES[id] || TEMPLATES[DEFAULT_TEMPLATE_ID];
}
```

#### Task 2.2: Create Template Renderer
**File:** `src/components/shared/TemplateRenderer.tsx`

```typescript
'use client';

import { getTemplate } from '@/templates';
import { TemplateProps } from '@/types/template';

export function TemplateRenderer({ portfolioData, templateId }: TemplateProps & { templateId?: string }) {
  const template = getTemplate(templateId);
  const TemplateComponent = template.component;
  
  return <TemplateComponent portfolioData={portfolioData} config={template.config} />;
}
```

#### Task 2.3: Update Portfolio Wrapper
**File:** `src/components/shared/PortfolioWrapper.tsx`

Combine hydration + error handling + template rendering

---

### Phase 3: Convert Current Template to Template-01 (Week 2-3)

#### Task 3.1: Create Template-01 Structure
**Action:** Create modular sections from current `portfolio-content.tsx`

Split into:
- `templates/template-01/sections/Hero.tsx`
- `templates/template-01/sections/About.tsx`
- `templates/template-01/sections/Experience.tsx`
- `templates/template-01/sections/Education.tsx`
- `templates/template-01/sections/Skills.tsx`
- `templates/template-01/sections/Projects.tsx`
- `templates/template-01/sections/Certificates.tsx`
- `templates/template-01/sections/Contact.tsx`

#### Task 3.2: Create Template-01 Main Component
**File:** `templates/template-01/index.tsx`

Import all sections and compose them with:
- Consistent animation delays
- Responsive layout
- Theme support
- Analytics integration

#### Task 3.3: Add Template Configuration
**File:** `templates/template-01/config.ts`

```typescript
export const template01Config: TemplateConfig = {
  id: 'template-01',
  name: 'Classic Portfolio',
  description: 'Clean and professional single-page portfolio',
  thumbnail: '/templates/template-01-preview.png',
  author: 'Cofounds',
  version: '1.0.0',
  tags: ['minimal', 'single-page', 'animated'],
  features: [
    'Blur fade animations',
    'Responsive navbar',
    'Project showcase',
    'Certificate timeline',
  ],
};
```

#### Task 3.4: Create Template Documentation
**File:** `templates/template-01/README.md`

Document:
- Template overview
- Features
- Customization options
- Component structure
- Data requirements

---

### Phase 4: API Integration (Week 3)

#### Task 4.1: Update API Response Type
**Action:** Add `templateId` field to API response

```typescript
// src/types/api.ts
export interface UserProfileResponse {
  data: {
    // ... existing fields
    templateId?: string; // New field
  }
}
```

#### Task 4.2: Update Transform Function
**Action:** Extract and pass template ID

```typescript
// lib/api/transform-data.ts
export const transformUserData = (userData: UserProfile) => {
  return {
    // ... existing fields
    templateId: userData.templateId || 'template-01',
  };
};
```

#### Task 4.3: Update Main Page
**File:** `src/app/page.tsx`

Pass templateId to renderer:

```typescript
return (
  <PortfolioWrapper 
    portfolioData={portfolioData}
    templateId={portfolioData.templateId}
  />
);
```

---

### Phase 5: Create New Templates (Week 4)

#### Task 5.1: Design Template-02 (Minimal)
**Features:**
- Minimal design
- Typography-focused
- No heavy animations
- Fast loading

#### Task 5.2: Design Template-03 (Modern)
**Features:**
- Bold colors
- Interactive elements
- Glassmorphism effects
- Grid-based layout

#### Task 5.3: Document Template Creation Guide
**File:** `docs/TEMPLATE_CREATION.md`

Guide for contributors to create new templates

---

### Phase 6: Testing & Documentation (Week 5)

#### Task 6.1: Add Template Previews
Create preview page for all templates

#### Task 6.2: Update Main README
Document:
- Multi-template system
- How to switch templates
- Template gallery
- Contribution guidelines

#### Task 6.3: Create Contributing Guide
**File:** `CONTRIBUTING.md`

Guidelines for:
- Code style
- Template creation
- Component naming
- Pull request process

#### Task 6.4: Add Comments & JSDoc
Add comprehensive comments to:
- Template registry
- Core utilities
- Type definitions
- Complex components

---

## 🔧 Technical Implementation Details

### Template Interface
```typescript
interface TemplateSection {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  enabled: boolean;
  order: number;
}

interface TemplateLayout {
  sections: TemplateSection[];
  navbar: NavbarConfig;
  footer?: FooterConfig;
  animations?: AnimationConfig;
}
```

### Data Flow
```
API Response
    ↓
[fetch-portfolio.ts] → Raw API data
    ↓
[transform-data.ts] → Normalized portfolio data + templateId
    ↓
[page.tsx] → Server-side fetch
    ↓
[PortfolioWrapper] → Hydration + Error handling
    ↓
[TemplateRenderer] → Select template by ID
    ↓
[Template Component] → Render sections
    ↓
[Section Components] → Individual sections
```

---

## 📚 Documentation Structure

### For Users
- `README.md` - Overview, features, deployment
- `docs/USER_GUIDE.md` - How to use different templates
- `docs/CUSTOMIZATION.md` - Customization options

### For Contributors
- `CONTRIBUTING.md` - Contribution guidelines
- `docs/TEMPLATE_CREATION.md` - Creating new templates
- `docs/ARCHITECTURE.md` - System architecture
- `docs/API.md` - API integration guide

### For Each Template
- `templates/{template-id}/README.md` - Template-specific docs

---

## ✅ Definition of Done

### Code Quality
- [ ] All components have TypeScript types
- [ ] No `any` types unless absolutely necessary
- [ ] All functions have JSDoc comments
- [ ] Consistent naming conventions
- [ ] Proper error handling

### Functionality
- [ ] Template switching works correctly
- [ ] Fallback to default template on error
- [ ] All current features working in Template-01
- [ ] Responsive on all devices
- [ ] Animations work smoothly

### Documentation
- [ ] README updated with multi-template info
- [ ] Template creation guide complete
- [ ] Architecture documented
- [ ] Inline code comments added
- [ ] API documentation updated

### Testing
- [ ] Manual testing on all templates
- [ ] Test with missing/invalid templateId
- [ ] Test error states
- [ ] Test on multiple browsers
- [ ] Test mobile responsiveness

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Update environment variables
- [ ] Test API integration
- [ ] Verify all templates render correctly
- [ ] Check error handling
- [ ] Test subdomain routing

### Post-deployment
- [ ] Monitor for errors
- [ ] Check analytics integration
- [ ] Verify template switching
- [ ] Test performance
- [ ] Update documentation

---

## 📊 Success Metrics

### Developer Experience
- New template creation time < 4 hours
- Code review time < 30 minutes
- Clear contribution path

### Performance
- Initial load time < 2 seconds
- Template switch time < 500ms
- Lighthouse score > 90

### Maintainability
- Template isolation (changes don't affect others)
- Easy to add new features
- Clear code structure

---

## 🎯 Priority Levels

### P0 - Critical (Week 1-2)
- Type system refactoring
- Template registry
- Convert current design to Template-01

### P1 - High (Week 3)
- API integration for templateId
- Error handling & fallbacks
- Basic documentation

### P2 - Medium (Week 4)
- Create Template-02 and Template-03
- Template creation guide
- Preview system

### P3 - Low (Week 5)
- Advanced features
- Optimization
- Enhanced documentation

---

## 🤝 Contribution Guidelines

### Template Submission Requirements
1. Follow folder structure convention
2. Include config.ts with metadata
3. Add README.md with documentation
4. Ensure responsive design
5. Include preview screenshot
6. Test on multiple browsers
7. Add to template registry

### Code Standards
- Use TypeScript strict mode
- Follow existing naming patterns
- Add JSDoc comments
- Include error handling
- Write self-documenting code
- Keep components focused (single responsibility)

---

## 📝 Notes

### Design Principles
1. **Modularity** - Templates are independent
2. **Reusability** - Shared components in common/
3. **Clarity** - Self-documenting code
4. **Flexibility** - Easy to customize
5. **Performance** - Optimized rendering

### Breaking Changes
- Old `portfolio-content.tsx` will be deprecated
- Import paths will change
- Type definitions relocated

### Migration Path
1. Refactor types first (non-breaking)
2. Create new template system (parallel)
3. Migrate current design to Template-01
4. Update imports gradually
5. Remove old files

---

## 🔗 References

### Internal Documentation
- Architecture decisions: `docs/ARCHITECTURE.md`
- API docs: `docs/API.md`
- Template guide: `docs/TEMPLATE_CREATION.md`

### External Resources
- Next.js App Router: https://nextjs.org/docs
- React Server Components: https://react.dev/reference/react
- TypeScript Handbook: https://www.typescriptlang.org/docs/

---

## 📅 Timeline Summary

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Type system & refactoring | New types, split utilities |
| 2 | Template system core | Registry, renderer, Template-01 structure |
| 3 | API integration | Template ID support, error handling |
| 4 | New templates | Template-02, Template-03, guides |
| 5 | Polish & docs | Testing, documentation, optimization |

---

## 📚 Documentation Index

All comprehensive documentation has been created:

### Core Documentation
1. **[tasks.md](./tasks.md)** (This file) - Complete implementation plan with phases and tasks
2. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture and design patterns
3. **[FOLDER_STRUCTURE.md](./docs/FOLDER_STRUCTURE.md)** - Before/after folder structure comparison
4. **[TEMPLATE_CREATION.md](./docs/TEMPLATE_CREATION.md)** - Step-by-step template creation guide
5. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines for open source
6. **[QUICK_REFERENCE.md](./docs/QUICK_REFERENCE.md)** - Quick reference for developers

### What Each Document Contains

#### tasks.md (This File)
- ✅ Project overview and goals
- ✅ Current architecture analysis
- ✅ Proposed architecture
- ✅ Detailed implementation tasks (6 phases)
- ✅ Timeline and priority levels
- ✅ Success metrics and checklist

#### ARCHITECTURE.md
- ✅ High-level system architecture diagrams
- ✅ Module structure explanation
- ✅ Data flow diagrams
- ✅ Component interaction patterns
- ✅ Template lifecycle
- ✅ Error handling strategy
- ✅ Performance considerations

#### FOLDER_STRUCTURE.md
- ✅ Current structure with issues highlighted
- ✅ Proposed structure with benefits
- ✅ File migration mapping
- ✅ Component dependency graphs
- ✅ Module organization details
- ✅ Key improvements summary

#### TEMPLATE_CREATION.md
- ✅ Prerequisites and setup
- ✅ Step-by-step template creation guide
- ✅ Component guidelines
- ✅ Styling and theming best practices
- ✅ Data handling patterns
- ✅ Testing checklist
- ✅ Submission requirements

#### CONTRIBUTING.md
- ✅ Code of conduct
- ✅ Getting started guide
- ✅ Development setup
- ✅ Coding standards
- ✅ Commit guidelines
- ✅ Pull request process
- ✅ Bug report and feature request templates

#### QUICK_REFERENCE.md
- ✅ Quick start for template creation
- ✅ Common tasks and solutions
- ✅ Available data reference
- ✅ Shared components API
- ✅ Design principles
- ✅ Common issues and fixes
- ✅ FAQs

---

## 🎯 Summary for Understanding

### The Problem
Current codebase has:
- Single hardcoded template
- Tightly coupled components
- Mixed concerns
- Hard to add new templates
- Difficult for contributors to understand

### The Solution
Multi-template system with:
- Template registry for easy switching
- Modular, reusable components
- Clear separation of concerns
- Self-documenting structure
- Comprehensive documentation

### The Architecture

```
┌─────────────────────────────────────────────────┐
│         User visits portfolio subdomain          │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Server Component (app/page.tsx)                │
│  • Extracts subdomain → username                │
│  • Fetches portfolio data from API              │
│  • Gets templateId from response                │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Portfolio Wrapper (Client Component)           │
│  • Error boundaries                             │
│  • Hydration handling                           │
│  • Data context provider                        │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Template Renderer                              │
│  • Looks up template by ID in registry          │
│  • Falls back to default if not found           │
│  • Instantiates template component              │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Template Component (e.g., Template-01)         │
│  • Composes sections (Hero, About, etc.)        │
│  • Handles layout and spacing                   │
│  • Applies animations                           │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Section Components                             │
│  • Individual portfolio sections                │
│  • Use shared components from common/           │
│  • Handle missing data gracefully               │
└─────────────────────────────────────────────────┘
```

### The Folder Structure

```
src/
├── app/                          # Next.js app router (minimal changes)
├── templates/                    # ✨ NEW: Template system
│   ├── index.ts                 #   → Template registry
│   ├── template-01/             #   → Classic template (current design)
│   ├── template-02/             #   → Minimal template
│   └── template-03/             #   → Modern template
├── components/
│   ├── shared/                  # ✨ NEW: Core system components
│   ├── common/                  # ✨ NEW: Reusable UI components
│   └── ui/                      #   → Base UI (shadcn)
├── lib/
│   ├── api/                     # ✨ NEW: API logic (fetch + transform)
│   ├── utils/                   # ✨ NEW: Utilities
│   └── constants/               # ✨ NEW: Constants
├── types/                       # ✨ NEW: Centralized types
│   ├── api.ts                   #   → Raw API types
│   ├── portfolio.ts             #   → UI types
│   └── template.ts              #   → Template system types
├── hooks/                       #   → Custom React hooks
└── data/                        #   → Move to docs/examples/
```

### The Benefits

#### For Users
- ✅ Choose from multiple portfolio designs
- ✅ More design options over time
- ✅ Better user experience

#### For Contributors
- ✅ Clear, self-documenting structure
- ✅ Easy to understand and navigate
- ✅ Simple template creation process
- ✅ Comprehensive documentation
- ✅ Can add templates without touching core

#### For Maintainers
- ✅ Modular, testable code
- ✅ Easy to review PRs
- ✅ Scalable architecture
- ✅ Clear separation of concerns
- ✅ Type-safe throughout

### The Implementation Plan

**5 Week Timeline:**

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| **1** | Refactoring | • Split utilities<br>• Create type system<br>• Extract shared components |
| **2** | Core System | • Template registry<br>• Template renderer<br>• Convert to Template-01 |
| **3** | Integration | • API templateId support<br>• Error handling<br>• Documentation |
| **4** | New Templates | • Template-02<br>• Template-03<br>• Template creation guide |
| **5** | Polish | • Testing<br>• Documentation<br>• Optimization |

### How to Get Started

**For Understanding:**
1. Read [QUICK_REFERENCE.md](./docs/QUICK_REFERENCE.md) first
2. Then [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for deeper understanding
3. Check [FOLDER_STRUCTURE.md](./docs/FOLDER_STRUCTURE.md) for comparison

**For Contributing:**
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Study existing templates in `src/templates/template-01/`
3. Follow [TEMPLATE_CREATION.md](./docs/TEMPLATE_CREATION.md) guide

**For Implementation:**
1. Follow the tasks in this file (tasks.md)
2. Refer to [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for design decisions
3. Check [FOLDER_STRUCTURE.md](./docs/FOLDER_STRUCTURE.md) for file locations

---

## 🎉 Ready to Start!

All documentation is complete. The codebase structure is planned. The implementation path is clear.

### Next Steps:
1. ✅ **Documentation Complete** (You are here)
2. ⏳ **Begin Phase 1** - Refactor types and utilities
3. ⏳ **Build Phase 2** - Create template system core
4. ⏳ **Implement Phase 3-6** - Complete the system

### Quick Command to Get Started:
```bash
# Create the new folder structure
mkdir -p src/templates src/types src/lib/api src/lib/utils src/lib/constants
mkdir -p src/components/shared src/components/common
mkdir -p docs/examples

# Start implementing Phase 1
# See Phase 1 tasks above for details
```

---

**Last Updated:** December 2024
**Status:** 📝 Planning Phase Complete - Documentation Ready
**Next Action:** 🚀 Begin Phase 1 - Refactoring & Type System

---

**Got it? Perfect! Let's build this! 🎨✨**
