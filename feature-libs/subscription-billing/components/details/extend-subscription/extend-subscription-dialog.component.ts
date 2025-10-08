/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { EventService, GlobalMessageService, GlobalMessageType } from "@spartacus/core";
import { LaunchDialogService, ICON_TYPE, FocusConfig } from "@spartacus/storefront";
import { GetSubscriptionByCodeReloadEvent, SubscriptionBillingFacade, UNLIMITED_EXTEND_DURATION_OPTION_VALUE } from "@spartacus/subscription-billing/root";

@Component({
    selector: 'cx-extend-subscription-dialog',
    templateUrl: './extend-subscription-dialog.component.html',
    standalone: false,
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
    extendDurationOptions: string[];
    UNLIMITED_DURATION = 'Unlimited';
    
    focusConfig: FocusConfig = {
        trap: true,
        block: true,
        autofocus: true,
        focusOnEscape: true,
    };

    ngOnInit(): void {
        this.launchDialogService.data$.subscribe((data) => {
            this.subscriptionContractFrequency = data;
            const maxOptions = this.extendFrequencyMaxOptions[data] + 1; // +1 to include the unlimited duration option
            this.extendDurationOptions = Array.from(
                { length: maxOptions },
                (_, i) => (i + 1 === maxOptions ? this.UNLIMITED_DURATION :
                             (i + 1).toString() + ' ' + this.subscriptionContractFrequency)
            );
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
        const confirmedExtendDuration = this.isUnlimitedDurationSelected ? UNLIMITED_EXTEND_DURATION_OPTION_VALUE : this.extendDuration;
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

    onExtendDurationChange(durationSelected: string): void {
        const duration = durationSelected.split(' ')[0];
        if (duration === this.UNLIMITED_DURATION) {
            this.isUnlimitedDurationSelected = true;
        } else {
            this.isUnlimitedDurationSelected = false;
            this.extendDuration = parseInt(duration, 10);
        }
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