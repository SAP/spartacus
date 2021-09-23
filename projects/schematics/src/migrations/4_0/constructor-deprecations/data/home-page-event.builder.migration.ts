import {
  EVENT_SERVICE,
  FEATURE_CONFIG_SERVICE,
  HOME_PAGE_EVENT_BUILDER,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const HOME_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/events/home/home-page-event.builder.ts
    class: HOME_PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      { className: EVENT_SERVICE, importPath: SPARTACUS_CORE },
      { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
    ],
    removeParams: [
      { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
    ],
  };
