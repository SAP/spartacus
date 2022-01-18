import {
  ANGULAR_CORE,
  CHANGE_DETECTOR_REF,
  COMPONENT_FACTORY_RESOLVER,
  ELEMENT_REF,
  POPOVER_DIRECTIVE,
  POPOVER_SERVICE,
  POSITIONING_SERVICE,
  RENDERER_2,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const POPOVER_DIRECTIVE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  class: POPOVER_DIRECTIVE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: ELEMENT_REF, importPath: ANGULAR_CORE },
    {
      className: VIEW_CONTAINER_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: COMPONENT_FACTORY_RESOLVER,
      importPath: ANGULAR_CORE,
    },
    {
      className: RENDERER_2,
      importPath: ANGULAR_CORE,
    },
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: POSITIONING_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: POPOVER_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: POSITIONING_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
