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
  validationMessage: 'validation error',
  loading: false,
};

export const initCreateIdeaPage = (pageData?: CreateIdeaPageData): Result => {
  if (!pageData || !pageData.user) return {};

  return {
    user: pageData.user,
    templates: pageData.templates,
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
      if (!isFormValid(this.templates as Template[], this.selectedTemplate)) {
        console.log('here');
        this.message = createIdeaPageStoreDefault.validationMessage;
        console.log(this.message);
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
      };

      const result = await axios.post('/ideas/create', idea);

      if (result?.data?.ideaId) {
        window.location.replace(`/ideas/view?ideaId=${result.data.ideaId}`);
      } else {
        this.loading = false;
        this.message = result?.data?.message ?? 'Error creating idea';
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
  selectedTemplate?: number;
  fields?: IIdeaField[];
  message?: string;
  loading?: boolean;
  handleSelectTemplate?: (index?: number) => void;
  handleCreate?: () => Promise<void>;
}

const isFormValid = (templates: Template[], selectedTemplate?: number) =>
  selectedTemplate !== undefined && templates[selectedTemplate] !== undefined;
