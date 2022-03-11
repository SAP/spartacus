import { QuickOrderConfig } from './quick-order-config';

export const defaultQuickOrderConfig: QuickOrderConfig = {
  quickOrder: {
    searchForm: {
      displayProductImages: true,
      maxProducts: 5,
      minCharactersBeforeRequest: 3,
    },
    list: {
      hardDeleteTimeout: 7000,
    },
  },
};
