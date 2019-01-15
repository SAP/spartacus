import { Component } from '@angular/core';
import { CmsSiteContextSelectorComponent } from '@spartacus/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';

@Component({
  selector: 'cx-site-context-selector',
  template: 'site context'
})
export class SiteContextSelectorComponent {
  constructor(
    public component: CmsComponentData<CmsSiteContextSelectorComponent>
  ) {}
}
