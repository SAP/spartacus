/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalRoutesService } from './external-routes.service';

export function addExternalRoutesFactory(
  service: ExternalRoutesService
): () => void {
  const result = () => {
    service.addRoutes();
  };
  return result;
}
