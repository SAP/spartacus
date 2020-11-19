import {
  ANGULAR_CORE,
  CHANGE_DETECTOR_REF,
  CMS_COMPONENTS_SERVICE,
  CMS_SERVICE,
  DYNAMIC_ATTRIBUTE_SERVICE,
  ELEMENT_REF,
  PAGE_SLOT_COMPONENT,
  PAGE_SLOT_SERVICE,
  RENDERER_2,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PAGE_SLOT_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: PAGE_SLOT_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
    { className: DYNAMIC_ATTRIBUTE_SERVICE, importPath: SPARTACUS_CORE },
    { className: RENDERER_2, importPath: ANGULAR_CORE },
    { className: ELEMENT_REF, importPath: ANGULAR_CORE },
    {
      className: CMS_COMPONENTS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE,
    },
  ],
  removeParams: [
    {
      className: CMS_COMPONENTS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: PAGE_SLOT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
