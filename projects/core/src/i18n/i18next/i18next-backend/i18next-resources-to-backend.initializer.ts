/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// [CXSPA-2060]
// To prepare for a future minor 6.x release, we intend to utilize 'i18next-resources-to-backend'.
// However, we won't be able to introduce a new peer dependency in a minor release as it would constitute
// a breaking change. Therefore, now in version 6.0, we simulate the use of this library,
// but the actual implementation using it will occur at a later date (in 6.x).
import I18nextResourcesToBackend from 'i18next-resources-to-backend'; // not exported in public API
export { I18nextResourcesToBackend };
