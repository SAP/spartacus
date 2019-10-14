import { OccConfig } from '../../../config/occ-config';

export const defaultOccCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        // tslint:disable:max-line-length

        createConfiguration:
          'products/${productCode}/configurator/cpqconfigurator',

        readConfiguration: 'configuration/${configId}/cpqconfigurator',

        updateConfiguration:
          'products/${productCode}/configurator/cpqconfigurator',

        // tslint:enable
      },
    },
  },
};
