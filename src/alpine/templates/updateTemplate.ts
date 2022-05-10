import { ITemplateField, TemplateFieldTypes } from '../../types/templateFields';

import { AuthenticatedPageData } from '../../types/pageData';
import { StatusCodes } from 'http-status-codes';
import { Template } from '../../models/template';
import axios from 'axios';

export const updateTemplatePageStoreDefault = {
  loading: false,
  message: '',
  newField: {
    name: '',
    type: TemplateFieldTypes.STRING,
  },
  fieldTypeOptions: Object.values(TemplateFieldTypes),
  validationMessage: 'validation error',
  updateError: 'Error updating template',
  deleteError: 'Error deleting template',
};

export const initUpdateTemplatePage = (pageData?: UpdateTemplatePageData) => {
  if (!pageData) return {};

  return {
    user: pageData.user,
    template: pageData.template,
    loading: updateTemplatePageStoreDefault.loading,
    message: updateTemplatePageStoreDefault.message,
    newField: { ...updateTemplatePageStoreDefault.newField },
    fieldTypeOptions: [...updateTemplatePageStoreDefault.fieldTypeOptions],
    async handleUpdate() {
      if (!isFormValid(this.template)) {
        this.message = updateTemplatePageStoreDefault.validationMessage;
        return;
      }
      this.loading = true;
      const result = await axios.post('/templates/update', {
        ...this.template,
      });
      if (result?.status === StatusCodes.OK) {
        window.location.reload();
      } else {
        this.loading = false;
        this.message =
          result?.data?.message ?? updateTemplatePageStoreDefault.updateError;
      }
    },
    async handleDelete() {
      this.loading = true;
      const result = await axios.delete(
        `/templates?templateId=${this.template.id}`,
      );
      if (result?.status === StatusCodes.NO_CONTENT) {
        window.location.replace('/templates');
      } else {
        this.loading = false;
        this.message =
          result?.data?.message ?? updateTemplatePageStoreDefault.deleteError;
      }
    },
    handleAddField() {
      if (this.newField && this.newField.name === '') return;
      const result = [
        ...this.template.fields,
        { ...this.newField },
      ] as ITemplateField[];
      this.template.fields = result;
      this.newField = { ...updateTemplatePageStoreDefault.newField };
    },
    handleRemoveField(index: number) {
      const result = this.template.fields.filter((_, i) => i !== index);
      this.template.fields = [...result];
    },
  };
};

export interface UpdateTemplatePageData extends AuthenticatedPageData {
  template: Template;
}

const isFormValid = (template: Template) => template.name !== '';
