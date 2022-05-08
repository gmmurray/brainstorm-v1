import { MockTemplateService, mockTemplate1 } from '../../mock/templates';
import { Request, Response } from 'express';

import { ReasonPhrases } from 'http-status-codes';
import { TemplateHandlers } from './templatesHandlers';
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

let templatesController: TemplateHandlers;
let mockService: MockTemplateService;
beforeAll(() => {
  mockService = new MockTemplateService();
  templatesController = new TemplateHandlers(mockService);
});

describe('templates controller', () => {
  it('renders templates view', async () => {
    const serviceResponse = await mockService.findByUserId(mockUser.sub);
    const mockedService = jest.spyOn(mockService, 'findByUserId');
    await templatesController.templatesView(baseRequest, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub);
    expect(pageWithData).toBeCalledWith(
      baseRequest,
      baseResponse,
      pageNames.viewTemplates,
      mockUser,
      { templates: serviceResponse },
      '/templates',
    );
  });

  it('renders create view', async () => {
    await templatesController.createView(baseRequest, baseResponse);
    expect(pageWithData).toBeCalledWith(
      baseRequest,
      baseResponse,
      pageNames.createTemplate,
      mockUser,
      undefined,
      '/templates',
    );
  });

  it('performs create operation', async () => {
    const mockedService = jest.spyOn(mockService, 'create');
    const res = await templatesController.createOperation(
      { ...baseRequest, body: mockTemplate1 } as Request,
      baseResponse,
    );

    expect(mockedService).toBeCalledWith(mockUser.sub, mockTemplate1);
    expect(res).toStrictEqual({ templateId: mockTemplate1.id });
  });

  it('renders update view', async () => {
    const mockedService = jest.spyOn(mockService, 'findById');

    const request = {
      ...baseRequest,
      query: { templateId: mockTemplate1.id },
    } as any as Request;
    await templatesController.updateView(request, baseResponse);

    expect(mockedService).toBeCalledWith(mockUser.sub, mockTemplate1.id);
    expect(pageWithData).toBeCalledWith(
      request,
      baseResponse,
      pageNames.updateTemplate,
      mockUser,
      { template: mockTemplate1 },
      '/templates',
    );
  });

  it('performs update operation', async () => {
    const mockedService = jest.spyOn(mockService, 'update');
    const request = { ...baseRequest, body: mockTemplate1 } as any as Request;
    const res = await templatesController.updateOperation(
      request,
      baseResponse,
    );

    expect(mockedService).toBeCalledWith(mockUser.sub, mockTemplate1);
    expect(res).toBe(ReasonPhrases.OK);
  });

  it('performs delete operation', async () => {
    const mockedService = jest.spyOn(mockService, 'delete');
    const request = {
      ...baseRequest,
      query: { templateId: mockTemplate1.id },
    } as any as Request;
    const res = await templatesController.deleteOperation(
      request,
      baseResponse,
    );

    expect(mockedService).toBeCalledWith(mockUser.sub, mockTemplate1.id);
    expect(res).toBe(ReasonPhrases.NO_CONTENT);
  });
});
