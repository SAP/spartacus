import { OnDestroy } from '@angular/core';
import { CartUiEventAddToCart } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AddedToCartDialogEventListener implements OnDestroy {
    protected eventService: EventService;
    protected launchDialogService: LaunchDialogService;
    protected subscription: Subscription;
    constructor(eventService: EventService, launchDialogService: LaunchDialogService);
    protected onAddToCart(): void;
    protected openModal(event: CartUiEventAddToCart): void;
    protected closeModal(reason?: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddedToCartDialogEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddedToCartDialogEventListener>;
}
