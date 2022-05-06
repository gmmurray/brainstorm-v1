import { Template } from 'webpack';
import { TemplateFieldTypes } from '../types/templateFields';
import { mockUser } from './users';

export const mockTemplate1: Template = {
  id: '123',
  userId: mockUser.sub,
  name: 'test template',
  fields: [
    {
      name: 'field1',
      type: TemplateFieldTypes.STRING,
    },
  ],
};
