import { Request, Response } from 'express';

export const landing = async (req: Request, res: Response) => {
  res.render('landing');
};
