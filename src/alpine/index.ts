import { HomePageData, initHomePage } from './home';
import {
  UpdateTemplatePageData,
  initUpdateTemplatePage,
} from './templates/updateTemplate';
import {
  ViewTemplatesPageData,
  initViewTemplatesPage,
} from './templates/viewTemplates';

import Alpine from 'alpinejs';
import { AuthenticatedPageData } from '../types/pageData';
import { initCreateTemplatePage } from './templates/createTemplate';
import { pageNames } from '../constants/pageNames';

declare global {
  interface Window {
    Alpine?: typeof Alpine;
    initStore: (data: Record<string, any>, name: string) => object;
  }
}

export const initStore = (data: Record<string, any>, name: string) => {
  switch (name) {
    case pageNames.home:
      return initHomePage(data as HomePageData);
    case pageNames.viewTemplates:
      return initViewTemplatesPage(data as ViewTemplatesPageData);
    case pageNames.createTemplate:
      return initCreateTemplatePage(data as AuthenticatedPageData);
    case pageNames.updateTemplate:
      return initUpdateTemplatePage(data as UpdateTemplatePageData);
    default:
      return {};
  }
};
export const initClientApp = () => {
  window.initStore = initStore;
  window.Alpine = Alpine;
};

initClientApp();
