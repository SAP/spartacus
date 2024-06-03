/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  CustomerTicketingConfig,
  CustomerTicketingFacade,
  MAX_ENTRIES_FOR_ATTACHMENT,
  MAX_INPUT_CHARACTERS,
  MAX_INPUT_CHARACTERS_FOR_SUBJECT,
  MAX_SIZE_FOR_ATTACHMENT,
} from '@spartacus/customer-ticketing/root';
import {
  FilesFormValidators,
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';

@Directive()
export abstract class CustomerTicketingDialogComponent {
  iconTypes = ICON_TYPE;
  form: FormGroup;
  inputCharactersLimit: number = this.getInputCharactersLimit;
  inputCharactersForSubject: number = this.getInputCharactersForSubject;
  isDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  get messagesCharacterLeft(): number {
    return (
      this.inputCharactersLimit - (this.form.get('message')?.value?.length || 0)
    );
  }

  get subjectCharacterLeft(): number {
    return (
      this.inputCharactersForSubject -
      (this.form.get('subject')?.value?.length || 0)
    );
  }

  get allowedTypes(): string[] | undefined {
    return this.customerTicketingConfig.customerTicketing
      ?.attachmentRestrictions?.allowedTypes;
  }

  get getInputCharactersLimit(): number {
    return (
      this.customerTicketingConfig.customerTicketing?.inputCharactersLimit ??
      MAX_INPUT_CHARACTERS
    );
  }

  get getInputCharactersForSubject(): number {
    return (
      this.customerTicketingConfig.customerTicketing
        ?.inputCharactersLimitForSubject ?? MAX_INPUT_CHARACTERS_FOR_SUBJECT
    );
  }

  get maxSize(): number {
    return (
      this.customerTicketingConfig.customerTicketing?.attachmentRestrictions
        ?.maxSize ?? MAX_SIZE_FOR_ATTACHMENT
    );
  }

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Click outside of the window');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected customerTicketingConfig: CustomerTicketingConfig,
    protected filesFormValidators: FilesFormValidators,
    protected customerTicketingFacade: CustomerTicketingFacade,
    protected routingService: RoutingService
  ) {}

  protected buildForm(): void {
    const form = new FormGroup({});
    form.setControl(
      'message',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.inputCharactersLimit),
      ])
    );
    form.setControl(
      'file',
      new FormControl('', [
        this.filesFormValidators.maxSize(this.maxSize),
        this.filesFormValidators.maxEntries(MAX_ENTRIES_FOR_ATTACHMENT),
        this.filesFormValidators.allowedTypes(this.allowedTypes),
      ])
    );
    this.form = form;
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
