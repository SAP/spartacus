/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductScope } from '../../../product/model/product-scope';
import { OccConfig } from '../../config/occ-config';

export const defaultOccProductConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          default:
            'products/${productCode}?fields=DEFAULT,averageRating,images(FULL),classifications,manufacturer,numberOfReviews,categories(FULL),baseOptions,baseProduct,variantOptions,variantType',
          list: 'products/${productCode}?fields=code,purchasable,name,summary,price(formattedValue),images(DEFAULT,galleryIndex),baseProduct',
          details:
            'products/${productCode}?fields=averageRating,description,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,tags,images(FULL)',
          promotions:
            'products/${productCode}?fields=potentialPromotions(description)',
          attributes: 'products/${productCode}?fields=classifications',
          price: 'products/${productCode}?fields=price(formattedValue)',
          stock: 'spike-new-availability-api',
          list_item:
            'products/${productCode}?fields=code,name,price(formattedValue),images(DEFAULT),baseProduct',
        },

        productReviews: 'products/${productCode}/reviews',
        // Uncomment this when occ gets configured
        // productReferences:
        //   'products/${productCode}/references?fields=DEFAULT,references(target(images(FULL)))&referenceType=${referenceType}',
        productReferences:
          'products/${productCode}/references?fields=DEFAULT,references(target(images(FULL)))',
        /* eslint-disable max-len */
        productSearch: {
          default:
            'products/search?fields=products(code,name,summary,configurable,configuratorType,multidimensional,price(FULL),images(DEFAULT),stock(FULL),averageRating,variantOptions,baseProduct,priceRange(maxPrice(formattedValue),minPrice(formattedValue))),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT),freeTextSearch,currentQuery,keywordRedirectUrl',
          carousel:
            'products/search?fields=products(code,purchasable,name,summary,price(formattedValue),stock(DEFAULT),images(DEFAULT,galleryIndex),baseProduct)',
          carouselMinimal:
            'products/search?fields=products(code,name,price(formattedValue),images(DEFAULT),baseProduct)',
        },
        /* eslint-enable */
        productSuggestions: 'products/suggestions',
      },
    },
    loadingScopes: {
      product: {
        details: {
          include: [
            ProductScope.LIST,
            ProductScope.VARIANTS,
            ProductScope.STOCK,
          ],
        },
      },
    },
  },
};
