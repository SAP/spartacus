import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';

@Component({
  selector: 'y-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
