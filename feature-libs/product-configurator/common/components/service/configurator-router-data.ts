/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  }
}
