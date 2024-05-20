/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { FilesFormValidators } from '../../../services/file/files-form-validators';
import { FileUploadComponent } from '../../form';
import {
  MessageEvent,
  MessageEventBoundItem,
  MessagingConfigs,
} from './messaging.model';

@Component({
  selector: 'cx-messaging',
  templateUrl: './messaging.component.html',
})
export class MessagingComponent implements OnInit, AfterViewChecked {
  // can be undefined if you press add message button very fast on slow network
  @ViewChild(FileUploadComponent) fileUploadComponent?: FileUploadComponent;

  @Input() messageEvents$: Observable<Array<MessageEvent>>;
  @Input() scrollToInput?: boolean = true;
  @Input() messagingConfigs?: MessagingConfigs;

  @Output() send = new EventEmitter<{
    files: File | undefined;
    message: string;
    itemId?: string;
  }>();

  @Output() itemClicked = new EventEmitter<{
    item: MessageEventBoundItem;
  }>();

  @Output() downloadAttachment = new EventEmitter<{
    messageCode: string | undefined;
    attachmentId: string | undefined;
    fileName: string | undefined;
  }>();

  iconTypes = ICON_TYPE;
  form: UntypedFormGroup;

  MAX_INPUT_CHARACTERS: number = 2000;
  MAX_SIZE: number = 10;
  MAX_ENTRIES: number = 1;
  dateFormat: string = 'MMMM d, YYYY h:mm aa';
  updatedScrollHeight: number;
  scrollOnceOnLoad: boolean = true;

  get inputCharacterLeft(): number {
    return (
      (this.messagingConfigs?.charactersLimit || this.MAX_INPUT_CHARACTERS) -
      (this.form.get('message')?.value?.length || 0)
    );
  }

  get maxSize(): number {
    return (
      this.messagingConfigs?.attachmentRestrictions?.maxSize || this.MAX_SIZE
    );
  }

  get maxEntries(): number {
    return (
      this.messagingConfigs?.attachmentRestrictions?.maxEntries ||
      this.MAX_ENTRIES
    );
  }

  get allowedTypes(): Array<string> {
    return this.messagingConfigs?.attachmentRestrictions?.allowedTypes || [];
  }

  constructor(
    protected windowRef: WindowRef,
    protected filesFormValidators: FilesFormValidators
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewChecked(): void {
    if (this.scrollToInput) {
      this.observeScroll();
      if (this.scrollOnceOnLoad) {
        this.scrollOnLoad();
      }
    }
  }

  onSend(): void {
    if (this.form.valid) {
      const event: {
        files: File | undefined;
        message: string;
        itemId?: string;
      } = {
        files: this.form.get('file')?.value,
        message: this.form.get('message')?.value,
      };
      const itemId = this.form.get('item')?.value;
      if (itemId) {
        event.itemId = itemId;
      }
      this.send.emit(event);
    }
  }

  resetForm(): void {
    this.form.reset({ item: this.messagingConfigs?.defaultItemId });
    this.fileUploadComponent?.removeFile();
  }

  triggerDownload(
    messageCode: string | undefined,
    attachmentId: string | undefined,
    fileName: string | undefined
  ): void {
    this.downloadAttachment.emit({
      messageCode: messageCode,
      attachmentId: attachmentId,
      fileName: fileName,
    });
  }

  protected buildForm(): void {
    const form = new UntypedFormGroup({});
    form.setControl(
      'message',
      new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(
          this.messagingConfigs?.charactersLimit || this.MAX_INPUT_CHARACTERS
        ),
      ])
    );
    form.setControl(
      'file',
      new UntypedFormControl('', [
        this.filesFormValidators.maxSize(this.maxSize),
        this.filesFormValidators.maxEntries(this.maxEntries),
        this.filesFormValidators.allowedTypes(this.allowedTypes),
      ])
    );
    form.setControl(
      'item',
      new UntypedFormControl(this.messagingConfigs?.defaultItemId)
    );
    this.form = form;
  }

  focusNextChild(event: UIEvent): void {
    event.preventDefault();

    const [results, focusedIndex] = [
      this.getResultElements(),
      this.getFocusedIndex(),
    ];

    if (results.length) {
      if (focusedIndex >= results.length - 1) {
        results[0].focus();
      } else {
        results[focusedIndex + 1].focus();
      }
    }
  }

  focusPreviousChild(event: UIEvent): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }

    event.preventDefault();

    const [results, focusedIndex] = [
      this.getResultElements(),
      this.getFocusedIndex(),
    ];

    if (results.length) {
      if (focusedIndex < 1) {
        results[results.length - 1].focus();
      } else {
        results[focusedIndex - 1].focus();
      }
    }
  }

  /**
   * A message can be linked to an item. In this case the item name will be prefixed to the message text.
   *
   * @param {MessageEvent} message message
   * @returns {string | undefined} message text prefixed with item name, in case its given.
   */
  getMessageText(message: MessageEvent): string | undefined {
    return message.item
      ? message.item.name + ': ' + message.text
      : message.text;
  }

  onItemClicked(item: MessageEventBoundItem): void {
    this.itemClicked.emit({
      item: item,
    });
  }

  protected observeScroll(): void {
    const element = this.windowRef.document.querySelector('.cx-messages');
    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        this.scrollToBottom(element, entries[0].target.scrollHeight);
        this.updatedScrollHeight = entries[0].target.scrollHeight;
      });
      resizeObserver.observe(element);
    }
  }

  protected scrollToBottom(element: Element, previousScrollHeight: number) {
    if (this.heightChanged(previousScrollHeight)) {
      element?.scroll({
        top: element?.scrollHeight,
        behavior: 'auto',
      });
    }
  }

  protected heightChanged(previousScrollHeight: number): boolean {
    return this.updatedScrollHeight !== previousScrollHeight;
  }

  protected scrollOnLoad() {
    const element = this.windowRef.document.getElementById('cx-message-footer');
    const resizeObserver = new ResizeObserver(() => {
      element?.scrollIntoView({ behavior: 'auto', block: 'end' });
      this.scrollOnceOnLoad = false;
    });
    if (element) {
      resizeObserver.observe(element);
    }
  }

  private getResultElements(): HTMLElement[] {
    return Array.from(
      this.windowRef.document.querySelectorAll('[role="listitem"]')
    );
  }

  private getFocusedIndex(): number {
    return this.getResultElements().indexOf(this.getFocusedElement());
  }

  private getFocusedElement(): HTMLElement {
    return <HTMLElement>this.windowRef.document.activeElement;
  }
}
