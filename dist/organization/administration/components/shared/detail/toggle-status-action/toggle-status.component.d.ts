import { OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ItemService } from '../../item.service';
import { ConfirmationMessageData } from '../../message/confirmation/confirmation-message.model';
import { MessageService } from '../../message/services/message.service';
import { BaseItem } from '../../organization.model';
import { DisableInfoService } from '../disable-info/disable-info.service';
import * as i0 from "@angular/core";
/**
 * Reusable component in the my-company is to toggle the disabled state for
 * my company entities.
 */
export declare class ToggleStatusComponent<T extends BaseItem> implements OnDestroy {
    protected itemService: ItemService<T>;
    protected messageService: MessageService<ConfirmationMessageData>;
    protected disableInfoService: DisableInfoService<T>;
    /**
     * The localization of messages is based on the i18n root. Messages are
     * concatenated to the root, such as:
     *
     * `[i18nRoot].messages.deactivate`
     */
    i18nRoot: string;
    /**
     * The key input can be used to add a custom key.
     *
     * Most _organization_ entities use the `code` key, but there is some variations.
     */
    key: string;
    /**
     * The disabled state is calculated but can be provided as well.
     */
    disabled: boolean;
    /**
     * resolves the current item.
     */
    current$: Observable<T | undefined>;
    /**
     * resolves if the user is currently in the edit form.
     */
    isInEditMode$: Observable<boolean>;
    protected subscription: Subscription;
    protected confirmation: Subject<ConfirmationMessageData> | null;
    constructor(itemService: ItemService<T>, messageService: MessageService<ConfirmationMessageData>, disableInfoService: DisableInfoService<T>);
    toggle(item: T): void;
    /**
     * Indicates whether the status can be toggled or not.
     */
    isDisabled(item: T): boolean;
    protected update(item: T): void;
    protected getPatchedItem(item: T): T;
    protected notify(item: T): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleStatusComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleStatusComponent<any>, "cx-org-toggle-status", never, { "i18nRoot": "i18nRoot"; "key": "key"; "disabled": "disabled"; }, {}, never, never, false, never>;
}
