/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';
declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get Cpq token
     *
     * @member {string}
     */
    getCpqAccessData?: string | CoreOccEndpoint;
    /**
     * Endpoint to add a cpq configuration to the current cart
     *
     * @member {string}
     */
    addCpqConfigurationToCart?: string | CoreOccEndpoint;
    /**
     * Endpoint for updating a cpq configuration attached to the given cart entry
     */
    updateCpqConfigurationForCartEntry?: string | CoreOccEndpoint;
    /**
     * Endpoint for reading the Id of a CPQ configuration attached to the given cart entry
     */
    readCpqConfigurationForCartEntry?: string | CoreOccEndpoint;
    /**
     * Endpoint for reading the Id of a CPQ configuration attached to the given order entry
     */
    readCpqConfigurationForOrderEntry?: string | CoreOccEndpoint;
    /**
     * Endpoint for creation a CPQ configuration over OCC
     */
    createCpqConfiguration?: string | CoreOccEndpoint;
    /**
     * Endpoint for retrieving a CPQ configuration over OCC
     */
    readCpqConfiguration?: string | CoreOccEndpoint;
    /**
     * Endpoint for retrieving a CPQ configuration overview over OCC
     */
    readCpqConfigurationOverview?: string | CoreOccEndpoint;
    /**
     * Endpoint for update a CPQ attribute over OCC
     */
    updateCpqAttribute?: string | CoreOccEndpoint;
    /**
     * Endpoint for update a CPQ attribute value quantity over OCC
     */
    updateCpqAttributeValueQuantity?: string | CoreOccEndpoint;
    /**
     * Endpoint for adding a new container row to a CPQ configuration over OCC
     */
    createCpqContainerRow?: string | CoreOccEndpoint;
    /**
     * Endpoint for copying a container row of a CPQ configuration over OCC
     */
    copyCpqContainerRow?: string | CoreOccEndpoint;
    /**
     * Endpoint for deleting a container row from a CPQ configuration over OCC
     */
    removeCpqContainerRow?: string | CoreOccEndpoint;
    /**
     * Endpoint for reading a CPQ configuration attached to the given cart entry over OCC
     */
    readCpqConfigurationForCartEntryFull?: string | CoreOccEndpoint;
    /**
     * Endpoint for reading a CPQ configuration attached to a given order entry over OCC
     */
    readCpqConfigurationForOrderEntryFull?: string | CoreOccEndpoint;
    /**
     * Endpoint for reading an entire CPQ configuration attached to a given quote entry over OCC
     */
    readCpqConfigurationForQuoteEntryFull?: string | CoreOccEndpoint;
    /**
     * Endpoint for reading a CPQ configuration attached to a given saved cart entry over OCC
     */
    readCpqConfigurationForSavedCartEntryFull?: string | CoreOccEndpoint;
  }
}
