import { GenericConfigurator } from '@spartacus/core';
export namespace ConfiguratorRouter {
  export enum PageType {
    CONFIGURATION = 'configuration',
    OVERVIEW = 'overview',
  }
  export interface Data {
    pageType?: PageType;
    isOwnerCartEntry?: boolean;
    configuratorType?: string;
    owner?: GenericConfigurator.Owner;
    displayOnly?: boolean;
    forceReload?: boolean;
    resolveIssues?: boolean;
  }
}
