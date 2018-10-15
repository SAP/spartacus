import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../../store';

@Component({
  selector: 'y-dynamic-slot',
  templateUrl: './dynamic-slot.component.html',
  styleUrls: ['./dynamic-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSlotComponent implements OnInit, OnDestroy {
  currentSlot$: Observable<any>;

  @Input()
  position: string;
  @Input()
  limit: number;
  @Input()
  contextParameters: any;
  @Input()
  componentClass: string;

  constructor(private store: Store<fromStore.CmsState>) {}

  ngOnInit() {
    this.currentSlot$ = this.store.pipe(
      select(fromStore.currentSlotSelectorFactory(this.position)),
      filter(Boolean)
    );
  }

  ngOnDestroy() {}
}
