/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsNavigationComponent, I18nModule } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationService } from '../navigation/navigation.service';
import { NavigationUIComponent } from '../navigation/navigation-ui.component';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-footer-navigation',
    templateUrl: './footer-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NavigationUIComponent,
        NgClass,
        AsyncPipe,
        I18nModule,
    ],
})
export class FooterNavigationComponent {
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
