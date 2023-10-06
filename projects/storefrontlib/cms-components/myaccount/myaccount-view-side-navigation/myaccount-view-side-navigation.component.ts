/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { User, CmsNavigationComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationNode, NavigationService } from '../../navigation';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CmsComponentData } from '@spartacus/storefront';

@Component({
  selector: 'cx-myaccount-view-side-navigation',
  templateUrl: './myaccount-view-side-navigation.component.html',
})
export class MyaccountViewSideNavigationComponent{
  user$: Observable<User | undefined>;
  node$: Observable<NavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );

  styleClass$: Observable<string | undefined> = this.componentData.data$.pipe(
    map((d) => d?.styleClass)
  );

  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService
  ) {}
}
