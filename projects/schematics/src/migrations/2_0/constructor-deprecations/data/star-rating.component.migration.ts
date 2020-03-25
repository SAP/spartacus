import {
  SPARTACUS_STOREFRONTLIB,
  STAR_RATING_COMPONENT,
  ANGULAR_CORE,
  RENDERER_2,
  ELEMENT_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STAR_RATING_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\shared\components\star-rating\star-rating.component.ts
  class: STAR_RATING_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ELEMENT_REF,
      importPath: ANGULAR_CORE,
    },
  ],
  addParams: [
    {
      className: RENDERER_2,
      importPath: ANGULAR_CORE,
    },
  ],
};
