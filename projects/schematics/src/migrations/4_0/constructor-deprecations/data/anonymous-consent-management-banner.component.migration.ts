import {
  ANGULAR_CORE,
  ANONYMOUS_CONSENTS_SERVICE,
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT,
  LAUNCH_DIALOG_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V1: ConstructorDeprecation =
  {
    // storefrontlib/cms-components/anonymous-consent-management/banner/anonymous-consent-management-banner.component.ts
    class: ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: ANONYMOUS_CONSENTS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
    ],
    removeParams: [
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };

export const ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT_MIGRATION_V2: ConstructorDeprecation =
  {
    // storefrontlib/cms-components/anonymous-consent-management/banner/anonymous-consent-management-banner.component.ts
    class: ANONYMOUS_CONSENT_MANAGEMENT_BANNER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: ANONYMOUS_CONSENTS_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
