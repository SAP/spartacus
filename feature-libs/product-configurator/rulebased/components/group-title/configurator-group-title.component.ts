/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import {
  ICON_TYPE,
  HamburgerMenuService,
  BREAKPOINT,
  BreakpointService,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-group-title',
  templateUrl: './configurator-group-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorGroupTitleComponent implements OnInit, OnDestroy {
  @HostBinding('class.ghost') ghostStyle = true;
  protected subscription = new Subscription();

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
  /**
   * @deprecated since 5.1
   */
  constructor(
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService
  );

  constructor(
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configExpertModeService: ConfiguratorExpertModeService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    breakpointService: BreakpointService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    hamburgerMenuService: HamburgerMenuService
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    @Optional()
    protected configExpertModeService?: ConfiguratorExpertModeService,
    @Optional()
    protected breakpointService?: BreakpointService,
    @Optional()
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService,
    @Optional()
    protected hamburgerMenuService?: HamburgerMenuService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.hamburgerMenuService?.isExpanded.subscribe((isExpanded) => {
        if (!isExpanded) {
          this.configuratorStorefrontUtilsService?.changeStyling(
            '.PreHeader',
            'display',
            'none'
          );
        } else {
          this.configuratorStorefrontUtilsService?.changeStyling(
            '.PreHeader',
            'display',
            'block'
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  /**
   * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.md`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.md` returns `true`, otherwise `false`.
   */
  isMobile(): Observable<boolean> | undefined {
    return this.breakpointService?.isDown(BREAKPOINT.md);
  }
}
