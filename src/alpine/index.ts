import Alpine from 'alpinejs';
import { initHomePage } from './home';

declare global {
  interface Window {
    Alpine?: typeof Alpine;
    initStore: (data: any, name: string) => object;
  }
}

const initStore = (data: any, name: string) => {
  switch (name) {
    case 'home':
      return initHomePage(data);
    default:
      return {};
  }
};

window.initStore = initStore;
window.Alpine = Alpine;
