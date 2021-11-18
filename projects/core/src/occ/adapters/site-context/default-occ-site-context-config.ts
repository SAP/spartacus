import { OccConfig } from '../../config/occ-config';

export const defaultOccSiteContextConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        languages: 'languages',
        currencies: 'currencies',
        countries: 'countries',
        regions:
          'countries/${isoCode}/regions?fields=regions(name,isocode,isocodeShort)',
        baseSites:
          'basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies(isocode),defaultCurrency(isocode),languages(isocode),defaultLanguage(isocode)),theme,defaultPreviewCatalogId,defaultPreviewCategoryCode,defaultPreviewProductCode)',
      },
    },
  },
};
