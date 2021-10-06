import { OccConfig } from '@spartacus/core';

export const defaultOccStoreFinderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        store: 'stores/${storeId}?fields=FULL',
        stores:
          'stores?fields=stores(name,displayName,formattedDistance,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email), features),pagination(DEFAULT),sorts(DEFAULT)',
        storescounts: 'stores/storescounts',
      },
    },
  },
};
