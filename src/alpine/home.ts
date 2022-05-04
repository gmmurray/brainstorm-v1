import { IAuthUser } from 'types/user';

export const initHomePage = (pageData?: HomePageData) => {
  if (!pageData) return {};
  return {
    user: pageData.user,
    ideas: pageData.ideas,
    templates: pageData.templates,
    test() {
      alert('test');
    },
  };
};

interface HomePageData {
  user: IAuthUser;
  ideas: { name: string; template: string }[];
  templates: { id: number; name: string; fields: string[] }[];
}
