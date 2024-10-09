/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeatureConfigService, useFeatureStyles } from '@spartacus/core';
import { PickupOption } from '@spartacus/pickup-in-store/root';

/**
 * The presentational component of a pair of radio buttons for pickup options for a product.
 */
@Component({
  selector: 'cx-pickup-options',
  templateUrl: './pickup-options.component.html',
})
export class PickupOptionsComponent implements OnChanges {
  /** The selected option, either `'pickup'` or `'delivery'`. */
  @Input() selectedOption: PickupOption;
  /** The location to display in the pickup option. */
  @Input() displayPickupLocation: string | undefined;

  // /** Disable Radio Buttons */
  @Input() disableControls = false;

  /** Emitted when the selected option is changed. */
  // TODO: Remove the 'PickupOption' type when the `a11yDialogTriggerRefocus` feature flag is removed.
  @Output() pickupOptionChange = new EventEmitter<
    { option: PickupOption; triggerElement: ElementRef } | PickupOption
  >();

  /** Emitted when a new store should be selected. */
  // TODO: Remove the undefined type when the `a11yDialogTriggerRefocus` feature flag is removed.
  @Output() pickupLocationChange = new EventEmitter<ElementRef | undefined>();

  @ViewChild('dialogTriggerEl') triggerElement: ElementRef;

  private featureConfigService = inject(FeatureConfigService);

  pickupId = `pickup-id:${Math.random().toString(16)}`;
  deliveryId = `delivery-id:${Math.random().toString(16)}`;

  pickupOptionsForm = new FormGroup({
    pickupOption: new FormControl<PickupOption | null>(null),
  });

  constructor() {
    useFeatureStyles('a11yDeliveryMethodFieldset');
  }

  ngOnChanges(): void {
    if (this.disableControls) {
      this.pickupOptionsForm.get('pickupOption')?.disable();
    }
    this.pickupOptionsForm.markAllAsTouched();
    this.pickupOptionsForm.get('pickupOption')?.setValue(this.selectedOption);
  }

  /** Emit a new selected option. */
  onPickupOptionChange(option: PickupOption): void {
    if (this.featureConfigService.isEnabled('a11yDialogTriggerRefocus')) {
      this.pickupOptionChange.emit({
        option,
        triggerElement: this.triggerElement,
      });
    } else {
      this.pickupOptionChange.emit(option);
    }
  }

  /** Emit to indicate a new store should be selected. */
  onPickupLocationChange(): boolean {
    if (this.featureConfigService.isEnabled('a11yDialogTriggerRefocus')) {
      this.pickupLocationChange.emit(this.triggerElement);
    } else {
      this.pickupLocationChange.emit();
    }
    // Return false to stop `onPickupOptionChange` being called after this
    return false;
  }
}
