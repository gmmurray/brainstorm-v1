import { AuthenticatedPageData } from '../../types/pageData';
import { Idea } from '../../models/idea';

export const initViewIdeasPage = (pageData?: ViewIdeasPageData) => {
  if (!pageData) return {};

  return {
    user: pageData.user,
    ideas: pageData.ideas,
    searchTerm: '',
    visibleIdeas: pageData.ideas,
    handleSearch() {
      let result: Idea[];
      if (this.searchTerm === '') {
        result = this.ideas;
      } else {
        result = this.ideas.filter(idea =>
          idea.name
            .toLocaleLowerCase()
            .includes(this.searchTerm.toLocaleLowerCase()),
        );
      }
      this.visibleIdeas = result;
    },
    handleReset() {
      this.searchTerm = '';
    },
  };
};

export interface ViewIdeasPageData extends AuthenticatedPageData {
  ideas: Idea[];
}
