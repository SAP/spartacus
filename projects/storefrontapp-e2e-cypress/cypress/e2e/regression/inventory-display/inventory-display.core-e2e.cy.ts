/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { runInventoryDisplayE2E } from '../../../helpers/inventory-display';
import { inventoryDisplayB2C } from '../../../sample-data/inventory-display';

runInventoryDisplayE2E('B2C', inventoryDisplayB2C);
