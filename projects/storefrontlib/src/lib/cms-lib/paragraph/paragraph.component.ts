import { Component } from '@angular/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { CmsParagraphComponent } from '@spartacus/core';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent {
  constructor(public component: CmsComponentData<CmsParagraphComponent>) {}
}
