import { CommonConfigurator } from '../../core/model/common-configurator.model';
export declare namespace ConfiguratorRouter {
    enum PageType {
        CONFIGURATION = "configuration",
        OVERVIEW = "overview"
    }
    interface Data {
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
