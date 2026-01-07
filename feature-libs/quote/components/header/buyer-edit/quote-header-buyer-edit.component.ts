/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FeatureToggles, TranslatePipe } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

export interface SaveEvent {
  name?: string;
  description?: string;
  purchaseOrderNumber?: string;
}

export interface EditCard {
  name: string;
  description: string;
  purchaseOrderNumber?: string;
  charactersLimit?: number;
}

@Component({
  selector: 'cx-quote-header-buyer-edit',
  templateUrl: './quote-header-buyer-edit.component.html',
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    TranslatePipe,
  ],
})
export class QuoteHeaderBuyerEditComponent implements OnInit {
  iconTypes = ICON_TYPE;
  editForm: FormGroup = new FormGroup({});

  @Output()
  saveCard: EventEmitter<SaveEvent> = new EventEmitter();
  @Output()
  cancelCard: EventEmitter<any> = new EventEmitter();

  @Input()
  content: EditCard;

  private featureToggles = inject(FeatureToggles);
  enablePurchaseOrderNumber =
    this.featureToggles.enableQuotePurchaseOrderNumber;

  /**
   * Cancels the view of the edit card tile.
   */
  cancel(): void {
    this.cancelCard.emit();
  }

  /**
   * Saves the edited card tile by throwing the save event
   * with the edit mode set to 'false' and the edited data.
   */
  save(): void {
    const event: SaveEvent = {};

    Object.keys(this.editForm.controls).forEach((control) => {
      if (this.editForm.get(control)?.dirty) {
        const value = this.editForm.get(control)?.value;
        Object.defineProperty(event, control, {
          value: value,
        });
      }
    });

    this.saveCard.emit(event);
  }

  protected getCharactersLeft(
    formControlName: string,
    charactersLimit: number
  ): number {
    return (
      charactersLimit - (this.editForm.get(formControlName)?.value?.length || 0)
    );
  }

  protected defineFormControl(formControlName: string, value: string) {
    this.editForm.addControl(
      formControlName,
      new FormControl<string | null>(null)
    );
    this.editForm.get(formControlName)?.setValue(value);
  }

  ngOnInit() {
    this.defineFormControl('name', this.content.name);
    this.defineFormControl('description', this.content.description);
    if (this.enablePurchaseOrderNumber) {
      this.defineFormControl(
        'purchaseOrderNumber',
        this.content.purchaseOrderNumber ?? ''
      );
    }
  }
}
