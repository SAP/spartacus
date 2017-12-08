import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CmsService } from '../../data/cms.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'y-dynamic-slot,[y-dynamic-slot]',
  templateUrl: './dynamic-slot.component.html',
  styleUrls: ['./dynamic-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSlotComponent implements OnInit,  OnDestroy {

    currentSlot$: Observable<any>;;

    @Input() position: string;
    @Input() limit: number;
    @Input() contextParameters: any;
    @Input() componentClass: string;

    constructor(
        private cmsService: CmsService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.currentSlot$ = this.cmsService.getSlotSubscription(this.position);
    }

    ngOnDestroy() {
    }
}