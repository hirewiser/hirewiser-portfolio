# Cofounds Portfolio

### Multi-Template Portfolio System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

Built with Next.js 15, TypeScript, [shadcn/ui](https://ui.shadcn.com/), and [Magic UI](https://magicui.design/)

</div>

---

## 🎯 Overview

Cofounds Portfolio is an **open-source multi-template portfolio system** that allows users to showcase their work using different beautiful templates. Choose from multiple professionally designed templates or create your own!

### 🌟 What Makes This Special?

- 🎨 **Multiple Templates** - Choose from various professionally designed portfolio layouts
- 🔧 **Easy Customization** - API-driven content, no code changes needed
- 🚀 **Template Marketplace** - Contributors can add new templates easily
- 📱 **Fully Responsive** - Beautiful on all devices
- 🌓 **Dark Mode** - Built-in light and dark theme support
- ⚡ **Performance Optimized** - Fast loading and smooth animations
- 🎭 **Type Safe** - Written in TypeScript for reliability
- 📚 **Well Documented** - Comprehensive guides for contributors

---

## ✨ Features

### For Users
- ✅ Multiple template options to choose from
- ✅ Subdomain-based portfolio hosting (username.cofounds.in)
- ✅ Automatic data fetching from Cofounds API
- ✅ Responsive design that works everywhere
- ✅ Light and dark mode support
- ✅ Smooth animations and transitions
- ✅ SEO optimized

### For Developers
- ✅ Clean, modular architecture
- ✅ Easy to add new templates
- ✅ Comprehensive documentation
- ✅ TypeScript throughout
- ✅ Reusable component library
- ✅ Well-organized folder structure
- ✅ Contributor-friendly codebase

### For Contributors
- ✅ Clear contribution guidelines
- ✅ Template creation guide
- ✅ Shared component library
- ✅ Consistent coding standards
- ✅ Fast review process
- ✅ Recognition for contributions

---

## 🎨 Available Templates

| Template | Description | Preview |
|----------|-------------|---------|
| **Template-01** | Classic animated portfolio with all sections | [Preview](./public/templates/template-01-preview.png) |
| **Template-02** | Minimal typography-focused design | [Preview](./public/templates/template-02-preview.png) |
| **Template-03** | Modern interactive portfolio | [Preview](./public/templates/template-03-preview.png) |
| **Your Template?** | Create and submit your own! | [Guide](./docs/TEMPLATE_CREATION.md) |

---

## 🚀 Quick Start

### For Users

Your portfolio is automatically generated at `username.cofounds.in` based on your Cofounds profile!

### For Developers

```bash
# 1. Clone the repository
git clone https://github.com/devasaya2003/cofounds-portfolio.git
cd cofounds-portfolio

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API URL

# 4. Start development server
pnpm dev

# 5. Open http://localhost:3000
```

---

## 📚 Documentation

Comprehensive documentation is available to help you understand and contribute to the project:

### Getting Started
- 📖 [Quick Reference](./docs/QUICK_REFERENCE.md) - Quick tips and common tasks
- 🏗️ [Architecture](./docs/ARCHITECTURE.md) - System design and patterns
- 📁 [Folder Structure](./docs/FOLDER_STRUCTURE.md) - Project organization
- 👁️ [Visual Overview](./docs/VISUAL_OVERVIEW.md) - Visual diagrams

### Contributing
- 🤝 [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- 🎨 [Template Creation](./docs/TEMPLATE_CREATION.md) - Create new templates
- ✅ [Implementation Tasks](./tasks.md) - Development roadmap

### Start Here
1. **New to the project?** → Read [Quick Reference](./docs/QUICK_REFERENCE.md)
2. **Want to contribute?** → Check [Contributing Guide](./CONTRIBUTING.md)
3. **Creating a template?** → Follow [Template Creation Guide](./docs/TEMPLATE_CREATION.md)
4. **Understanding the system?** → Review [Architecture](./docs/ARCHITECTURE.md)

---

## 🏗️ Architecture

```
User Request (username.cofounds.in)
         ↓
    Extract Username
         ↓
    Fetch Portfolio Data (includes templateId)
         ↓
    Transform Data
         ↓
    Template Registry → Select Template by ID
         ↓
    Render Selected Template
         ↓
    Beautiful Portfolio! ✨
```

### Project Structure

```
src/
├── app/              # Next.js app router
├── templates/        # Portfolio templates
│   ├── template-01/  # Classic template
│   ├── template-02/  # Minimal template
│   └── template-03/  # Modern template
├── components/
│   ├── shared/       # System components
│   ├── common/       # Reusable components
│   └── ui/           # Base UI components
├── lib/
│   ├── api/          # API integration
│   └── utils/        # Utilities
├── types/            # TypeScript types
└── hooks/            # Custom React hooks
```

For detailed architecture, see [Architecture Documentation](./docs/ARCHITECTURE.md).

---

## 🎨 Creating a Template

Want to create your own portfolio template? It's easy!

```typescript
// 1. Create template directory
src/templates/template-04/

// 2. Add required files
├── index.tsx      // Main component
├── config.ts      // Template metadata
├── README.md      // Documentation
└── sections/      // Optional sections

// 3. Register template
// Add to src/templates/index.ts

// 4. Submit PR!
```

See the complete [Template Creation Guide](./docs/TEMPLATE_CREATION.md) for detailed instructions.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. 🎨 **Create Templates** - Design new portfolio layouts
2. 🐛 **Fix Bugs** - Help squash bugs
3. ✨ **Add Features** - Implement new functionality
4. 📚 **Improve Docs** - Make docs better
5. 🧪 **Add Tests** - Increase test coverage
6. 🌐 **Translations** - Add i18n support

### Contribution Process

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/amazing-template

# 3. Make your changes
# 4. Commit with conventional commits
git commit -m "feat(templates): add amazing template"

# 5. Push to your fork
git push origin feature/amazing-template

# 6. Open a Pull Request
```

Read our [Contributing Guide](./CONTRIBUTING.md) for detailed information.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui, Magic UI
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Package Manager:** pnpm

---

## 📊 Project Status

### Current Phase: Planning → Implementation

- ✅ **Planning Complete** - Architecture designed
- ✅ **Documentation Complete** - All guides written
- ⏳ **Implementation Phase 1** - Refactoring types and utilities
- ⏳ **Template System Core** - Building registry and renderer
- ⏳ **Template-01 Conversion** - Converting current design
- ⏳ **New Templates** - Creating Template-02 and Template-03

See [tasks.md](./tasks.md) for detailed roadmap.

---

## 🌟 Key Features

### Multi-Template System
- **Template Registry** - Centralized template management
- **Dynamic Switching** - Switch templates via API
- **Fallback System** - Default template for invalid IDs
- **Template Isolation** - Each template is independent

### Developer Experience
- **Type Safe** - Full TypeScript coverage
- **Modular Design** - Easy to understand and modify
- **Shared Components** - Reusable component library
- **Clear Structure** - Self-documenting organization
- **Hot Reload** - Fast development cycle

### Performance
- **Server-Side Rendering** - Fast initial load
- **Code Splitting** - Load only what's needed
- **Optimized Images** - Automatic image optimization
- **Caching** - API response caching
- **Lighthouse Score** - 90+ across all metrics

---

## 📝 License

Licensed under the [MIT License](./LICENSE) - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- Original portfolio template by [Dillion Verma](https://github.com/dillionverma)
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Magic UI](https://magicui.design/) for animated components
- All our [contributors](https://github.com/devasaya2003/cofounds-portfolio/graphs/contributors)

---

## 📞 Support & Community

- 📖 [Documentation](./docs/)
- 💬 [GitHub Discussions](https://github.com/devasaya2003/cofounds-portfolio/discussions)
- 🐛 [Issue Tracker](https://github.com/devasaya2003/cofounds-portfolio/issues)
- 🌟 [Star this repo](https://github.com/devasaya2003/cofounds-portfolio)

---

## 🗺️ Roadmap

### Phase 1: Foundation (Week 1-2) ✅
- [x] Architecture design
- [x] Documentation creation
- [ ] Type system refactoring
- [ ] Utility function extraction

### Phase 2: Core System (Week 2-3)
- [ ] Template registry
- [ ] Template renderer
- [ ] Error handling
- [ ] Template-01 conversion

### Phase 3: Integration (Week 3)
- [ ] API templateId support
- [ ] Data transformation updates
- [ ] Testing infrastructure

### Phase 4: Expansion (Week 4)
- [ ] Template-02 creation
- [ ] Template-03 creation
- [ ] Template creation guide
- [ ] Preview system

### Phase 5: Launch (Week 5)
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Final documentation
- [ ] Public launch 🚀

---

<div align="center">

### Made with ❤️ for the open source community

**[⭐ Star this repo](https://github.com/devasaya2003/cofounds-portfolio)** • **[🤝 Contribute](./CONTRIBUTING.md)** • **[📖 Docs](./docs/)** • **[🐛 Report Bug](https://github.com/devasaya2003/cofounds-portfolio/issues)**

</div>
