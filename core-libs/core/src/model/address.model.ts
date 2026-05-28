/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorModel } from './misc.model';

export interface Country {
  isocode?: string;
  name?: string;
}

export enum CountryType {
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
}

export interface Region {
  countryIso?: string;
  isocode?: string;
  isocodeShort?: string;
  name?: string;
}

export interface City {
  regionIso?: string;
  isocode?: string;
  name?: string;
}

export interface CityDistrict {
  cityIso?: string;
  isocode?: string;
  name?: string;
}

/**
 * Country isocodes whose addresses use a hierarchical (multi-level)
 * format: country → region → city → district. For these countries the
 * address form shows chained dropdowns and skips OCC address verification.
 */
export const supportedCountriesUsesHierarchicalAddressFormat = ['CN'];

export interface Address {
  id?: string;

  title?: string;
  titleCode?: string;

  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;

  line1?: string;
  line2?: string;
  postalCode?: string;
  town?: string;
  city?: City;
  region?: Region;
  district?: string;
  cityDistrict?: CityDistrict;
  country?: Country;
  cellphone?: string;

  defaultAddress?: boolean;
  shippingAddress?: boolean;

  formattedAddress?: string;
  phone?: string;

  visibleInAddressBook?: boolean;
}

export interface AddressValidation {
  decision?: string;
  // TODO: Simplify with converter
  errors?: { errors: ErrorModel[] };
  suggestedAddresses?: Address[];
}
