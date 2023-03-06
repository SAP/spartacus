import { Component, OnInit } from '@angular/core';
import { CmsPageTitleComponent, PageMetaService } from '@spartacus/core';
import { CmsComponentData, PageTitleComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-cdp-page-title',
  templateUrl: './cdp-page-title.component.html',
  styleUrls: ['./cdp-page-title.component.css']
})
export class CdpPageTitleComponent extends PageTitleComponent  implements OnInit {

  constructor(
    public component: CmsComponentData<CmsPageTitleComponent>,
    protected pageMetaService: PageMetaService
  ) {
    super(component,pageMetaService);
  }

  ngOnInit(): void {
    // this.setTitle();
}

// private setTitle(): void {
//   // this.title$ = userAccount.myAccount.label;
// }

}
