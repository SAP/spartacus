import { Component } from '@angular/core';
import { CmsNavigationComponent } from '@spartacus/core';
import { NavigationNode, CmsComponentData, NavigationService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-cdp-navigation',
  templateUrl: './cdp-navigation.component.html',
  styleUrls: ['./cdp-navigation.component.css']
})
export class CdpNavigationComponent {
  node$: Observable<NavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );

  data$: Observable<CmsNavigationComponent> = this.componentData.data$;


  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService
  ) {}
}

