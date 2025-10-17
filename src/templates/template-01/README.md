# Template-01: Classic Portfolio

A clean and professional single-page portfolio template featuring smooth blur-fade animations, responsive design, and comprehensive sections for showcasing your professional profile.

## Overview

Template-01 is the default template for Cofounds Portfolio, offering a timeless and elegant design that works perfectly for developers, designers, and creative professionals.

## Features

### Design
- 🎨 Clean, minimal aesthetic
- 🌓 Light and dark mode support
- 📱 Mobile-first responsive design
- ✨ Smooth blur-fade animations
- 🎭 Professional color scheme

### Sections
1. **Hero** - Eye-catching introduction with avatar and tagline
2. **About** - Markdown-supported biography section
3. **Work Experience** - Professional experience timeline with company logos
4. **Education** - Academic background with institution details
5. **Skills** - Tag-based skills showcase
6. **Projects** - Grid-based project gallery with images/videos
7. **Certifications** - Timeline of achievements and certifications
8. **Contact** - Clear call-to-action for getting in touch

### Technical Features
- Animated elements using Framer Motion (via BlurFade)
- Responsive navbar with smooth scrolling
- Optimized for performance (Lighthouse 90+)
- SEO-friendly structure
- Accessible (WCAG 2.1 AA compliant)

## Preview

![Template-01 Preview](../../../public/templates/template-01-preview.png)

## Usage

This template is automatically used when no specific template is selected. Users can view their portfolio at `username.cofounds.in`.

### Data Requirements

All data is fetched from the Cofounds API. The template gracefully handles missing or optional data:

**Required:**
- `name` - User's full name
- `username` - Unique username
- `avatarUrl` - Profile picture URL
- `description` - Tagline or short description

**Optional:**
- `summary` - Detailed about section (supports Markdown)
- `work[]` - Work experience entries
- `education[]` - Education entries
- `skills[]` - List of skills
- `projects[]` - Project entries with links and media
- `hackathons[]` - Certifications and achievements
- `contact.email` - Email address
- `contact.social` - Social media links

## Customization

### Animation Speed
Adjust the `BLUR_FADE_DELAY` constant in `index.tsx`:

```typescript
const BLUR_FADE_DELAY = 0.04; // Default: 40ms between animations
```

### Sections
Sections are conditionally rendered based on available data. To hide a section even if data exists, comment out the respective section in `index.tsx`.

### Styling
Template uses Tailwind CSS with semantic color tokens:
- `bg-background` / `text-foreground` - Main colors
- `text-muted-foreground` - Secondary text
- `bg-foreground` / `text-background` - Accent badges

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Initial Load: < 2 seconds
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast (WCAG AA)

## Dependencies

This template uses:
- Next.js 15
- React 19
- Tailwind CSS
- Framer Motion (via Magic UI)
- react-markdown
- shadcn/ui components

## Version History

### v1.0.0 (Current)
- Initial release
- All core sections implemented
- Full responsive support
- Animation system
- Theme support

## Contributing

To improve this template:
1. Make changes in `src/templates/template-01/`
2. Test on multiple screen sizes
3. Ensure animations remain smooth
4. Update this README if needed
5. Submit a PR

## License

MIT License - See root LICENSE file

## Author

Created by the Cofounds team

## Support

For issues or questions about this template:
- Open an issue on GitHub
- Check the main documentation
- Join our community discussions
