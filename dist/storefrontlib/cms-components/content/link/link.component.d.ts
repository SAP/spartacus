import { CmsLinkComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import * as i0 from "@angular/core";
export declare class LinkComponent {
    protected component: CmsComponentData<CmsLinkComponent>;
    styleClasses: string | undefined;
    data$: Observable<CmsLinkComponent>;
    constructor(component: CmsComponentData<CmsLinkComponent>);
    /**
     * Returns `_blank` to force opening the link in a new window whenever the
     * `data.target` flag is set to `true`.
     */
    getTarget(data: CmsLinkComponent): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LinkComponent, "cx-link", never, {}, {}, never, never, false, never>;
}
