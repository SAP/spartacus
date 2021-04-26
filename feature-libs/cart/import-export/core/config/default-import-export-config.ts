import { ImportExportConfig } from './import-export-config';

// TODO: Avoid using duplicated config #11931
export const defaultImportExportConfig: ImportExportConfig = {
  importExport: {
    fileValidity: {
      maxSize: 1,
      allowedExtensions: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv',
        '.csv',
      ],
      checkEmptyFile: true,
    },
    file: {
      separator: ',',
    },
    export: {
      additionalColumns: [
        {
          name: {
            key: 'name',
          },
          value: 'product.name',
        },
        {
          name: {
            key: 'price',
          },
          value: 'totalPrice.formattedValue',
        },
        {
          name: {
            key: 'description',
          },
          value: 'product.description',
        },
      ],
    },
  },
};
