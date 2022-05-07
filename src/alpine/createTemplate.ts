import { ITemplateField, TemplateFieldTypes } from '../types/templateFields';

import { AuthUser } from '../types/user';
import { AuthenticatedPageData } from '../types/pageData';
import axios from 'axios';

export const createTemplatePageStoreDefault = {
  name: '',
  fields: [],
  loading: false,
  message: '',
  newField: {
    name: '',
    type: TemplateFieldTypes.STRING,
  },
  fieldTypeOptions: Object.values(TemplateFieldTypes),
  validationMessage: 'validation error',
};

export const initCreateTemplatePage = (
  pageData?: AuthenticatedPageData,
): Result => {
  if (!pageData || !pageData.user) return {};

  return {
    user: pageData.user,
    name: createTemplatePageStoreDefault.name,
    fields: createTemplatePageStoreDefault.fields,
    loading: createTemplatePageStoreDefault.loading,
    message: createTemplatePageStoreDefault.message,
    newField: { ...createTemplatePageStoreDefault.newField },
    fieldTypeOptions: [...createTemplatePageStoreDefault.fieldTypeOptions],
    async handleCreate() {
      if (!isFormValid(this.name)) {
        this.message = createTemplatePageStoreDefault.validationMessage;
        return;
      }
      this.loading = true;
      const result = await axios.post('/templates/create', {
        name: this.name,
        userId: (this.user as AuthUser).sub,
        fields: this.fields,
      });
      this.loading = false;
      if (result?.data?.templateId) {
        window.location.replace(
          `/templates/view?templateId=${result.data.templateId}`,
        );
      } else {
        this.message = result?.data?.message ?? 'Error creating template';
      }
    },
    handleAddField() {
      if (this.newField && this.newField.name === '') return;
      const result = [
        ...(this.fields ?? []),
        { ...this.newField },
      ] as ITemplateField[];
      this.fields = result;
      this.newField = { ...createTemplatePageStoreDefault.newField };
    },
    handleRemoveField(index: number) {
      const result = (this.fields ?? []).filter((f, i) => i !== index);
      this.fields = [...result];
    },
  };
};

interface Result {
  user?: AuthUser;
  name?: string;
  fields?: ITemplateField[];
  loading?: boolean;
  message?: string;
  newField?: ITemplateField;
  fieldTypeOptions?: TemplateFieldTypes[];
  handleCreate?: () => Promise<void>;
  handleAddField?: () => void;
  handleRemoveField?: (index: number) => void;
}

const isFormValid = (name?: string) => name && name !== '';
