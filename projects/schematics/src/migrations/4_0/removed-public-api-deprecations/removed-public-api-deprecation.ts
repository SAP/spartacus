import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  CLOSE_ACCOUNT_COMPONENT,
  CLOSE_ACCOUNT_MODAL_COMPONENT,
  CLOSE_ACCOUNT_MODULE,
  CMS_LIB_MODULE,
  FORGOTTEN_PASSWORD_TRANSLATION_CHUNK,
  FORGOT_PASSWORD_COMPONENT,
  FORGOT_PASSWORD_MODULE,
  LOGIN_FORM_TRANSLATION_CHUNK,
  MINI_LOGIN_TRANSLATION_CHUNK,
  REGISTER_TRANSLATION_CHUNK,
  RESET_PASSWORD_MODULE,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_USER,
  SPARTACUS_USER_PROFILE_COMPONENTS,
  TRANSLATION_CHUNKS_CONFIG,
  UPDATE_EMAIL_COMPONENT,
  UPDATE_EMAIL_FORM_COMPONENT,
  UPDATE_EMAIL_FORM_TRANSLATION_CHUNK,
  UPDATE_EMAIL_MODULE,
  UPDATE_PASSWORD_COMPONENT,
  UPDATE_PASSWORD_FORM_COMPONENT,
  UPDATE_PASSWORD_MODULE,
  UPDATE_PROFILE_COMPONENT,
  UPDATE_PROFILE_MODULE,
  USER_COMPONENT_MODULE,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // uncomment product variants deprecation on 4.0 migration works (#11391)
  // // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.component.ts
  // {
  //   node: PRODUCT_VARIANT_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${PRODUCT_VARIANT_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
  // {
  //   node: VARIANT_COLOR_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_COLOR_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
  // {
  //   node: VARIANT_SIZE_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_SIZE_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  // {
  //   node: VARIANT_STYLE_ICONS_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_STYLE_ICONS_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
  // {
  //   node: VARIANT_STYLE_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_STYLE_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },

  // projects/assets/src/translations/translation-chunks-config.ts
  {
    node: TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `Following translation chunks '${MINI_LOGIN_TRANSLATION_CHUNK}', '${UPDATE_EMAIL_FORM_TRANSLATION_CHUNK}', '${FORGOTTEN_PASSWORD_TRANSLATION_CHUNK}', '${LOGIN_FORM_TRANSLATION_CHUNK}', '${REGISTER_TRANSLATION_CHUNK}' were moved to ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/src/cms-components/cms-lib.module.ts
  {
    node: CMS_LIB_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `Following module imports '${CLOSE_ACCOUNT_MODULE}', '${FORGOT_PASSWORD_MODULE}', '${RESET_PASSWORD_MODULE}', '${UPDATE_EMAIL_MODULE}', '${UPDATE_PASSWORD_MODULE}', '${UPDATE_PROFILE_MODULE}', '${USER_COMPONENT_MODULE}', were removed. Those modules are now part of ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/close-account.module.ts
  {
    node: CLOSE_ACCOUNT_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CLOSE_ACCOUNT_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/components/close-account/close-account.component.ts
  {
    node: CLOSE_ACCOUNT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CLOSE_ACCOUNT_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/close-account/components/close-account-modal/close-account-modal.component.ts
  {
    node: CLOSE_ACCOUNT_MODAL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${CLOSE_ACCOUNT_MODAL_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/forgot-password/forgot-password.module.ts
  {
    node: FORGOT_PASSWORD_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FORGOT_PASSWORD_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/forgot-password/forgot-password.component.ts
  {
    node: FORGOT_PASSWORD_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${FORGOT_PASSWORD_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-email/update-email.module.ts
  {
    node: UPDATE_EMAIL_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-email/update-email.component.ts
  {
    node: UPDATE_EMAIL_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_FORM_COMPONENT}' was removed. For replacement use '${UPDATE_EMAIL_COMPONENT}' from ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-email/update-email-form/update-email-form.component.ts
  {
    node: UPDATE_EMAIL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_EMAIL_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-password/update-password.module.ts
  {
    node: UPDATE_PASSWORD_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-password/components/update-password-form/update-password-form.component.ts
  {
    node: UPDATE_PASSWORD_FORM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_FORM_COMPONENT}' was removed. For replacement use '${UPDATE_PASSWORD_COMPONENT}' from ${SPARTACUS_USER}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-password/components/update-password/update-password.component.ts
  {
    node: UPDATE_PASSWORD_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PASSWORD_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-profile/update-profile.module.ts
  {
    node: UPDATE_PROFILE_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PROFILE_MODULE}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
  // projects/storefrontlib/src/cms-components/myaccount/update-profile/update-profile.component.ts
  {
    node: UPDATE_PROFILE_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${UPDATE_PROFILE_COMPONENT}' was moved to ${SPARTACUS_USER_PROFILE_COMPONENTS}.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
