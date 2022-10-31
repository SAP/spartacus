/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StoreData {
  id: string;
  name: string;
  displayName: string;
  line1: string;
  line2: string;
  town: string;
  formattedDistance: string;
  latitude: number;
  longitude: number;
  image: string;
  productcode: string;
  openings: { [opening: string]: string };
  features: Array<string>;
}

export interface MapData {
  total: number;
  data: Array<StoreData>;
}
