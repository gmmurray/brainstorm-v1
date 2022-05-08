import { Idea } from '../../models/idea';

export interface IIdeaService {
  findById: (userId: string, ideaId: string) => Promise<Idea | null>;
  findByUserId: (userId: string) => Promise<Idea[]>;
  findByTemplateId: (userId: string, templateId: string) => Promise<Idea[]>;
  create: (userId: string, idea: Partial<Idea>) => Promise<Idea>;
  update: (userId: string, idea: Idea) => Promise<void>;
  delete: (userId: string, ideaId: string) => Promise<void>;
}
