/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import { Tab, TAB_MODE, TabComponent, TabConfig } from '@spartacus/storefront';
import { Subscription, take } from 'rxjs';
import { PickupOptionsTabs } from './pickup-options.model';

/**
 * The presentational component of a pair of radio buttons for pickup options for a product.
 */
@Component({
  selector: 'cx-pickup-options',
  templateUrl: './pickup-options.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickupOptionsComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  protected subscription = new Subscription();
  /** The selected option, either `'pickup'` or `'delivery'`. */
  @Input() selectedOption: PickupOption;
  /** The location to display in the pickup option. */
  @Input() displayPickupLocation: string | undefined;

  // /** Disable Radio Buttons */
  @Input() disableControls = false;

  /** Emitted when the selected option is changed. */
  @Output() pickupOptionChange = new EventEmitter<{
    option: PickupOption;
    triggerElement: ElementRef;
  }>();

  /** Emitted when a new store should be selected. */
  @Output() pickupLocationChange = new EventEmitter<ElementRef>();

  @ViewChild('dialogTriggerEl') triggerElement: ElementRef;

  pickupId = `pickup-id:${Math.random().toString(16)}`;
  deliveryId = `delivery-id:${Math.random().toString(16)}`;

  pickupOptionsForm = new FormGroup({
    pickupOption: new FormControl<PickupOption | null>(null),
  });
  tabs: Tab[];
  tabConfig: TabConfig;

  @Optional() protected cdr = inject(ChangeDetectorRef, {
    optional: true,
  });

  @ViewChild('deliveryTabPanel') deliveryTabPanel: TemplateRef<any>;
  @ViewChild('pickupTabPanel') pickupTabPanel: TemplateRef<any>;
  @ViewChild(TabComponent) tabComponent: TabComponent | undefined;

  get validationError() {
    if (this.selectedOption === 'pickup' && !this.displayPickupLocation) {
      return 'pickupOptions.storeIsNotSelected';
    }

    return null;
  }

  ngOnChanges(): void {
    this.onSelectedOptionChange();
  }

  ngAfterViewInit() {
    this.initializeTabs();
    this.subscription.add(
      this.tabComponent?.openTabs$.subscribe((openTabs) => {
        // open tabs should have one tab opened for mode "TAB"
        const openedTab = openTabs[0];
        const selectedOption =
          openedTab === PickupOptionsTabs.DELIVERY ? 'delivery' : 'pickup';
        if (this.selectedOption !== selectedOption) {
          this.onPickupOptionChange(selectedOption);
        }
      })
    );
  }

  /** Emit a new selected option. */
  onPickupOptionChange(option: PickupOption): void {
    this.pickupOptionChange.emit({
      option,
      triggerElement: this.triggerElement,
    });
  }

  /** Emit to indicate a new store should be selected. */
  onPickupLocationChange(): boolean {
    this.pickupLocationChange.emit(this.triggerElement);

    // Return false to stop `onPickupOptionChange` being called after this
    return false;
  }

  protected initializeTabs() {
    this.tabs = [
      {
        headerKey: 'pickupOptions.shipIt',
        content: this.deliveryTabPanel,
        id: PickupOptionsTabs.DELIVERY,
      },
      {
        headerKey: 'pickupOptions.pickup',
        content: this.pickupTabPanel,
        id: PickupOptionsTabs.PICKUP,
        disableBorderFocus: true,
      },
    ];
    this.tabConfig = {
      label: 'pickupOptions.legend',
      openTabs: [
        this.selectedOption === 'delivery'
          ? PickupOptionsTabs.DELIVERY
          : PickupOptionsTabs.PICKUP,
      ],
    };
    this.cdr?.detectChanges();
  }

  protected onSelectedOptionChange() {
    if (!this.tabComponent) {
      return;
    }
    this.tabComponent.openTabs$.pipe(take(1)).subscribe((openTabs) => {
      const openedTab = openTabs[0];
      const shouldBeOpened =
        this.selectedOption === 'delivery'
          ? PickupOptionsTabs.DELIVERY
          : PickupOptionsTabs.PICKUP;
      if (openedTab !== shouldBeOpened) {
        this.tabComponent?.select(shouldBeOpened, TAB_MODE.TAB);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
