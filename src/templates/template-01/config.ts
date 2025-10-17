/**
 * Template-01 Configuration
 * 
 * Classic Portfolio Template - A clean and professional single-page portfolio
 * featuring smooth animations, responsive design, and comprehensive sections.
 */

export const template01Config = {
  id: 'template-01',
  name: 'Classic Portfolio',
  description: 'Clean and professional single-page portfolio with smooth animations',
  thumbnail: '/templates/template-01-preview.png',
  author: 'Cofounds',
  version: '1.0.0',
  tags: ['minimal', 'single-page', 'animated', 'professional'],
  features: [
    'Blur fade animations',
    'Responsive navbar',
    'Hero section with avatar',
    'Markdown-supported about section',
    'Work experience timeline',
    'Education history',
    'Skills showcase',
    'Project gallery with media support',
    'Certifications & achievements',
    'Contact section',
    'Light/Dark theme support',
    'Mobile-first responsive design',
  ],
  sections: [
    'hero',
    'about',
    'work',
    'education',
    'skills',
    'projects',
    'certificates',
    'contact',
  ],
} as const;

export type Template01Config = typeof template01Config;
