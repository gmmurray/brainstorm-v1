jest.mock('../models/template.ts');

import { TemplateModel } from '../models/template';
import { TemplateService } from './templateService';
import { mockTemplate1 } from '../mock/templates';
import { mockUser } from '../mock/users';

const mockedTemplateModel = TemplateModel as jest.Mocked<typeof TemplateModel>;
const templateService = new TemplateService(mockedTemplateModel);

describe('template service', () => {
  it('finds by id', async () => {
    // TODO: setup mongoose mongodb memory, set node_env in .env
    //mockedTemplateModel.findOne.mockImplementation(() => );
    const result = await templateService.findById(
      mockUser.sub,
      mockTemplate1.id,
    );

    expect(mockedTemplateModel.findOne).toBeCalledTimes(1);
    expect(mockedTemplateModel.findOne).toBeCalledWith({
      $and: [{ _id: mockTemplate1.id }, { userId: mockUser.sub }],
    });
  });
});
