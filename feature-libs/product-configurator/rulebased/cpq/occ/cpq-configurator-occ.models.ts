/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * An interface representing the models used for the communication with the OCC part of the CPQ configurator
 */
export namespace OccCpqConfigurator {
  export interface AddToCartParameters {
    userId?: string;
    cartId?: string;
    product?: AddToCartProductData;
    quantity?: number;
    configId?: string;
  }

  export interface AddToCartProductData {
    code?: string;
  }

  export interface UpdateConfigurationForCartEntryParameters {
    userId?: string;
    cartId?: string;
    configId: string;
    entryNumber: string;
  }
}
