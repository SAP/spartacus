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
      fileName: 'cart',
      maxLines: 1000,
    },
  },
};
