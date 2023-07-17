/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { returnRequests } from "./returnRequests";
import { pagination } from "./pagination";
import { sorts } from "./sorts";

export interface returnOrder {
   returnRequests: returnRequests[];
   pagination: pagination;
   sorts: sorts[];
}
