/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfConfig } from './opf-config';

export function opfConfigValidator(config: OpfConfig): string | void {
  if (!config.opf) {
    return 'Please configure the config.opf object before using the OPF integration library';
  }

  if (
    config.opf.baseUrl === undefined ||
    config.opf.baseUrl.trim().length === 0
  ) {
    return 'Please configure opf.baseUrl before using OPF integration library';
  }

  if (
    config.opf.commerceCloudPublicKey === undefined ||
    config.opf.commerceCloudPublicKey.trim().length === 0
  ) {
    return 'Please configure opf.commerceCloudPublicKey before using OPF integration library';
  }
}
