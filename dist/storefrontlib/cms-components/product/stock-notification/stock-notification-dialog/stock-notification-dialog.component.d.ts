import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NotificationPreference, UserInterestsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FocusConfig } from '../../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { LaunchDialogService } from '../../../../layout/index';
import * as i0 from "@angular/core";
export declare class StockNotificationDialogComponent implements OnInit, OnDestroy {
    private interestsService;
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    private subscription;
    subscribeSuccess$: Observable<boolean>;
    enabledPrefs: NotificationPreference[];
    focusConfig: FocusConfig;
    handleClick(event: UIEvent): void;
    constructor(interestsService: UserInterestsService, launchDialogService: LaunchDialogService, el: ElementRef);
    close(reason?: any): void;
    ngOnInit(): void;
    init(subscribeSuccess$: Observable<boolean>, enabledPrefs: NotificationPreference[]): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StockNotificationDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StockNotificationDialogComponent, "cx-stock-notification-dialog", never, {}, {}, never, never, false, never>;
}
