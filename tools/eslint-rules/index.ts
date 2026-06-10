/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  rule as useProvideDefaultConfig,
  RULE_NAME as useProvideDefaultConfigName,
} from './rules/use-provide-default-config';

import {
  rule as useProvideDefaultConfigFactory,
  RULE_NAME as useProvideDefaultConfigFactoryName,
} from './rules/use-provide-default-config-factory';

import {
  rule as useProvideDefaultFeatureToggles,
  RULE_NAME as useProvideDefaultFeatureTogglesName,
} from './rules/use-provide-default-feature-toggles';

import {
  rule as useProvideDefaultFeatureTogglesFactory,
  RULE_NAME as useProvideDefaultFeatureTogglesFactoryName,
} from './rules/use-provide-default-feature-toggles-factory';

import {
  rule as noNgrxFailActionWithoutErrorActionImplementation,
  RULE_NAME as noNgrxFailActionWithoutErrorActionImplementationName,
} from './rules/no-ngrx-fail-action-without-error-action-implementation';

import {
  rule as ngrxFailActionMustInitializeError,
  RULE_NAME as ngrxFailActionMustInitializeErrorName,
} from './rules/ngrx-fail-action-must-initialize-error';

import {
  rule as noConstEnum,
  RULE_NAME as noConstEnumName,
} from './rules/no-const-enum';

import {
  rule as featureConfigServiceMustBePrivate,
  RULE_NAME as featureConfigServiceMustBePrivateName,
} from './rules/feature-config-service-must-be-private';

import {
  rule as featureTogglesMustBePrivate,
  RULE_NAME as featureTogglesMustBePrivateName,
} from './rules/feature-toggles-must-be-private';

import {
  rule as noStorefrontappFalseFeatureToggles,
  RULE_NAME as noStorefrontappFalseFeatureTogglesName,
} from './rules/no-storefrontapp-false-feature-toggles';

import {
  rule as noSelfPublicApiImport,
  RULE_NAME as noSelfPublicApiImportName,
} from './rules/no-self-public-api-import';
/**
 * Import your custom workspace rules at the top of this file.
 *
 * For example:
 *
 * import { RULE_NAME as myCustomRuleName, rule as myCustomRule } from './rules/my-custom-rule';
 *
 * In order to quickly get started with writing rules you can use the
 * following generator command and provide your desired rule name:
 *
 * ```sh
 * npx nx g @nrwl/linter:workspace-rule {{ NEW_RULE_NAME }}
 * ```
 */

module.exports = {
  /**
   * Apply the imported custom rules here.
   *
   * For example (using the example import above):
   *
   * rules: {
   *  [myCustomRuleName]: myCustomRule
   * }
   */
  rules: {
    [useProvideDefaultConfigName]: useProvideDefaultConfig,
    [useProvideDefaultConfigFactoryName]: useProvideDefaultConfigFactory,
    [useProvideDefaultFeatureTogglesName]: useProvideDefaultFeatureToggles,
    [useProvideDefaultFeatureTogglesFactoryName]:
      useProvideDefaultFeatureTogglesFactory,
    [noNgrxFailActionWithoutErrorActionImplementationName]:
      noNgrxFailActionWithoutErrorActionImplementation,
    [ngrxFailActionMustInitializeErrorName]: ngrxFailActionMustInitializeError,
    [noConstEnumName]: noConstEnum,
    [featureConfigServiceMustBePrivateName]: featureConfigServiceMustBePrivate,
    [featureTogglesMustBePrivateName]: featureTogglesMustBePrivate,
    [noStorefrontappFalseFeatureTogglesName]: noStorefrontappFalseFeatureToggles,
    [noSelfPublicApiImportName]: noSelfPublicApiImport,
  },
};
