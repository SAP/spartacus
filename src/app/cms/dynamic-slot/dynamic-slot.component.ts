import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CmsModelService } from '../../data/cms-model.service';


@Component({
  selector: 'y-dynamic-slot',
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
        this.dataSubscription = this.cmsModel.getSubscription(this.position).subscribe((slot) => {
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

    private loadComponents(slot) {
        
        if (!slot) {
            this.model = null;
        }else {
            this.model = slot;
        }
        
        // if (this.hasNoChanges(slot)) {
        //     return;
        // }
        
        // this.getActiveSlot().components = [];
        // for (let component of slot.components) {
        //     let componentData = component;
        //     this.getActiveSlot().components.push(componentData);
        // }
        
        // // once we have recreated the slot, we mark the component tree
        this.changeDetector.markForCheck();
    }

}