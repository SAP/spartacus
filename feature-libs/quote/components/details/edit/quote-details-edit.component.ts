/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ICON_TYPE } from '@spartacus/storefront';

export interface EditEvent {
  editMode: boolean;
  name?: string;
  description?: string;
}

export interface EditCard {
  name: string;
  description: string;
  charactersLimit?: number;
}

@Component({
  selector: 'cx-quote-details-edit',
  templateUrl: './quote-details-edit.component.html',
})
export class QuoteDetailsEditComponent implements OnInit {
  iconTypes = ICON_TYPE;
  editForm: UntypedFormGroup = new UntypedFormGroup({});

  @Output()
  editCard: EventEmitter<EditEvent> = new EventEmitter();
  @Output()
  cancelCard: EventEmitter<any> = new EventEmitter();

  @Input()
  content: EditCard;

  /**
   * Cancels the view of the edit card tile
   * by throwing the edit event with the edit mode set to 'false'.
   */
  cancel(): void {
    this.cancelCard.emit();
  }

  /**
   * Saves the edited card tile by throwing the edit event
   * with the edit mode set to 'false' and the edited data.
   */
  save(): void {
    const event: EditEvent = {
      editMode: false,
    };

    Object.keys(this.editForm.controls).forEach((control) => {
      if (this.editForm.get(control)?.touched) {
        const value = this.editForm.get(control)?.value;
        if (value) {
          Object.defineProperty(event, control, {
            value: value,
          });
        }
        this.editForm.get(control)?.markAsUntouched();
        this.editForm.get(control)?.markAsPristine();
      }
    });

    // The edit event will be emitted if the event object contains greater or equal than 2 attributes
    if (Object.getOwnPropertyNames(event).length >= 2) {
      this.editCard.emit(event);
    }
  }

  protected getCharactersLeft(
    formControlName: string,
    charactersLimit: number
  ): number {
    return (
      charactersLimit - (this.editForm.get(formControlName)?.value?.length || 0)
    );
  }

  constructor() {
    // Intentional empty constructor
  }

  protected defineUntypedFormControl(formControlName: string, value: string) {
    this.editForm.addControl(formControlName, new UntypedFormControl(''));
    this.editForm.get(formControlName)?.setValue(value);
  }

  ngOnInit() {
    this.defineUntypedFormControl('name', this.content.name);
    this.defineUntypedFormControl('description', this.content.description);
  }
}
