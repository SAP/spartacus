/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as common from './common';

/**
 * This script generates stats from a breaking changes data sfile.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */

const breakingChangesData = common.readBreakingChangeFile();

common.printStats(breakingChangesData);
