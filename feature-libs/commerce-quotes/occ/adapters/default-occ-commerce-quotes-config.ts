import { OccConfig } from '@spartacus/core';

export const defaultOccCommerceQuotesConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getQuotes: '/users/$${userId}/quotes',
        createQuote: '/users/${userId}/quotes',
        getQuote: '/users/${userId}/quotes/${quoteCode}',
        editQuote: '/users/${userId}/quotes/${quoteCode}',
        performActionQuote: '/users/${userId}/quotes/${quoteCode}/action',
        addComment: '/users/${userId}/quotes/${quoteCode}/comments',
        addDicount: '/users/${userId}/quotes/${quoteCode}/discounts',
        addCartEntryComment: '/users/${userId}/quotes/${quoteCode}/entries/${entryNumber}/comments'
      },
    },
  },
};
