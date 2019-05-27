import { PersonalizationConfig } from './personalization-config';

export const defaultPersonalizationConfig: PersonalizationConfig = {
  personalization: {
    enabled: true,
    httpHeaderName: {
      id: 'Occ-Personalization-Id',
      timestamp: 'Occ-Personalization-Time',
    },
  },
};
