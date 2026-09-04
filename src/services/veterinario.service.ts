
import { prisma } from '../config/prisma';

import { AppError } from '../middlewares/error.middleware';

interface VeterinarioInput {
  nome: string;
  email: string;
  senha: string;
}
