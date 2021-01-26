import { PersonalizationConfig } from './personalization-config';

/**
 * @deprecated since 3.2, use personalization lib instead
 */
export const defaultPersonalizationConfig: PersonalizationConfig = {
  personalization: {
    enabled: false,
    httpHeaderName: {
      id: 'Occ-Personalization-Id',
      timestamp: 'Occ-Personalization-Time',
    },
    context: {
      slotPosition: 'PlaceholderContentSlot',
      componentId: 'PersonalizationScriptComponent',
    },
  },
};
