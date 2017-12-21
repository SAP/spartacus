import { Component, ViewChild, ElementRef } from '@angular/core';
import { AbstractCmsComponent } from '../abstract-cms-component';

@Component({
    selector: 'y-paragraph',
    templateUrl: './paragraph.component.html',
    styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent extends AbstractCmsComponent {

    @ViewChild('dataContainer') dataContainer: ElementRef;

    protected fetchData() {
        super.fetchData();
        if (this.component && this.component.content) {
            this.dataContainer.nativeElement.innerHTML = this.component.content;
        }
    }
}
