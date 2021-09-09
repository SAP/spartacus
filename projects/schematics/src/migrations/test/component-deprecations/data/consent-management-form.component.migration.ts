import { CONSENT_MANAGEMENT_FORM_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CONSENT_MANAGEMENT_FORM_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/myaccount/consent-management/components/consent-form/consent-management-form.component.ts
  selector: 'cx-consent-management-form',
  componentClassName: CONSENT_MANAGEMENT_FORM_COMPONENT,
  removedProperties: [
    { name: 'isLevel13', comment: `'isLevel13' property has been removed.` },
    {
      name: 'isAnonymousConsentsEnabled',
      comment: `'isAnonymousConsentsEnabled' property has been removed.`,
    },
  ],
};
