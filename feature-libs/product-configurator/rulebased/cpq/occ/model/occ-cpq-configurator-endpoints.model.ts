/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';
declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get Cpq token
     *
     * @member {string}
     */
    getCpqAccessData?: string | OccEndpoint;
    /**
     * Endpoint to add a cpq configuration to the current cart
     *
     * @member {string}
     */
    addCpqConfigurationToCart?: string | OccEndpoint;
    /**
     * Endpoint for updating a cpq configuration attached to the given cart entry
     */
    updateCpqConfigurationForCartEntry?: string | OccEndpoint;
    /**
     * Endpoint for reading the Id of a CPQ configuration attached to the given cart entry
     */
    readCpqConfigurationForCartEntry?: string | OccEndpoint;
    /**
     * Endpoint for reading the Id of a CPQ configuration attached to the given order entry
     */
    readCpqConfigurationForOrderEntry?: string | OccEndpoint;
    /**
     * Endpoint for creation a CPQ configuration over OCC
     */
    createCpqConfiguration?: string | OccEndpoint;
    /**
     * Endpoint for retrieving a CPQ configuration over OCC
     */
    readCpqConfiguration?: string | OccEndpoint;
    /**
     * Endpoint for retrieving a CPQ configuration overview over OCC
     */
    readCpqConfigurationOverview?: string | OccEndpoint;
    /**
     * Endpoint for update a CPQ attribute over OCC
     */
    updateCpqAttribute?: string | OccEndpoint;
    /**
     * Endpoint for update a CPQ attribute value quantity over OCC
     */
    updateCpqAttributeValueQuantity?: string | OccEndpoint;
    /**
     * Endpoint for reading a CPQ configuration attached to the given cart entry over OCC
     */
    readCpqConfigurationForCartEntryFull?: string | OccEndpoint;
    /**
     * Endpoint for reading a CPQ configuration attached to a given order entry over OCC
     */
    readCpqConfigurationForOrderEntryFull?: string | OccEndpoint;
  }
}
