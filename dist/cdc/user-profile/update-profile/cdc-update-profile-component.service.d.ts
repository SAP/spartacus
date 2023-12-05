import { CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService } from '@spartacus/core';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import * as i0 from "@angular/core";
export declare class CDCUpdateProfileComponentService extends UpdateProfileComponentService {
    protected userProfile: UserProfileFacade;
    protected globalMessageService: GlobalMessageService;
    protected cdcJsService: CdcJsService;
    constructor(userProfile: UserProfileFacade, globalMessageService: GlobalMessageService, cdcJsService: CdcJsService);
    /**
     * Updates the user's details and handles the UI.
     */
    updateProfile(): void;
    protected onError(_error: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CDCUpdateProfileComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CDCUpdateProfileComponentService>;
}
