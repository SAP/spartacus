import { ElementRef, OnDestroy, OnInit, QueryList } from '@angular/core';
import { AsmCustomer360Data, AsmCustomer360TabConfig, AsmCustomer360Facade, AsmCustomerOverview } from '@spartacus/asm/customer-360/root';
import { CsAgentAuthService } from '@spartacus/asm/root';
import { GlobalMessageType, Image, UrlCommand, User } from '@spartacus/core';
import { DirectionService, FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AsmCustomer360Config } from '../config/asm-customer-360-config';
import * as i0 from "@angular/core";
export declare class AsmCustomer360Component implements OnDestroy, OnInit {
    protected asmCustomer360Config: AsmCustomer360Config;
    protected asmCustomer360Facade: AsmCustomer360Facade;
    protected launchDialogService: LaunchDialogService;
    protected csAgentAuthService: CsAgentAuthService;
    protected directionService: DirectionService;
    role: string;
    modal: boolean;
    labelledby: string;
    describedby: string;
    tabHeaderItems: QueryList<ElementRef<HTMLElement>>;
    readonly cartIcon = ICON_TYPE.CART;
    readonly closeIcon = ICON_TYPE.CLOSE;
    readonly orderIcon = ICON_TYPE.ORDER;
    readonly ticketIcon = ICON_TYPE.FILE;
    globalMessageType: typeof GlobalMessageType;
    focusConfig: FocusConfig;
    tabs: Array<AsmCustomer360TabConfig>;
    activeTab: number;
    currentTab: AsmCustomer360TabConfig;
    customer: User;
    asmCustomer360Tabs$: Observable<Array<AsmCustomer360Data | undefined>>;
    customerOverview$: Observable<AsmCustomerOverview | undefined>;
    protected subscription: Subscription;
    protected showErrorAlert$: BehaviorSubject<boolean>;
    protected showErrorTab$: BehaviorSubject<boolean>;
    constructor(asmCustomer360Config: AsmCustomer360Config, asmCustomer360Facade: AsmCustomer360Facade, launchDialogService: LaunchDialogService, csAgentAuthService: CsAgentAuthService, directionService: DirectionService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    errorAlert$: Observable<boolean>;
    errorTab$: Observable<boolean>;
    /**
     * Triggered when a tab is selected.
     * @param {number} selectedTab selected tab index
     */
    selectTab(selectedTab: number): void;
    /**
     *  Update tab focus when key is pressed
     * @param {KeyboardEvent} event
     * @param {number} selectedIndex current tab index
     */
    switchTab(event: KeyboardEvent, selectedIndex: number): void;
    /**
     * If there is a link within the modal, use this method to redirect the user and close the modal.
     */
    navigateTo(route: UrlCommand): void;
    closeErrorAlert(): void;
    closeModal(reason?: any): void;
    getAvatarText(customer?: User): string;
    getAvatarImage(overview?: AsmCustomerOverview): Image | undefined;
    /**
     * Update tabIndex for each tab: select tab becomes 0 and other tabs will be -1
     * this is for prevent tabbing within tabs
     * @param {number} selectedIndex - selected tab index
     */
    protected updateTabIndex(selectedIndex: number): void;
    protected setTabData(): void;
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    protected isForwardsNavigation(event: KeyboardEvent): boolean;
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    protected isBackNavigation(event: KeyboardEvent): boolean;
    protected isLTRDirection(): boolean;
    protected isRTLDirection(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360Component, "cx-asm-customer-360", never, {}, {}, never, never, false, never>;
}
