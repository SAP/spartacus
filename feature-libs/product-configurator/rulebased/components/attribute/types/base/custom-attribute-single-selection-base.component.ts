import { Directive, EventEmitter, Input, Output } from '@angular/core';
import {
  ConfigFormUpdateEvent,
  Configurator,
  ConfiguratorAttributeDropDownComponent,
  ConfiguratorAttributeQuantityService,
} from '@spartacus/product-configurator/rulebased';
import { BehaviorSubject } from 'rxjs';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class CustomAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeDropDownComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Input() language: string;
  @Input() ownerType: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super(quantityService);
  }
}
