import { AuthenticatedPageData } from '../types/pageData';
import { Template } from '../models/template';

export const initViewTemplatesPage = (pageData?: ViewTemplatesPageData) => {
  if (!pageData) return {};

  return {
    user: pageData.user,
    templates: pageData.templates,
  };
};

export interface ViewTemplatesPageData extends AuthenticatedPageData {
  templates: Template[];
}
