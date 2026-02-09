/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsNavigationComponent, TranslatePipe } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationUIComponent } from '../navigation/navigation-ui.component';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'cx-category-navigation',
  templateUrl: './category-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NavigationUIComponent, NgClass, AsyncPipe, TranslatePipe],
})
export class CategoryNavigationComponent {
  node$: Observable<NavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );

  data$: Observable<CmsNavigationComponent> = this.componentData.data$;

  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService
  ) {}
}
