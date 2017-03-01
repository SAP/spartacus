import { Component, ViewChild, ElementRef } from '@angular/core';
import { AbstractComponent } from '../../abstract-component.component';
import { CmsModelService } from '../../../../data/cms-model.service';

@Component({
    selector: 'y-cms-paragraph',
    templateUrl: './cms-paragraph.component.html',
    styleUrls: ['./cms-paragraph.component.scss']
})
export class CmsParagraphComponent extends AbstractComponent {

    @ViewChild('dataContainer') dataContainer: ElementRef;

    constructor(
        protected cmsModelService: CmsModelService
    ) {
        super(cmsModelService);
    }

    protected fetchData() {
        super.fetchData();
        if (this.data && this.data.content) {
            this.dataContainer.nativeElement.innerHTML = this.data.content;
        }
    }
}