import { AuthenticatedPageData } from '../../types/pageData';
import { Template } from '../../models/template';

export const createIdeaPageStoreDefault = {
  templates: [],
  selectedTemplate: null,
  fields: [],
  message: '',
  validationMessage: '',
  loading: false,
};

export const initCreateIdeaPage = (pageData?: CreateIdeaPageData) => {
  if (!pageData || !pageData.user) return {};

  return {
    user: pageData.user,
    templates: createIdeaPageStoreDefault.templates,
    selectedTemplate: createIdeaPageStoreDefault.selectedTemplate,
    fields: createIdeaPageStoreDefault.fields,
    message: createIdeaPageStoreDefault.message,
    loading: createIdeaPageStoreDefault.loading,
  };
};

export interface CreateIdeaPageData extends AuthenticatedPageData {
  templates: Template[];
}
