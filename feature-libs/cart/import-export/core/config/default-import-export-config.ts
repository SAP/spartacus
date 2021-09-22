import { NameSource } from '../model/import-to-cart.model';
import { ImportExportConfig } from './import-export-config';

export const defaultImportExportConfig: ImportExportConfig = {
  cartImportExport: {
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
      ],
      messageEnabled: true,
      downloadDelay: 1000,
      fileOptions: {
        fileName: 'cart',
        extension: 'csv',
        type: 'text/csv;charset=utf-8;',
      },
    },
    import: {
      fileValidity: {
        maxSize: 1,
        maxLines: 100,
        allowedExtensions: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv',
          '.csv',
        ],
      },
      cartNameGeneration: {
        source: NameSource.FILE_NAME,
      },
    },
  },
};
