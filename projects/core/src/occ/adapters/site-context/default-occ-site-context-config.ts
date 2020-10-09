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
        basesites:
          'basesites?fields=DEFAULT,baseSites(defaultPreviewCategoryCode,defaultPreviewProductCode)',
      },
    },
  },
};
