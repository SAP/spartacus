import {
  ANGULAR_CORE,
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT,
  MODAL_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms/cms-components/anonymous-consent-management/open-dialog/anonymous-consent-open-dialog.component.ts
  class: ANONYMOUS_CONSENT_OPEN_DIALOG_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
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
      className: VIEW_CONTAINER_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
