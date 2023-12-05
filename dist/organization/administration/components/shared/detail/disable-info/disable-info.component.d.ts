import { OnInit } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../item.service';
import { BaseItem } from '../../organization.model';
import { DisableInfoService } from './disable-info.service';
import * as i0 from "@angular/core";
export declare class DisableInfoComponent<T extends BaseItem> implements OnInit {
    protected itemService: ItemService<T>;
    protected disableInfoService: DisableInfoService<T>;
    /**
     * The localization of messages is based on the i18n root. Messages are
     * concatenated to the root, such as:
     *
     * `[i18nRoot].info.disabledEdit`
     */
    i18nRoot: string;
    /**
     * To configure the messages to display and override defaultMessageConfig
     */
    displayInfoConfig: {
        disabledCreate?: boolean;
        disabledEdit?: boolean;
        disabledEnable?: boolean;
        disabledDisable?: boolean;
    };
    /**
     * Flag to enable display custom message(s) even if no condition has been met
     */
    displayCustomInfo: boolean;
    /**
     * resolves the current item.
     */
    current$: Observable<T | undefined>;
    iconTypes: typeof ICON_TYPE;
    constructor(itemService: ItemService<T>, disableInfoService: DisableInfoService<T>);
    protected get defaultInfoConfig(): {
        disabledCreate: boolean;
        disabledEdit: boolean;
        disabledEnable: boolean;
        disabledDisable: boolean;
    };
    ngOnInit(): void;
    displayDisabledCreate(item: T): boolean | undefined;
    displayDisabledEdit(item: T): boolean | undefined;
    displayDisabledEnable(item: T): boolean | undefined;
    displayDisabledDisable(item: T): boolean | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisableInfoComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DisableInfoComponent<any>, "cx-org-disable-info", never, { "i18nRoot": "i18nRoot"; "displayInfoConfig": "displayInfoConfig"; "displayCustomInfo": "displayCustomInfo"; }, {}, never, ["*"], false, never>;
}
