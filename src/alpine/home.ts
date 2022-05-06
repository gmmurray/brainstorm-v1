import { AuthenticatedPageData } from '../types/pageData';
import { Template } from '../models/template';

export const initHomePage = (pageData?: HomePageData) => {
  if (!pageData) return {};
  return {
    user: pageData.user,
    ideas: pageData.ideas,
    templates: pageData.templates,
  };
};

export interface HomePageData extends AuthenticatedPageData {
  ideas: { name: string; template: string }[];
  templates: Template[];
}
