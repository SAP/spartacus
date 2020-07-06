import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { TruncateTextService } from '../../../cms-components/product/product-tabs/product-details-tab/product-description.service';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent {
  constructor(public component: CmsComponentData<CmsParagraphComponent>, public pds: TruncateTextService) {}
}
