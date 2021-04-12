import { ImportExportConfig } from './import-export-config';

// TODO: Avoid using duplicated config #11931
export const defaultImportExportConfig: ImportExportConfig = {
  fileValidity: {
    maxSize: 1,
    allowedExtensions: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ],
    checkEmptyFile: true,
  },
  file: {
    separator: ',',
  },
};
