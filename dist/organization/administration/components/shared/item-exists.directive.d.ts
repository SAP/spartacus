import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from './item.service';
import { MessageService } from './message/services/message.service';
import { BaseItem } from './organization.model';
import * as i0 from "@angular/core";
export declare class ItemExistsDirective<T = BaseItem> implements OnInit, OnDestroy {
    protected itemService: ItemService<T>;
    protected messageService: MessageService;
    protected subscription: Subscription;
    constructor(itemService: ItemService<T>, messageService: MessageService);
    ngOnInit(): void;
    protected handleErrorMessage(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ItemExistsDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ItemExistsDirective<any>, "[cxOrgItemExists]", never, {}, {}, never, never, false, never>;
}
