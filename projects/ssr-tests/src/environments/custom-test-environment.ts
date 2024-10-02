/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type { Event, State } from 'jest-circus'; // SPIKE TODO - REMOVE IT. IT"S ONLY TO USE IT
import { TestEnvironment as NodeEnvironment } from 'jest-environment-node';

/**
 * This is a custom Jest environment that adds the SSR logs to the test errors.
 * The logs are added to the error `cause` property for failed tests,
 * so those logs will be printed by Jest along with the test error.
 */
export default class CustomTestEnvironment extends NodeEnvironment {}
