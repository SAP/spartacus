/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OrganizationUserRegistration {
  titleCode?: string;
  email: string;
  firstName: string;
  lastName: string;
  message?: string;
  verificationTokenId?: string;
  verificationTokenCode?: string;
}

export interface OrganizationUserRegistrationForm
  extends OrganizationUserRegistration {
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  town?: string;
  region?: string;
  country?: string;
  phoneNumber?: string;
}
