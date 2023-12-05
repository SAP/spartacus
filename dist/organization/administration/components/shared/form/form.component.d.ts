import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { ItemService } from '../item.service';
import { MessageService } from '../message/services/message.service';
import * as i0 from "@angular/core";
/**
 * Reusable component for creating and editing organization items. The component does not
 * know anything about form specific.
 */
export declare class FormComponent<T> implements OnInit, OnDestroy {
    protected itemService: ItemService<T>;
    protected messageService: MessageService;
    /**
     * i18n root for all localizations. The i18n root key is suffixed with
     * either `.edit` or `.create`, depending on the usage of the component.
     */
    i18nRoot: string;
    animateBack: boolean;
    subtitle?: string;
    /**
     * i18n key for the localizations.
     */
    i18n: string;
    form$: Observable<UntypedFormGroup | null>;
    /**
     * To handle the case of receiving a negative response during creation an item
     */
    disabled$: Observable<boolean>;
    constructor(itemService: ItemService<T>, messageService: MessageService);
    save(form: UntypedFormGroup): void;
    protected notify(item: T | undefined, action: string): void;
    protected setI18nRoot(item?: T): void;
    back(event: MouseEvent, card: CardComponent<any>): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormComponent<any>, "cx-org-form", never, { "i18nRoot": "i18nRoot"; "animateBack": "animateBack"; "subtitle": "subtitle"; }, {}, never, ["[main]"], false, never>;
}
