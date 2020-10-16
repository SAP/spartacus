import {
  ANGULAR_CORE,
  ANONYMOUS_CONSENTS_CONFIG,
  ANONYMOUS_CONSENTS_SERVICE,
  ANONYMOUS_CONSENT_DIALOG_COMPONENT,
  ELEMENT_REF,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_DIALOG_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/shared/components/anonymous-consents-dialog/anonymous-consent-dialog.component.ts
  class: ANONYMOUS_CONSENT_DIALOG_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ANONYMOUS_CONSENTS_CONFIG,
      importPath: SPARTACUS_CORE,
    },
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ANONYMOUS_CONSENTS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: ELEMENT_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: LAUNCH_DIALOG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
