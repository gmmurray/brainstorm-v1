import { MockIdeaService, mockIdea } from '../../mock/mockIdeas';
import { MockTemplateService, mockTemplate1 } from '../../mock/templates';
import { Request, Response } from 'express';

import { HomeHandler } from './homeHandler';
import { IIdeaService } from '../../types/services/IIdeaService';
import { ITemplateService } from '../../types/services/ITemplateService';
import { mockUser } from '../../mock/users';
import { pageNames } from '../../constants/pageNames';
import { pageWithData } from '../shared/pageWithData';

jest.mock('../shared/pageWithData');

const baseRequest = {
  oidc: {
    user: mockUser,
    isAuthenticated: () => true,
  },
} as any as Request;

const baseResponse = {
  status: () => baseResponse,
  json: (params: any) => params,
  send: (params: any) => params,
} as any as Response;

let homeController: HomeHandler;
let mockTemplateService: ITemplateService;
let mockIdeaService: IIdeaService;

beforeAll(() => {
  mockTemplateService = new MockTemplateService();
  mockIdeaService = new MockIdeaService();
  homeController = new HomeHandler(mockTemplateService, mockIdeaService);
});

describe('home controller', () => {
  it('renders home view', async () => {
    const serviceResponses = await Promise.all([
      mockTemplateService.findRecent(mockUser.sub),
      mockIdeaService.findRecent(mockUser.sub),
    ]);
    const mockedTemplateServiceCall = jest.spyOn(
      mockTemplateService,
      'findRecent',
    );
    const mockedIdeaServiceCall = jest.spyOn(mockIdeaService, 'findRecent');

    await homeController.view(baseRequest, baseResponse);

    expect(mockedTemplateServiceCall).toBeCalledWith(mockTemplate1.userId);
    expect(mockedIdeaServiceCall).toBeCalledWith(mockIdea.userId);
    expect(pageWithData).toBeCalledWith(
      baseRequest,
      baseResponse,
      pageNames.home,
      mockUser,
      { templates: serviceResponses[0], ideas: serviceResponses[1] },
    );
  });
});
