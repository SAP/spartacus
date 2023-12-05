import { AfterViewInit, ComponentRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseMessageComponent } from './base-message.component';
import { MessageData } from './message.model';
import { MessageRenderService } from './services/message-render.service';
import { MessageService } from './services/message.service';
import * as i0 from "@angular/core";
export declare class MessageComponent implements AfterViewInit, OnDestroy {
    protected messageService: MessageService;
    protected renderService: MessageRenderService;
    vcr: ViewContainerRef;
    protected subscription: Subscription;
    constructor(messageService: MessageService, renderService: MessageRenderService);
    ngAfterViewInit(): void;
    protected render(msg: MessageData): void;
    /**
     * Terminates the message component in 2 steps. It starts to toggle the terminate
     * state of the component and shortly after destroys the component completely. The
     * termination state allows the CSS layer to play an animation before destroying.
     */
    protected terminate(ref: ComponentRef<BaseMessageComponent>): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageComponent, "cx-org-message", never, {}, {}, never, never, false, never>;
}
