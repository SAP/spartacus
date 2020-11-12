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
          'basesites?fields=DEFAULT,baseSites(defaultPreviewCatalogId,defaultPreviewCategoryCode,defaultPreviewProductCode,urlEncodingAttributes)',
      },
    },
  },
};
