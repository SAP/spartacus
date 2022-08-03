import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerTicketingConfig } from '@spartacus/customer-ticketing/core';
import {
  FilesFormValidators,
  FocusConfig,
  FormUtils,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-customer-ticketing-reopen-dialog',
  templateUrl: './customer-ticketing-reopen-dialog.component.html',
})
export class CustomerTicketingReopenDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;
  form: FormGroup;
  inputCharactersLimit: number = this.getInputCharactersLimit;

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

  get allowedTypes(): string[] | undefined {
    return this.customerTicketingConfig.customerTicketing?.attachmentValidity
      ?.allowedTypes;
  }

  get getInputCharactersLimit(): number {
    return (
      this.customerTicketingConfig.customerTicketing?.inputCharactersLimit ||
      2000
    );
  }

  get maxSize(): number | undefined {
    return this.customerTicketingConfig.customerTicketing?.attachmentValidity
      ?.maxSize;
  }

  get maxEntries(): number | undefined {
    return this.customerTicketingConfig.customerTicketing?.attachmentValidity
      ?.maxEntries;
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
    protected filesFormValidators: FilesFormValidators
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  reopenRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    }
  }

  protected buildForm() {
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
        this.filesFormValidators.maxEntries(this.maxEntries),
      ])
    );
    this.form = form;
  }
}
