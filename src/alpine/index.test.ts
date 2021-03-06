/**
 * @jest-environment jsdom
 */
jest.mock('./home');
jest.mock('./templates/viewTemplates');
jest.mock('./templates/createTemplate');
jest.mock('./templates/updateTemplate');
jest.mock('./ideas/createIdea');
jest.mock('./ideas/viewIdeas');
jest.mock('./ideas/updateIdea');

import { initClientApp, initStore } from '.';

import { initCreateIdeaPage } from './ideas/createIdea';
import { initCreateTemplatePage } from './templates/createTemplate';
import { initHomePage } from './home';
import { initUpdateIdeaPage } from './ideas/updateIdea';
import { initUpdateTemplatePage } from './templates/updateTemplate';
import { initViewIdeasPage } from './ideas/viewIdeas';
import { initViewTemplatesPage } from './templates/viewTemplates';
import { pageNames } from '../constants/pageNames';

jest.mock('./home');

describe('scripts entrypoint', () => {
  test('adds Alpine to window', () => {
    initClientApp();
    expect(window.Alpine).toBeTruthy();
  });
  test('adds initStore to window', () => {
    initClientApp();
    expect(window.initStore).toBe(initStore);
  });
});

describe('store initialization', () => {
  test('empty object for unimplemented page', () => {
    expect(initStore({}, '')).toStrictEqual({});
  });
  test('initializes home store', () => {
    const input = {};
    initStore(input, pageNames.home);
    expect(initHomePage).toBeCalledTimes(1);
    expect(initHomePage).toBeCalledWith(input);
  });
  test('initializes viewTemplates store', () => {
    const input = {};
    initStore(input, pageNames.viewTemplates);
    expect(initViewTemplatesPage).toBeCalledTimes(1);
    expect(initViewTemplatesPage).toBeCalledWith(input);
  });
  test('initializes createTemplates store', () => {
    const input = {};
    initStore(input, pageNames.createTemplate);
    expect(initCreateTemplatePage).toBeCalledTimes(1);
    expect(initCreateTemplatePage).toBeCalledWith(input);
  });
  test('initializes updateTemplate store', () => {
    const input = {};
    initStore(input, pageNames.updateTemplate);
    expect(initUpdateTemplatePage).toBeCalledTimes(1);
    expect(initUpdateTemplatePage).toBeCalledWith(input);
  });
  test('initializes createIdea store', () => {
    const input = {};
    initStore(input, pageNames.createIdea);
    expect(initCreateIdeaPage).toBeCalledTimes(1);
    expect(initCreateIdeaPage).toBeCalledWith(input);
  });
  test('initializes viewIdeas store', () => {
    const input = {};
    initStore(input, pageNames.viewIdeas);
    expect(initViewIdeasPage).toBeCalledTimes(1);
    expect(initViewIdeasPage).toBeCalledWith(input);
  });
  test('initializes updateIdea store', () => {
    const input = {};
    initStore(input, pageNames.updateIdea);
    expect(initUpdateIdeaPage).toBeCalledTimes(1);
    expect(initUpdateIdeaPage).toBeCalledWith(input);
  });
});
