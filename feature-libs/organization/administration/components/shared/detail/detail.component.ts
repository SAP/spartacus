import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EventService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { MessageService } from '../message/services/message.service';
import { OrgMessageEvent } from '../../constants';

@Component({
  selector: 'cx-org-details',
  template: '<cx-org-card *ngIf="model$ | async as model"></cx-org-card>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
})
export class DetailsComponent<T> implements OnInit, OnDestroy {
  model$: Observable<T> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({} as T)
  );
  isInEditMode$ = this.itemService.isInEditMode$;
  subscription: Subscription;

  constructor(
    protected itemService: ItemService<T>,
    protected event?: EventService
  ) {}

  @ViewChild(MessageService, { read: MessageService })
  messageService: MessageService;

  ngOnInit() {
    this.subscription = this.event
      .get(OrgMessageEvent)
      .subscribe((message: OrgMessageEvent) =>
        this.messageService?.add(message.message)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
