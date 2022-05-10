import { AuthenticatedPageData } from '../../types/pageData';
import { Idea } from '../../models/idea';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';

export const updateIdeaPageStoreDefault = {
  loading: false,
  message: '',
  validationMessage: 'validation error',
  updateError: 'error updating idea',
  deleteError: 'error deleting idea',
};

export const initUpdateIdeaPage = (pageData?: UpdateIdeaPageData) => {
  if (!pageData) return {};

  return {
    user: pageData.user,
    idea: pageData.idea,
    loading: updateIdeaPageStoreDefault.loading,
    message: updateIdeaPageStoreDefault.message,
    async handleUpdate() {
      if (!isFormValid(this.idea.name)) {
        this.message = updateIdeaPageStoreDefault.validationMessage;
        return;
      }
      this.loading = true;
      const result = await axios.post('/ideas/update', {
        ...this.idea,
      });
      if (result?.status === StatusCodes.OK) {
        window.location.reload();
      } else {
        this.loading = false;
        this.message =
          result?.data?.message ?? updateIdeaPageStoreDefault.updateError;
      }
    },
    async handleDelete() {
      this.loading = true;

      const result = await axios.delete(`/ideas?ideaId=${this.idea.id}`);

      if (result?.status === StatusCodes.NO_CONTENT) {
        window.location.replace('/ideas');
      } else {
        this.loading = false;
        this.message =
          result?.data?.message ?? updateIdeaPageStoreDefault.deleteError;
      }
    },
  };
};

export interface UpdateIdeaPageData extends AuthenticatedPageData {
  idea: Idea;
}

const isFormValid = (name?: string) => name && name.length;
