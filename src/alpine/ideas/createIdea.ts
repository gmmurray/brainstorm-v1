import { IIdea, IIdeaField } from '../../models/idea';

import { AuthUser } from '../../types/user';
import { AuthenticatedPageData } from '../../types/pageData';
import { Template } from '../../models/template';
import axios from 'axios';

export const createIdeaPageStoreDefault = {
  templates: [],
  selectedTemplate: undefined,
  fields: [],
  message: '',
  name: '',
  validationMessage: 'validation error',
  loading: false,
  createError: 'Error creating idea',
};

export const initCreateIdeaPage = (pageData?: CreateIdeaPageData): Result => {
  if (!pageData || !pageData.user) return {};

  return {
    user: pageData.user,
    templates: pageData.templates,
    name: createIdeaPageStoreDefault.name,
    selectedTemplate: createIdeaPageStoreDefault.selectedTemplate,
    fields: createIdeaPageStoreDefault.fields,
    message: createIdeaPageStoreDefault.message,
    loading: createIdeaPageStoreDefault.loading,
    handleSelectTemplate(index?: number) {
      if (index !== undefined) {
        if (!(this.templates as Template[])[index]) {
          this.fields = [];
          this.selectedTemplate = undefined;
          return;
        }
        this.fields = (this.templates as Template[])[index].fields.map(f => ({
          name: f.name,
          type: f.type,
          value: undefined,
        }));
      } else {
        this.fields = [];
      }
    },
    async handleCreate() {
      if (
        !isFormValid(
          this.templates as Template[],
          this.selectedTemplate,
          this.name,
        )
      ) {
        this.message = createIdeaPageStoreDefault.validationMessage;
        return;
      }

      this.loading = true;
      const ideaTemplate = (this.templates as Template[])[
        this.selectedTemplate as number
      ];
      const idea: IIdea = {
        userId: (this.user as AuthUser).sub as string,
        template: ideaTemplate.id,
        fields: this.fields as IIdeaField[],
        name: this.name as string,
      };

      const result = await axios.post('/ideas/create', idea);

      if (result?.data?.ideaId) {
        window.location.replace(`/ideas/view?ideaId=${result.data.ideaId}`);
      } else {
        this.loading = false;
        this.message =
          result?.data?.message ?? createIdeaPageStoreDefault.createError;
      }
    },
  };
};

export interface CreateIdeaPageData extends AuthenticatedPageData {
  templates: Template[];
}

interface Result {
  user?: AuthUser;
  templates?: Template[];
  name?: string;
  selectedTemplate?: number;
  fields?: IIdeaField[];
  message?: string;
  loading?: boolean;
  handleSelectTemplate?: (index?: number) => void;
  handleCreate?: () => Promise<void>;
}

const isFormValid = (
  templates: Template[],
  selectedTemplate?: number,
  name?: string,
) =>
  selectedTemplate !== undefined &&
  templates[selectedTemplate] !== undefined &&
  name &&
  name.length > 0;
