import { ANONYMOUS_CONSENT_DIALOG_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_DIALOG_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component.ts
  selector: 'cx-anonymous-consent-dialog',
  componentClassName: ANONYMOUS_CONSENT_DIALOG_COMPONENT,
  removedProperties: [
    { name: 'isLevel13', comment: `'isLevel13' property has been removed.` },
  ],
};
