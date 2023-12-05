import { OnDestroy } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService, Translatable, WindowRef } from '@spartacus/core';
import { CreateButtonType, UserListService } from '@spartacus/organization/administration/components';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CdcUserListService extends UserListService implements OnDestroy {
    protected tableService: TableService;
    protected userService: B2BUserService;
    protected globalMessageService: GlobalMessageService;
    protected winRef: WindowRef;
    protected cdcJsService: CdcJsService;
    constructor(tableService: TableService, userService: B2BUserService, globalMessageService: GlobalMessageService, winRef: WindowRef, cdcJsService: CdcJsService);
    protected subscription: Subscription;
    onCreateButtonClick(): void;
    getCreateButtonType(): CreateButtonType;
    getCreateButtonLabel(): Translatable;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcUserListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcUserListService>;
}
