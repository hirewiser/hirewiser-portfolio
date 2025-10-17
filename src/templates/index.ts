/**
 * Template Registry
 * 
 * Central registry for all portfolio templates. This file manages template
 * selection and provides a fallback mechanism for invalid template IDs.
 */

import Template01 from './template-01';
import { template01Config } from './template-01/config';

/**
 * Template interface defining the structure of a template entry
 */
export interface Template {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  config: typeof template01Config;
}

/**
 * Registry of all available templates
 * 
 * Add new templates here by importing them and adding to this object.
 * The key should match the template ID from the config.
 */
export const TEMPLATES: Record<string, Template> = {
  'template-01': {
    id: 'template-01',
    name: 'Classic Portfolio',
    component: Template01,
    config: template01Config,
  },
  // Add more templates here as they are created
  // 'template-02': {
  //   id: 'template-02',
  //   name: 'Minimal Portfolio',
  //   component: Template02,
  //   config: template02Config,
  // },
};

/**
 * Get a template by ID
 * 
 * @param templateId - The ID of the template to retrieve
 * @returns The template object containing component and config, or undefined if not found
 * 
 * @example
 * const template = getTemplate('template-02');
 * if (template) {
 *   const TemplateComponent = template.component;
 * }
 */
export function getTemplate(templateId?: string): Template | undefined {
  // If no template ID provided, return undefined
  if (!templateId) {
    return undefined;
  }

  // Return requested template or undefined if not found
  return TEMPLATES[templateId];
}

/**
 * Get list of all available template IDs
 * 
 * @returns Array of template IDs
 */
export function getAvailableTemplateIds(): string[] {
  return Object.keys(TEMPLATES);
}

/**
 * Check if a template ID exists
 * 
 * @param templateId - The template ID to check
 * @returns True if template exists, false otherwise
 */
export function templateExists(templateId: string): boolean {
  return templateId in TEMPLATES;
}

/**
 * Get all templates with their metadata
 * 
 * @returns Array of template objects
 */
export function getAllTemplates(): Template[] {
  return Object.values(TEMPLATES);
}
