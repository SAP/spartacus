import { Observable } from 'rxjs';
import { SkipLink } from '../config/skip-link.config';
import { SkipLinkService } from '../service/skip-link.service';
import * as i0 from "@angular/core";
export declare class SkipLinkComponent {
    private skipLinkService;
    skipLinks$: Observable<SkipLink[]>;
    constructor(skipLinkService: SkipLinkService);
    scrollToTarget(skipLink: SkipLink): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SkipLinkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SkipLinkComponent, "cx-skip-link", never, {}, {}, never, never, false, never>;
}
