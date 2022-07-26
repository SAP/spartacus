import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { ICON_TYPE } from 'projects/storefrontlib/cms-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageDetails, AttachmentValidity } from './messaging.model';

@Component({
  selector: 'cx-messaging',
  templateUrl: './messaging.component.html',
})
export class MessagingComponent implements OnInit, AfterViewInit {
  @Input() messageDetails$: Observable<MessageDetails>;
  @Input() scrollToInput?: boolean = true;
  @Input() attachmentValidity?: AttachmentValidity;

  iconTypes = ICON_TYPE;
  messageTextLimit: number = 2000;
  messageText: string = '';

  get inputCharacterLeft(): Observable<number> {
    return this.messageDetails$.pipe(
      map(
        (details) =>
          (details.characterLimit || this.messageTextLimit) -
          this.messageText.length
      )
    );
  }
  constructor(protected windowRef: WindowRef) {}

  ngOnInit(): void {
    this.attachmentValidity = this.attachmentValidity ?? {
      maxSize: 1,
      maxEntries: 1,
      allowedTypes: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv',
        '.csv',
        '.pdf',
        '.doc',
      ],
    };
  }

  ngAfterViewInit(): void {
    if (this.scrollToInput) {
      setTimeout(() => {
        this.windowRef.document
          .getElementsByClassName('cx-message-footer-label')[0]
          ?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 500);
    }
  }

  getIntitials(name: string) {
    const names = name.split(' ');
    return `${names[0]?.split('')[0]}${names[1] ? names[1]?.split('')[0] : ''}`;
  }
}
