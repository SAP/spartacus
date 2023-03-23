/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductCarouselItem {
  title?: string;
  media?: { container: any; format?: string };
  price?: any;
  route?: any[];
}
