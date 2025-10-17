# Contributing to Cofounds Portfolio

Thank you for your interest in contributing to Cofounds Portfolio! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How Can I Contribute?](#how-can-i-contribute)
4. [Development Setup](#development-setup)
5. [Project Structure](#project-structure)
6. [Coding Standards](#coding-standards)
7. [Commit Guidelines](#commit-guidelines)
8. [Pull Request Process](#pull-request-process)
9. [Template Contributions](#template-contributions)
10. [Bug Reports](#bug-reports)
11. [Feature Requests](#feature-requests)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for everyone. Please be respectful and constructive in all interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments, personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed
- Git installed and configured
- Basic knowledge of React, TypeScript, and Next.js
- Familiarity with Tailwind CSS

### Quick Start

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/cofounds-portfolio.git
cd cofounds-portfolio

# 3. Install dependencies
pnpm install

# 4. Create a branch
git checkout -b feature/your-feature-name

# 5. Start development server
pnpm dev

# 6. Open http://localhost:3000
```

---

## 🎯 How Can I Contribute?

### Types of Contributions

1. **🎨 Templates** - Create new portfolio templates
2. **🐛 Bug Fixes** - Fix issues and bugs
3. **✨ Features** - Add new features
4. **📚 Documentation** - Improve docs and guides
5. **🧪 Testing** - Add or improve tests
6. **♿ Accessibility** - Improve accessibility
7. **🎨 UI/UX** - Enhance user interface and experience
8. **⚡ Performance** - Optimize performance
9. **🌐 Internationalization** - Add translations

### Contribution Levels

| Level | Description | Examples |
|-------|-------------|----------|
| **Beginner** | Good first issues | Typo fixes, documentation updates |
| **Intermediate** | Moderate complexity | Bug fixes, small features |
| **Advanced** | Complex changes | New templates, major features |

Look for labels:
- `good first issue` - Great for newcomers
- `help wanted` - We'd love your help
- `template` - Template-related
- `bug` - Bug fixes needed
- `enhancement` - New features

---

## 🛠️ Development Setup

### Environment Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Required environment variables:
# COFOUNDS_API_URL=https://api.cofounds.in/portfolio
# NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
# NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

### Useful Scripts

```bash
# Run all checks before committing
pnpm lint && pnpm type-check && pnpm build

# Clean install (if having issues)
rm -rf node_modules pnpm-lock.yaml .next
pnpm install
```

---

## 📁 Project Structure

```
cofounds-portfolio/
├── src/
│   ├── app/                    # Next.js app router
│   ├── templates/              # Portfolio templates
│   │   ├── template-01/       # Classic template
│   │   ├── template-02/       # Minimal template
│   │   └── index.ts           # Template registry
│   ├── components/
│   │   ├── shared/            # Shared system components
│   │   ├── common/            # Reusable UI components
│   │   └── ui/                # Base UI components (shadcn)
│   ├── lib/
│   │   ├── api/               # API integration
│   │   └── utils/             # Utility functions
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript type definitions
├── docs/                      # Documentation
├── public/                    # Static assets
└── content/                   # MDX content files
```

For detailed architecture, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md).

---

## 📝 Coding Standards

### TypeScript

```typescript
// ✅ Good - Explicit types
interface UserProps {
  name: string;
  age: number;
}

function greetUser({ name, age }: UserProps): string {
  return `Hello ${name}, you are ${age} years old`;
}

// ❌ Bad - Implicit any
function greetUser(props: any) {
  return `Hello ${props.name}`;
}
```

### React Components

```typescript
// ✅ Good - Functional component with types
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
}

// ❌ Bad - Missing types and default export
export default function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `ProjectCard.tsx` |
| Utilities | kebab-case | `fetch-portfolio.ts` |
| Types | kebab-case | `portfolio.ts` |
| Hooks | camelCase with use prefix | `usePortfolioData.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |

### Imports Organization

```typescript
// 1. React and Next.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import clsx from 'clsx';

// 3. Internal imports (absolute paths)
import { PortfolioData } from '@/types/portfolio';
import { fetchPortfolio } from '@/lib/api/fetch-portfolio';
import { Button } from '@/components/ui/button';

// 4. Relative imports
import { template01Config } from './config';
import Hero from './sections/Hero';

// 5. Styles (if any)
import './styles.css';
```

### Comments

```typescript
// ✅ Good - Explain WHY, not WHAT
// Cache user data for 60 seconds to reduce API calls
const { data } = useSWR(key, fetcher, { revalidate: 60 });

// ❌ Bad - Obvious comment
// Set the name variable
const name = user.name;

// ✅ Good - Complex logic explained
/**
 * Calculates the delay for staggered animations.
 * Each item gets an incremental delay to create a cascade effect.
 * Base delay ensures previous section completes first.
 */
const delay = BASE_DELAY + (index * STAGGER_DELAY);
```

### Code Formatting

We use Prettier for consistent formatting:

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

**Prettier config:**
- 2 spaces for indentation
- Single quotes for strings
- Trailing commas
- 80 character line width (for readability)

---

## 🔀 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(templates): add template-04` |
| `fix` | Bug fix | `fix(api): handle null response` |
| `docs` | Documentation | `docs: update contributing guide` |
| `style` | Code style changes | `style: format with prettier` |
| `refactor` | Code refactoring | `refactor: extract shared logic` |
| `perf` | Performance improvements | `perf: optimize image loading` |
| `test` | Adding tests | `test: add template tests` |
| `chore` | Maintenance | `chore: update dependencies` |

### Examples

```bash
# Good commits
feat(templates): add modern portfolio template
fix(navbar): resolve mobile menu z-index issue
docs(readme): add deployment instructions
refactor(api): split transform logic into separate file

# Bad commits
update code
fixed stuff
changes
wip
```

### Commit Message Guidelines

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor" not "moves cursor")
- First line should be 50 characters or less
- Add detailed description if needed (after blank line)
- Reference issues and PRs when applicable

```bash
# Good detailed commit
feat(templates): add glassmorphism template

- Implement frosted glass effect components
- Add custom blur animations
- Create responsive grid layout
- Include dark theme support

Closes #42
```

---

## 📬 Pull Request Process

### Before Submitting

1. **Update your fork**
   ```bash
   git remote add upstream https://github.com/devasaya2003/cofounds-portfolio.git
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm build
   ```

3. **Test thoroughly**
   - Test on different screen sizes
   - Test light and dark themes
   - Test with different data scenarios

4. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update relevant docs

### PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Template submission

## Related Issue
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
![Screenshot](url)

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile
- [ ] Tested light theme
- [ ] Tested dark theme

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added to complex code
- [ ] Documentation updated
- [ ] No console warnings/errors
- [ ] Tests pass (if applicable)
```

### Review Process

1. **Automated checks** - Must pass all CI checks
2. **Code review** - At least one maintainer reviews
3. **Testing** - Maintainers may test your changes
4. **Feedback** - Address any requested changes
5. **Approval** - Once approved, PR will be merged

### After Merge

- Your contribution will be included in the next release
- You'll be added to the contributors list
- Delete your branch (optional)

```bash
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## 🎨 Template Contributions

Creating a new template? Follow these steps:

### 1. Plan Your Template

- **Design concept** - Sketch or wireframe your design
- **Target audience** - Who is this template for?
- **Unique features** - What makes it special?
- **Complexity** - Beginner-friendly or advanced?

### 2. Create Template Structure

```bash
# Create template directory
mkdir -p src/templates/template-XX

# Create required files
touch src/templates/template-XX/index.tsx
touch src/templates/template-XX/config.ts
touch src/templates/template-XX/README.md
```

### 3. Follow Template Guide

Read [Template Creation Guide](./docs/TEMPLATE_CREATION.md) for detailed instructions.

### 4. Template Checklist

- [ ] Unique template ID
- [ ] Complete config.ts
- [ ] Comprehensive README.md
- [ ] Preview screenshot/GIF
- [ ] All sections implemented
- [ ] Responsive design
- [ ] Theme support (light/dark)
- [ ] Handles missing data
- [ ] Accessibility tested
- [ ] Registered in templates/index.ts
- [ ] No TypeScript errors
- [ ] No console errors

### 5. Submit Template PR

Use the template submission PR template and include:
- Description of your template
- Preview screenshot or video
- Design inspiration (if any)
- Target use case

---

## 🐛 Bug Reports

### Before Reporting

1. **Search existing issues** - Has this been reported?
2. **Update to latest version** - Is the bug still present?
3. **Reproduce the bug** - Can you consistently reproduce it?

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## To Reproduce
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen instead

## Actual Behavior
What actually happens

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g., macOS 12.0]
- Browser: [e.g., Chrome 98]
- Node version: [e.g., 18.0.0]
- Template: [e.g., template-01]

## Additional Context
Any other relevant information
```

### Bug Priority Labels

- `critical` - Blocks core functionality
- `high` - Major issue, needs quick fix
- `medium` - Important but not urgent
- `low` - Minor issue or cosmetic

---

## ✨ Feature Requests

### Before Requesting

1. **Search existing requests** - Has this been suggested?
2. **Consider scope** - Does it fit the project goals?
3. **Think about implementation** - Is it technically feasible?

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this feature address?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Mockups, examples, or references

## Priority
How important is this feature to you?
- [ ] Critical - Blocking my use
- [ ] High - Very helpful
- [ ] Medium - Nice to have
- [ ] Low - Minor enhancement
```

---

## 🏆 Recognition

### Contributors

All contributors are listed in:
- README.md contributors section
- GitHub contributors page
- Release notes (for significant contributions)

### Types of Recognition

- **Code contributors** - Merged PRs
- **Bug reporters** - Well-documented bug reports
- **Feature suggesters** - Great feature ideas
- **Documentation writers** - Doc improvements
- **Community helpers** - Helping others in discussions

---

## 📚 Additional Resources

### Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - System architecture
- [Template Creation Guide](./docs/TEMPLATE_CREATION.md) - Create templates
- [API Documentation](./docs/API.md) - API integration

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Community

- **GitHub Discussions** - Ask questions, share ideas
- **Issues** - Bug reports and feature requests
- **Pull Requests** - Code contributions
- **Discord** - Real-time chat (coming soon)

---

## ❓ Questions?

If you have questions that aren't covered here:

1. Check the [documentation](./docs)
2. Search [GitHub Discussions](https://github.com/devasaya2003/cofounds-portfolio/discussions)
3. Open a new discussion
4. Reach out to maintainers

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Thank you for contributing to Cofounds Portfolio! Your efforts help make this project better for everyone. We appreciate your time and expertise! ✨

---

**Happy Contributing! 🚀**
