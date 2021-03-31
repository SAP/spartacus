import { FileValidityConfig } from './file-validity-config';

export const defaultFileValidityConfig: FileValidityConfig = {
  fileValidity: {
    maxSize: 1,
    allowedExtensions: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ],
    checkEmptyFile: true,
  },
};
