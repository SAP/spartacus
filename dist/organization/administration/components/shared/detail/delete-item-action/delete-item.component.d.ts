import { OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ItemService } from '../../item.service';
import { ConfirmationMessageData } from '../../message/confirmation/confirmation-message.model';
import { MessageService } from '../../message/services/message.service';
import { BaseItem } from '../../organization.model';
import * as i0 from "@angular/core";
/**
 * Reusable component in the my-company is to delete an item (if it's possible)
 */
export declare class DeleteItemComponent<T extends BaseItem> implements OnDestroy {
    protected itemService: ItemService<T>;
    protected messageService: MessageService<ConfirmationMessageData>;
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
     * The additionalParam input can be used to provide additional data if it's required
     * for API request
     */
    additionalParam?: string;
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
    constructor(itemService: ItemService<T>, messageService: MessageService<ConfirmationMessageData>);
    delete(item: T): void;
    protected confirmDelete(item: T): void;
    protected notify(item: T): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteItemComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeleteItemComponent<any>, "cx-org-delete-item", never, { "i18nRoot": "i18nRoot"; "key": "key"; "additionalParam": "additionalParam"; }, {}, never, never, false, never>;
}
