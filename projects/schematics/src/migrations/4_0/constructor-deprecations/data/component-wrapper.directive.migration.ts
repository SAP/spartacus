import {
  ANGULAR_CORE,
  CMS_COMPONENTS_SERVICE,
  CMS_INJECTOR_SERVICE,
  COMPONENT_HANDLER_SERVICE,
  COMPONENT_WRAPPER_DIRECTIVE,
  DYNAMIC_ATTRIBUTE_SERVICE,
  EVENT_SERVICE,
  INJECTOR,
  RENDERER_2,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const COMPONENT_WRAPPER_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  class: COMPONENT_WRAPPER_DIRECTIVE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: VIEW_CONTAINER_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: CMS_COMPONENTS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: INJECTOR,
      importPath: ANGULAR_CORE,
    },
    {
      className: DYNAMIC_ATTRIBUTE_SERVICE,
      importPath: ANGULAR_CORE,
    },
    {
      className: RENDERER_2,
      importPath: ANGULAR_CORE,
    },
    {
      className: COMPONENT_HANDLER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CMS_INJECTOR_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: EVENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
