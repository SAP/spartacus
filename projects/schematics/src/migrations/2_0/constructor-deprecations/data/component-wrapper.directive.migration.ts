import {
  ANGULAR_CORE,
  CMS_INJECTOR_SERVICE,
  CMS_MAPPING_SERVICE,
  CMS_SERVICE,
  COMPONENT_HANDLER_SERVICE,
  COMPONENT_WRAPPER_DIRECTIVE,
  DYNAMIC_ATTRIBUTE_SERVICE,
  INJECTOR,
  RENDERER_2,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const COMPONENT_WRAPPER_DIRECTIVE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-structure/page/component/component-wrapper.directive.ts
  class: COMPONENT_WRAPPER_DIRECTIVE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: VIEW_CONTAINER_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: CMS_MAPPING_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: INJECTOR,
      importPath: ANGULAR_CORE,
    },
    {
      className: DYNAMIC_ATTRIBUTE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: RENDERER_2,
      importPath: ANGULAR_CORE,
    },
    {
      className: COMPONENT_HANDLER_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CMS_INJECTOR_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CMS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: CMS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
