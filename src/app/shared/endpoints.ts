import { environment } from '../../environments/environment';

export const Endpoint = {
  STUDENT: {
    CREATE: environment.api.base + 'students/create',
    ALL: environment.api.base + 'students',
    COUNT: environment.api.base + 'students/count',
    UPDATE: environment.api.base + 'students/update',
    DELETE: environment.api.base + 'students/delete',
    ASSIGN: environment.api.base + 'students/assign',
  },
  COURSE: {
    CREATE: environment.api.base + 'courses/create',
    ALL: environment.api.base + 'courses',
    UPDATE: environment.api.base + 'courses/update',
    DELETE: environment.api.base + 'courses/delete',
  },
};
