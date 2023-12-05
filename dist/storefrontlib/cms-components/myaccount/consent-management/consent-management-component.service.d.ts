import { AnonymousConsentsConfig, ConsentTemplate } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ConsentManagementComponentService {
    protected anonymousConsentsConfig?: AnonymousConsentsConfig | undefined;
    constructor(anonymousConsentsConfig?: AnonymousConsentsConfig | undefined);
    /**
     * Returns the list of mandatory consents
     * @param _templateList - list of all active consents. This parameter is not needed in core
     * implementation. But is needed in CDC implementation to fetch only the required consents
     * from this list
     * @returns array of consent IDs
     */
    getRequiredConsents(_templateList: ConsentTemplate[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsentManagementComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsentManagementComponentService>;
}
