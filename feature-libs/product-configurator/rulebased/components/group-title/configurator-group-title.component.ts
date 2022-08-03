import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
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

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configExpertModeService: ConfiguratorExpertModeService
  ) {}

  getGroupTitle(group: Configurator.Group): string | undefined {
    let title = group.description;
    if (group.groupType !== Configurator.GroupType.CONFLICT_GROUP) {
      this.configExpertModeService
        .getExpMode()
        .pipe(take(1))
        .subscribe((expMode) => {
          if (expMode) {
            title += ' / [' + group.name + ']';
          }
        });
    }
    return title;
  }
}
