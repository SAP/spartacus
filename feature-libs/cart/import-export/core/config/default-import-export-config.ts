import { OrderEntriesSource } from '@spartacus/storefront';
import { CartNameSource } from '../model/import-entries.config';
import { ImportExportConfig } from './import-export-config';

export const defaultImportExportConfig: ImportExportConfig = {
  cartImportExport: {
    file: {
      separator: ',',
    },
    import: {
      fileValidity: {
        maxSize: 1,
        maxEntries: {
          [OrderEntriesSource.NEW_SAVED_CART]: 100,
          [OrderEntriesSource.SAVED_CART]: 100,
          [OrderEntriesSource.ACTIVE_CART]: 10,
          [OrderEntriesSource.QUICK_ORDER]: 10,
        },
        allowedTypes: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv',
          '.csv',
        ],
      },
      cartNameGeneration: {
        source: CartNameSource.FILE_NAME,
      },
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
      maxEntries: 1000,
      fileOptions: {
        fileName: 'cart',
        extension: 'csv',
        type: 'text/csv',
      },
    },
  },
};
