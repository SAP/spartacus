import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Configurator,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../service/config-ui-key-generator.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: 'cx-config-attribute-header',
  templateUrl: './config-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeHeaderComponent {
  constructor(
    private uiKeyGen: ConfigUIKeyGeneratorService,
    private configuratorGroupsService: ConfiguratorGroupsService
  ) {}

  iconTypes = ICON_TYPE;

  @Input() attribute: Configurator.Attribute;
  @Input() owner: GenericConfigurator.Owner;
  @Input() groupId: string;

  showRequiredMessage(): Observable<boolean> {
    return this.configuratorGroupsService
      .isGroupVisited(this.owner, this.groupId)
      .pipe(take(1),
        map(result => {
          if (
            (this.owner.type === GenericConfigurator.OwnerType.CART_ENTRY ||
              result) &&
            this.attribute.required &&
            this.attribute.incomplete &&
            this.attribute.uiType !== Configurator.UiType.NOT_IMPLEMENTED
          ) {
            return true;
          }
          return false;
        }));
  }

  isSingleSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  isMultiSelection(): boolean {
    switch (this.attribute.uiType) {
      case Configurator.UiType.CHECKBOX:
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        return true;
      }
    }
    return false;
  }

  getRequiredMessageKey(): string {
    if (this.isSingleSelection()) {
      return 'configurator.attribute.singleSelectRequiredMessage';
    } else if (this.isMultiSelection()) {
      return 'configurator.attribute.multiSelectRequiredMessage';
    }
    return;
  }

  get uiKeyGenerator() {
    return this.uiKeyGen;
  }
}
