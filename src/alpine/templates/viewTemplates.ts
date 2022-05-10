import { AuthenticatedPageData } from '../../types/pageData';
import { Template } from '../../models/template';

export const initViewTemplatesPage = (pageData?: ViewTemplatesPageData) => {
  if (!pageData) return {};

  return {
    user: pageData.user,
    templates: pageData.templates,
    searchTerm: '',
    visibleTemplates: pageData.templates,
    handleSearch() {
      let result: Template[];
      if (this.searchTerm === '') {
        result = this.templates;
      } else {
        result = this.templates.filter(template =>
          template.name
            .toLocaleLowerCase()
            .includes(this.searchTerm.toLocaleLowerCase()),
        );
      }
      this.visibleTemplates = result;
    },
    handleReset() {
      this.searchTerm = '';
    },
  };
};

export interface ViewTemplatesPageData extends AuthenticatedPageData {
  templates: Template[];
}
