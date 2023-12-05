import { CmsNavigationComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationService } from '../navigation/navigation.service';
import * as i0 from "@angular/core";
export declare class FooterNavigationComponent {
    protected componentData: CmsComponentData<CmsNavigationComponent>;
    protected service: NavigationService;
    node$: Observable<NavigationNode>;
    styleClass$: Observable<string | undefined>;
    constructor(componentData: CmsComponentData<CmsNavigationComponent>, service: NavigationService);
    static ɵfac: i0.ɵɵFactoryDeclaration<FooterNavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FooterNavigationComponent, "cx-footer-navigation", never, {}, {}, never, never, false, never>;
}
