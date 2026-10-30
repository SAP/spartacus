/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// The browser bundle patches Node's EventTarget, breaking MessagePort.on callbacks.
require(typeof window === 'undefined' ? 'zone.js/node' : 'zone.js');
require('zone.js/testing');
