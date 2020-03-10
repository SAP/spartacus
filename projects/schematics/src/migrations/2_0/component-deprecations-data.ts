import { CONSENT_MANAGEMENT_FORM_COMPONENT } from '../../shared/constants';
import { ComponentData } from '../../shared/utils/file-utils';

export const COMPONENT_DEPRECATION_DATA: ComponentData[] = [
  {
    selector: 'cx-consent-management-form',
    componentClassName: CONSENT_MANAGEMENT_FORM_COMPONENT,
    removedProperties: [
      { name: 'isLevel13', comment: `'isLevel13' property has been removed.` },
    ],
  },
];
