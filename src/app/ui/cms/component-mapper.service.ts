import { Injectable } from '@angular/core';

const componentLibrary = {
    'CMSLinkComponent': 'LinkComponent',
    'SimpleResponsiveBannerComponent': 'SimpleResponsiveBannerComponent',
    'SimpleBannerComponent': 'SimpleResponsiveBannerComponent',
    'BreadcrumbComponent': 'BreadcrumbComponent',
    'CmsParagraphComponent': 'CmsParagraphComponent',
    'NavigationComponent': 'NavigationComponent',
    'FooterNavigationComponent': 'FooterNavigationComponent',
    'CategoryNavigationComponent': 'CategoryNavigationComponent',
    'MiniCartComponent': 'CartTriggerComponent',
    'SideCartComponent': 'MiniCartComponent'
};

@Injectable()
export class ComponentMapperService {

    constructor() { }

    getType(componentType: string) {
        return componentLibrary[componentType];
    }

    // addAliasForType(alias: string, type: string) {
    //     componentLibrary[alias] = type;
    //     console.log(componentLibrary);
    // }

}
