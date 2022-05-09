import { Idea } from '../../models/idea';
import { AuthenticatedPageData } from '../../types/pageData';

export const initViewIdeasPage = (pageData?: ViewIdeasPageData) => {
  if (!pageData) return {};

  return {
    user: pageData.user,
    ideas: pageData.ideas,
  };
};

export interface ViewIdeasPageData extends AuthenticatedPageData {
  ideas: Idea[];
}
