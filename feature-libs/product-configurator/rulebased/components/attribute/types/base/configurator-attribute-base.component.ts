import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorUiKeyGeneratorComponent } from './configurator-ui-key-generator.component';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ConfiguratorAttributeBaseComponent extends ConfiguratorUiKeyGeneratorComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  emitEvent(eventValue: ConfigFormUpdateEvent): void {
    this.loading$.next(true);
    this.selectionChange.emit(eventValue);
  }
}
