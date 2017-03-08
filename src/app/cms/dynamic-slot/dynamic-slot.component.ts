import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CmsModelService } from '../../data/cms-model.service';


@Component({
  selector: 'y-dynamic-slot,[y-dynamic-slot]',
  templateUrl: './dynamic-slot.component.html',
  styleUrls: ['./dynamic-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSlotComponent implements OnInit, OnDestroy {

    model;
    dataSubscription;

    @Input() position: string;
    @Input() contextParameters: any;

    constructor(
        private cmsModel: CmsModelService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.dataSubscription = this.cmsModel.getSlotSubscription(this.position).subscribe((slot) => {
                this.loadComponents(slot);
            },
            err => console.log(err)
        );
    }

    ngOnDestroy() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    }

    protected loadComponents(slot) {
        this.model = slot;
        this.changeDetector.markForCheck();
    }

}