import { OnInit } from '@angular/core';
import { Translatable } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { MessageData } from './message.model';
import * as i0 from "@angular/core";
export declare abstract class BaseMessageComponent implements OnInit {
    protected messageData: MessageData;
    protected platformId: any;
    type: string | undefined;
    terminated: boolean;
    message: Translatable;
    messageTitle?: Translatable;
    /**
     * Icon used to display next to the message.
     */
    messageIcon: ICON_TYPE | undefined;
    constructor(messageData: MessageData, platformId: any);
    ngOnInit(): void;
    close(): void;
    protected resolveType(): string | undefined;
    protected handleAutoHide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseMessageComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseMessageComponent, never, never, {}, {}, never, never, false, never>;
}
