/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Route, UrlMatcher } from '@angular/router';

export type UrlMatcherFactory = (route: Route) => UrlMatcher;
