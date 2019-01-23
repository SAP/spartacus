import { Component } from '@angular/core';
import { CmsLinkComponent } from '@spartacus/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';

@Component({
  selector: 'cx-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  constructor(public component: CmsComponentData<CmsLinkComponent>) {}
}
