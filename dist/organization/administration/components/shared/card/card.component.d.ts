import { ICON_TYPE, ViewComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../item.service';
import { MessageService } from '../message/services/message.service';
import { BaseItem } from '../organization.model';
import * as i0 from "@angular/core";
export declare class CardComponent<T extends BaseItem> {
    protected itemService: ItemService<T>;
    protected messageService: MessageService;
    i18nRoot: string;
    previous: boolean | string;
    subtitle?: string;
    showHint?: boolean | undefined;
    protected itemKey: string | undefined;
    iconTypes: typeof ICON_TYPE;
    item$: Observable<T | undefined>;
    view: ViewComponent;
    constructor(itemService: ItemService<T>, messageService: MessageService);
    /**
     * The views are router based, which means if we close a view, the router outlet is
     * cleaned immediately. To prevent this, we're closing the view manually, before
     * navigating back.
     */
    closeView(event: MouseEvent): boolean;
    get previousLabel(): string;
    protected refreshMessages(item: T | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardComponent<any>, "cx-org-card", never, { "i18nRoot": "i18nRoot"; "previous": "previous"; "subtitle": "subtitle"; "showHint": "showHint"; }, {}, never, ["[actions]", "[info]", "[main]"], false, never>;
}
