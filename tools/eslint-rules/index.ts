/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  },
};
