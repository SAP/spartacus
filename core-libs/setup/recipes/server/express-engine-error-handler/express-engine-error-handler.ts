/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// SPIKE TODO: IMPLEMENT IT

/**
 * Create an ExpressJS middleware that does the following:
 * - take the html string
 * - find the script tag with id 'cx-ssr-errors' (it's start and end)
 * - unescape the content of the script tag
 * - parse it as JSON
 * - if it contains, fallback to CSR with no-cache to all clients that still listen for the response (when reuseCurrentRendering)
 *    - prevent saving the result to the in-memory cache! (even after response was sent earlier due to a timeout)
 */

// SPIKE TODO: try alternative strategy: just push the CSR fallback and no-cache header to the RESPONSE object (provided by @nguniversal/express-engine)
