import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParagraphComponent extends AbstractCmsComponent {
  paragraphData: string;

  protected fetchData(): void {
    if (this.component && this.component.content) {
      this.paragraphData = this.component.content;
    }
    super.fetchData();
  }
}
