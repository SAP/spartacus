/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonConfigurator } from '../../core/model/common-configurator.model';
export namespace ConfiguratorRouter {
  export enum PageType {
    CONFIGURATION = 'configuration',
    OVERVIEW = 'overview',
  }
  export interface Data {
    pageType?: PageType;
    isOwnerCartEntry?: boolean;
    owner: CommonConfigurator.Owner;
    displayOnly?: boolean;
    forceReload?: boolean;
    resolveIssues?: boolean;
    skipConflicts?: boolean;
    expMode?: boolean;
    configIdTemplate?: string;
    displayRestartDialog?: boolean;
    navigationId?: number;
  }
}
