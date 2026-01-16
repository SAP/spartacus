/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 *
 * CMS API endpoint patterns for request interception in Cypress.
 *
 * These patterns use a wildcard (`*`) to indicate that **any value can appear**
 * in that segment of the path.
 *
 * Possible scenarios for the wildcard:
 * - User type: the `*` can represent `current` or `anonymous`.
 */

export const cmsEndpoints = {
  pages: 'users/*/cms/pages',
  components: 'users/*/cms/components',
};
