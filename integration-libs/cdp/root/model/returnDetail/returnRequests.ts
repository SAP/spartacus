/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { order } from "./order";

export interface returnRequests {
    creationTime: string;
    order: order;
}
