import {
  ANGULAR_CORE,
  ANONYMOUS_CONSENTS_SERVICE,
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT,
  MODAL_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms/cms-components/anonymous-consent-management/banner/anonymous-consent-management.component.ts
  class: ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
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
      className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: VIEW_CONTAINER_REF,
      importPath: ANGULAR_CORE,
    },
  ],
};
