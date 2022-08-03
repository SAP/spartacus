import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerTicketingConfig } from '@spartacus/customer-ticketing/core';
import {
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
  messageMaxLength: number = 5000;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  get messagesCharacterLeft(): number {
    return (
      this.messageMaxLength - (this.form.get('message')?.value?.length || 0)
    );
  }

  get allowedTypes(): string[] | undefined {
    return this.customerTicketingConfig.customerTicketing?.attachmentValidity
      ?.allowedTypes;
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
    protected customerTicketingConfig: CustomerTicketingConfig
  ) {}

  ngOnInit(): void {
    this.build();
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

  protected build() {
    const form = new FormGroup({});
    form.setControl(
      'message',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.messageMaxLength),
      ])
    );
    this.form = form;
  }
}
