/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Optional,
} from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';

@Component({
  selector: 'cx-configurator-group-title',
  templateUrl: './configurator-group-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorGroupTitleComponent {
  @HostBinding('class.ghost') ghostStyle = true;

  displayedGroup$: Observable<Configurator.Group> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorGroupsService.getCurrentGroup(routerData.owner).pipe(
          tap(() => {
            this.ghostStyle = false;
          })
        )
      )
    );

  iconTypes = ICON_TYPE;

  //TODO(CXSPA-1014): make ConfiguratorExpertModeService a required dependency
  constructor(
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configExpertModeService: ConfiguratorExpertModeService
  );

  /**
   * @deprecated since 5.1
   */
  constructor(
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    @Optional()
    protected configExpertModeService?: ConfiguratorExpertModeService
  ) {}

  getGroupTitle(group: Configurator.Group): string | undefined {
    let title = group.description;
    if (group.groupType !== Configurator.GroupType.CONFLICT_GROUP) {
      this.configExpertModeService
        ?.getExpModeActive()
        .pipe(take(1))
        .subscribe((expMode) => {
          if (expMode) {
            title += ` / [${group.name}]`;
          }
        });
    }
    return title;
  }
}
