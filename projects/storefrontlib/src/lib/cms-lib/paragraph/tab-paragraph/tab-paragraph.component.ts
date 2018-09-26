import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ParagraphComponent } from '../paragraph.component';

@Component({
  selector: 'y-tab-paragraph',
  templateUrl: '../paragraph.component.html',
  styleUrls: ['../paragraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabParagraphComponent extends ParagraphComponent {
  protected initSubscription(): void {
    this.subscription = this.cmsService
      .getComponentData(this.uid, true)
      .subscribe(component => {
        this.component = component;
        this.fetchData();
      });
  }
}
