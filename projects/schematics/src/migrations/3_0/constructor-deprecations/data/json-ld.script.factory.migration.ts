import {
  ANGULAR_CORE,
  JSON_LD_SCRIPT_FACTORY,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  WINDOW_REF,
  RENDERER_FACTORY_2,
  DOM_SANITIZER,
  ANGULAR_PLATFORM_BROWSER,
  SEO_CONFIG,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-structure/seo/structured-data/json-ld-script.factory.ts
  class: JSON_LD_SCRIPT_FACTORY,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: RENDERER_FACTORY_2,
      importPath: ANGULAR_CORE,
    },
    {
      className: DOM_SANITIZER,
      importPath: ANGULAR_PLATFORM_BROWSER,
    },
  ],
  addParams: [
    {
      className: SEO_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
