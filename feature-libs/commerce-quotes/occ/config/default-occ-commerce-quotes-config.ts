import { OccConfig } from '@spartacus/core';

export const defaultOccCommerceQuotesConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getQuotes: 'users/${userId}/quotes?fields=FULL',
        createQuote: 'users/${userId}/quotes',
        getQuote:
          'users/${userId}/quotes/${quoteCode}?fields=FULL,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue)',
        editQuote: 'users/${userId}/quotes/${quoteCode}',
        performQuoteAction: 'users/${userId}/quotes/${quoteCode}/action',
        addComment: 'users/${userId}/quotes/${quoteCode}/comments',
        addDiscount: 'users/${userId}/quotes/${quoteCode}/discounts',
        addCartEntryComment:
          'users/${userId}/quotes/${quoteCode}/entries/${entryNumber}/comments',
      },
    },
  },
};
