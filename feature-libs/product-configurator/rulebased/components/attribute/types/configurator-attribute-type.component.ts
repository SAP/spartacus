import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConfigFormUpdateEvent } from '../../form/configurator-form.event';
import { ConfiguratorCommonsService } from './../../../core/facade/configurator-commons.service';
import { Configurator } from './../../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-attribute-type',
  templateUrl: './configurator-attribute-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeTypeComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() configuration: Configurator.Configuration;
  @Input() currentGrouo: Configurator.Group;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();
  activeLanguage$: Observable<string> = this.languageService.getActive();
  uiType = Configurator.UiType;
  constructor(
    protected languageService: LanguageService,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  updateConfiguration(event: ConfigFormUpdateEvent): void {
    this.configuratorCommonsService.updateConfiguration(
      event.ownerKey,
      event.changedAttribute,
      event.updateType
    );
  }
}
