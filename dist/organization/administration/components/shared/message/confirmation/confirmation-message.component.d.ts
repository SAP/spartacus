import { OnInit } from '@angular/core';
import { Translatable } from '@spartacus/core';
import { BaseMessageComponent } from '../base-message.component';
import { MessageData } from '../message.model';
import { MessageService } from '../services/message.service';
import { ConfirmationMessageData } from './confirmation-message.model';
import * as i0 from "@angular/core";
/**
 * Renders a confirmation message and cancel/confirm button in the message component.
 */
export declare class ConfirmationMessageComponent extends BaseMessageComponent implements OnInit {
    protected data: MessageData<ConfirmationMessageData>;
    protected platformId: any;
    protected messageService: MessageService;
    cancelText: Translatable;
    confirmText: Translatable;
    constructor(data: MessageData<ConfirmationMessageData>, platformId: any, messageService: MessageService);
    ngOnInit(): void;
    /**
     * Emits a confirmation event to the data events.
     *
     * The original author of the event message or other parties can observe
     * the event data.
     */
    confirm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmationMessageComponent, "cx-org-confirmation", never, {}, {}, never, never, false, never>;
}
