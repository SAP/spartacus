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
  expirationTime?: Date;
}

export interface EditCard {
  title: string;
  paragraphs: Array<{
    title: string;
    text: string;
    isTextArea?: boolean;
    charactersLimit?: number;
  }>;
}

@Component({
  selector: 'cx-quote-details-edit',
  templateUrl: './quote-details-edit.component.html',
})
export class QuoteDetailsEditComponent implements OnInit {
  iconTypes = ICON_TYPE;
  editForm: UntypedFormGroup;

  @Output()
  cancelCard: EventEmitter<number> = new EventEmitter();
  @Output()
  editCard: EventEmitter<EditEvent> = new EventEmitter();

  @Input()
  content: EditCard | null;

  @Input()
  truncateText = false;

  cancel(): void {
    const saveCardEvent: EditEvent = { editMode: false };
    this.editCard.emit(saveCardEvent);
    this.cancelCard.emit(5);
  }

  edit(): void {
    let event: EditEvent = {
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

    this.editCard.emit(event);
  }

  setFormControlName(name: string): string {
    return name.toLocaleLowerCase();
  }

  trackByIndex(index: any) {
    return index;
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

  ngOnInit() {
    this.editForm = new UntypedFormGroup({});

    this.content?.paragraphs?.forEach((paragraph) => {
      if (paragraph.title) {
        const formControlName = this.setFormControlName(paragraph.title);
        this.editForm.addControl(formControlName, new UntypedFormControl(''));
        if (paragraph.text) {
          this.editForm.get(formControlName)?.setValue(paragraph.text);
        }
      }
    });
  }
}
