/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormsModule } from "@angular/forms";
import { EventService, GlobalMessageService, GlobalMessageType, I18nModule } from "@spartacus/core";
import { LaunchDialogService, ICON_TYPE, IconModule, FocusConfig, KeyboardFocusModule, DatePickerModule, FormRequiredAsterisksComponent } from "@spartacus/storefront";
import { GetSubscriptionByCodeReloadEvent, SubscriptionBillingFacade } from "@spartacus/subscription-billing/root";
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'cx-extend-subscription-dialog',
    templateUrl: './extend-subscription-dialog.component.html',
    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule, FormsModule, DatePickerModule, NgSelectModule, FormRequiredAsterisksComponent]
})
export class ExtendSubscriptionDialog {
    private launchDialogService = inject(LaunchDialogService);
    private subscriptionBillingService = inject(SubscriptionBillingFacade);
    private globalMessageService = inject(GlobalMessageService);
    private eventService = inject(EventService);
    
    dateFormControl = new FormControl<string>(Date.now().toString());
    iconTypes = ICON_TYPE;
    extendDuration: number;
    isUnlimitedDurationSelected: boolean = false;
    isExtendSubscriptionBtnClicked: boolean = false;
    isExtensionEffectiveDateAvailable: boolean = false;
    extensionEffectiveDate: string;
    subscriptionContractFrequency: string;
    extendFrequencyMaxOptions: { 
        [key: string]: number 
    } = require('./extend-subscription-frequency-dropdown-options.json');
    extendDurationOptions: number[];
    
    focusConfig: FocusConfig = {
        trap: true,
        block: true,
        autofocus: true,
        focusOnEscape: true,
    };

    ngOnInit(): void {
        this.launchDialogService.data$.subscribe((data) => {
            this.subscriptionContractFrequency = data;
            this.extendDurationOptions = Array.from({ length: this.extendFrequencyMaxOptions[data] }, (_, i) => i + 1);
        });
    }

    onExtendSubscription(): void {
        this.isExtendSubscriptionBtnClicked = true;
        this.subscriptionBillingService.getSubscriptionExtensionEffectiveDate(
            this.extendDuration,
            this.isUnlimitedDurationSelected
        ).subscribe((extensionEffectiveDate) => {
            this.extensionEffectiveDate = extensionEffectiveDate.subscriptionEndAt;
            this.isExtensionEffectiveDateAvailable = true;
        }, (error) => {
            this.errorHandler(error);
        });
    }

    onConfirmExtendSubscription(): void {
        let confirmedExtendDuration = this.isUnlimitedDurationSelected ? 0 : this.extendDuration;
        this.subscriptionBillingService.extendSubscription(
            confirmedExtendDuration,
            this.isUnlimitedDurationSelected
        ).subscribe(
            () => {
                this.globalMessageService.add(
                    { key: 'extendSubscription.extendedSuccessfully' },
                    GlobalMessageType.MSG_TYPE_CONFIRMATION
                );
                this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
                this.close('extendSubscription.extendedSuccessfully');
            }, (error) => {
                this.errorHandler(error);
            }
        );
    }

    onExtendDurationChange(duration: number): void {
        this.extendDuration = duration;
    }

    errorHandler(error: any): void {
        this.globalMessageService.add(
            error?.details[0]?.message,
            GlobalMessageType.MSG_TYPE_ERROR
        );
        this.close('extendSubscription.failed');
    }

    close(reason: string): void {
        this.launchDialogService.closeDialog(reason);
    }
}