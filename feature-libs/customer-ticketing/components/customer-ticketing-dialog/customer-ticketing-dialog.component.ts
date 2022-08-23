import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAX_INPUT_CHARACTERS } from '@spartacus/customer-ticketing/core';
import {
  CustomerTicketingConfig,
  CustomerTicketingDialogType,
} from '@spartacus/customer-ticketing/root';
import {
  FilesFormValidators,
  FocusConfig,
  FormUtils,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';

export interface CustomerTicketingDialogOptions {
  layoutOption: string;
}

@Component({
  selector: 'cx-customer-ticketing-dialog',
  templateUrl: './customer-ticketing-dialog.component.html',
})
export class CustomerTicketingDialogComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  iconTypes = ICON_TYPE;
  customerTicketingDialogType = CustomerTicketingDialogType;
  form: FormGroup;
  inputCharactersLimit: number = this.getInputCharactersLimit;
  layOutOption: string;

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
    return this.customerTicketingConfig.customerTicketing
      ?.attachmentRestrictions?.allowedTypes;
  }

  get getInputCharactersLimit(): number {
    return (
      this.customerTicketingConfig.customerTicketing?.inputCharactersLimit ||
      MAX_INPUT_CHARACTERS
    );
  }

  get maxSize(): number | undefined {
    return this.customerTicketingConfig.customerTicketing
      ?.attachmentRestrictions?.maxSize;
  }

  get maxEntries(): number | undefined {
    return this.customerTicketingConfig.customerTicketing
      ?.attachmentRestrictions?.maxEntries;
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

    this.subscription.add(
      this.launchDialogService.data$.subscribe(
        (data: CustomerTicketingDialogOptions) => {
          this.layOutOption = data.layoutOption;
        }
      )
    );
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      // TODO: close or reopen request api call
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
