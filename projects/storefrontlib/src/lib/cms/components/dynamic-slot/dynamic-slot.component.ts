import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { CmsService } from '../../facade/cms.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-dynamic-slot',
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

  constructor(protected cmsService: CmsService) {}

  ngOnInit() {
    this.currentSlot$ = this.cmsService.getContentSlot(this.position);
  }

  ngOnDestroy() {}
}
