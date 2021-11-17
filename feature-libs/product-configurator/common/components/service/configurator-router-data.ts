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
  }
}
