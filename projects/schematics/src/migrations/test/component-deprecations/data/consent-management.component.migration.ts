import { CONSENT_MANAGEMENT_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CONSENT_MANAGEMENT_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/myaccount/consent-management/components/consent-management.component.ts
  selector: 'cx-consent-management',
  componentClassName: CONSENT_MANAGEMENT_COMPONENT,
  removedProperties: [
    { name: 'isLevel13', comment: `'isLevel13' property has been removed.` },
    {
      name: 'isAnonymousConsentsEnabled',
      comment: `'isAnonymousConsentsEnabled' property has been removed.`,
    },
  ],
};
