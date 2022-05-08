import { MockIdeaService, mockIdea } from '../../mock/mockIdeas';
import { MockTemplateService, mockTemplate1 } from '../../mock/templates';
import { Request, Response } from 'express';

import { IdeasHandlers } from './ideasHandler';
import { ReasonPhrases } from 'http-status-codes';
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

let ideasController: IdeasHandlers;
let mockIdeaService: MockIdeaService;
let mockTemplateService: MockTemplateService;

beforeAll(() => {
  mockIdeaService = new MockIdeaService();
  mockTemplateService = new MockTemplateService();
  ideasController = new IdeasHandlers(mockIdeaService, mockTemplateService);
});

describe('ideas controller', () => {
  it('renders ideas view', async () => {
    const serviceResponse = await mockIdeaService.findByUserId(mockUser.sub);
    const mockedService = jest.spyOn(mockIdeaService, 'findByUserId');
    await ideasController.ideasView(baseRequest, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub);
    expect(pageWithData).toBeCalledWith(
      baseRequest,
      baseResponse,
      pageNames.viewIdeas,
      mockUser,
      { ideas: serviceResponse },
      '/ideas',
    );
  });

  it('renders ideas view with template query', async () => {
    const serviceResponse = await mockIdeaService.findByTemplateId(
      mockUser.sub,
      mockTemplate1.id,
    );
    const mockedService = jest.spyOn(mockIdeaService, 'findByTemplateId');
    const request = {
      ...baseRequest,
      query: { templateId: mockTemplate1.id },
    } as any as Request;
    await ideasController.ideasView(request, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub, mockTemplate1.id);
    expect(pageWithData).toBeCalledWith(
      request,
      baseResponse,
      pageNames.viewIdeas,
      mockUser,
      { ideas: serviceResponse, templateId: mockTemplate1.id },
      '/ideas',
    );
  });

  it('renders create view', async () => {
    const serviceResponse = await mockTemplateService.findByUserId(
      mockUser.sub,
    );
    const mockedService = jest.spyOn(mockTemplateService, 'findByUserId');
    await ideasController.createView(baseRequest, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub);
    expect(pageWithData).toBeCalledWith(
      baseRequest,
      baseResponse,
      pageNames.createIdea,
      mockUser,
      { templates: serviceResponse },
      '/ideas',
    );
  });

  it('performs create operation', async () => {
    const mockedService = jest.spyOn(mockIdeaService, 'create');
    const request = { ...baseRequest, body: mockIdea } as Request;

    const res = await ideasController.createOperation(request, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub, mockIdea);
    expect(res).toStrictEqual({ ideaId: mockIdea.id });
  });

  it('renders update view', async () => {
    const mockedService = jest.spyOn(mockIdeaService, 'findById');

    const request = {
      ...baseRequest,
      query: { ideaId: mockIdea.id },
    } as any as Request;
    await ideasController.updateView(request, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub, mockIdea.id);
    expect(pageWithData).toBeCalledWith(
      request,
      baseResponse,
      pageNames.updateIdea,
      mockUser,
      { idea: mockIdea },
      '/ideas',
    );
  });

  it('performs update operation', async () => {
    const mockedService = jest.spyOn(mockIdeaService, 'update');
    const request = { ...baseRequest, body: mockIdea } as any as Request;
    const res = await ideasController.updateOperation(request, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub, mockIdea);
    expect(res).toBe(ReasonPhrases.OK);
  });

  it('performs delete operation', async () => {
    const mockedService = jest.spyOn(mockIdeaService, 'delete');
    const request = {
      ...baseRequest,
      query: { ideaId: mockIdea.id },
    } as any as Request;

    const res = await ideasController.deleteOperation(request, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub, mockIdea.id);
    expect(res).toBe(ReasonPhrases.NO_CONTENT);
  });
});
