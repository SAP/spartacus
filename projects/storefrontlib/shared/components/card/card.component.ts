/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';

export interface SaveCardEvent {
  saveMode: boolean;
  [key: string]: any;
}

export interface CardAction {
  event: string;
  name: string;
}

export interface CardLinkAction {
  link: string;
  name: string;
}

export interface Card {
  header?: string;
  title?: string;
  textBold?: string;
  text?: Array<string>;
  paragraphs?: Array<{
    title?: string;
    text?: Array<string>;
    isTextArea?: boolean;
  }>;
  img?: string;
  actions?: Array<CardAction | CardLinkAction>;
  deleteMsg?: string;
  label?: string;
  role?: string;
  customClass?: string;
}

@Component({
  selector: 'cx-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  iconTypes = ICON_TYPE;
  leftCharacters: number;
  saveForm: UntypedFormGroup;

  @Output()
  deleteCard: EventEmitter<number> = new EventEmitter();
  @Output()
  setDefaultCard: EventEmitter<number> = new EventEmitter();
  @Output()
  sendCard: EventEmitter<number> = new EventEmitter();
  @Output()
  editCard: EventEmitter<number> = new EventEmitter();
  @Output()
  cancelCard: EventEmitter<number> = new EventEmitter();
  @Output()
  saveCard: EventEmitter<SaveCardEvent> = new EventEmitter();

  @Input()
  border = false;

  @Input()
  editMode = false;

  @Input()
  saveMode = false;

  @Input()
  isDefault = false;

  @Input()
  content: Card | null;

  @Input()
  fitToContainer = false;

  @Input()
  truncateText = false;

  @Input()
  charactersLimit = 100;

  @Input()
  index: number;

  // ACTIONS

  setEditMode(): void {
    this.editMode = true;
  }

  setSaveMode(): void {
    this.saveMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.cancelCard.emit(5);
  }

  cancelSave(): void {
    this.saveMode = false;
    const saveCardEvent: SaveCardEvent = { saveMode: this.saveMode };
    this.saveCard.emit(saveCardEvent);
    this.cancelCard.emit(5);
  }

  delete(): void {
    this.deleteCard.emit(1);
  }

  setDefault(): void {
    this.isDefault = true;
    this.setDefaultCard.emit(2);
  }

  send(): void {
    this.sendCard.emit(3);
  }

  edit(): void {
    this.editCard.emit(4);
  }

  save(): void {
    this.saveMode = false;
    const saveCardEvent: SaveCardEvent = {
      saveMode: this.saveMode,
    };

    Object.keys(this.saveForm.controls).forEach((control) => {
      if (this.saveForm.get(control)?.touched) {
        const value = this.saveForm.get(control)?.value;
        if (value) {
          saveCardEvent[control] = value;
        }
        this.saveForm.get(control)?.markAsUntouched();
        this.saveForm.get(control)?.markAsPristine();
      }
    });

    this.saveCard.emit(saveCardEvent);
  }

  setFormControlName(name: string, index: number): string {
    return name.toLocaleLowerCase().replace(/\s/g, '_') + '_' + index;
  }

  isCardAction(action: CardAction | CardLinkAction): action is CardAction {
    return (action as CardAction).event !== undefined;
  }

  isCardLinkAction(
    action: CardAction | CardLinkAction
  ): action is CardLinkAction {
    return (action as CardLinkAction).link !== undefined;
  }

  protected getInputCharacterLeft(formControlName: string): number {
    return (
      this.charactersLimit -
      (this.saveForm.get(formControlName)?.value?.length || 0)
    );
  }

  constructor() {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.saveForm = new UntypedFormGroup({});

    this.content?.paragraphs?.forEach((paragraph) => {
      paragraph.text?.forEach((text, index) => {
        if (paragraph.title && text) {
          const formControlName = this.setFormControlName(
            paragraph.title,
            index
          );
          this.saveForm.addControl(formControlName, new UntypedFormControl(''));
          this.saveForm.get(formControlName)?.setValue(text);
        }
      });
    });
  }
}
