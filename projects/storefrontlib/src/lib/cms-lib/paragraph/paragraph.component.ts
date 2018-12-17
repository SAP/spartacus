import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { CmsParagraphComponent } from '@spartacus/core';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParagraphComponent {
  constructor(public component: CmsComponentData<CmsParagraphComponent>) {}
}
