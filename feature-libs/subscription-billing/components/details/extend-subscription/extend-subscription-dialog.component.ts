/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EventService, GlobalMessageService, GlobalMessageType, I18nModule } from "@spartacus/core";
import { LaunchDialogService, ICON_TYPE, IconModule, FocusConfig, KeyboardFocusModule } from "@spartacus/storefront";
import { GetSubscriptionByCodeReloadEvent, SubscriptionBillingFacade } from "@spartacus/subscription-billing/root";

@Component({
    selector: 'cx-extend-subscription-dialog',
    templateUrl: './extend-subscription-dialog.component.html',
    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule, FormsModule]
})
export class ExtendSubscriptionDialog {
    private launchDialogService = inject(LaunchDialogService);
    private subscriptionBillingService = inject(SubscriptionBillingFacade);
    private globalMessageService = inject(GlobalMessageService);
    private eventService = inject(EventService);

    iconTypes = ICON_TYPE;
    extendDuration: number;
    isUnlimitedDurationSelected: boolean = false;
    isExtendSubscriptionBtnClicked: boolean = false;
    isExtensionEffectiveDateAvailable: boolean = false;
    extensionEffectiveDate: string;
    subscriptionContractFrequency: string;
    
    focusConfig: FocusConfig = {
        trap: true,
        block: true,
        autofocus: true,
        focusOnEscape: true,
    };

    ngOnInit(): void {
        this.launchDialogService.data$.subscribe((data) => {
            this.subscriptionContractFrequency = data;
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