import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-input-field',
  templateUrl: './configurator-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeInputFieldComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit, OnDestroy
{
  attributeInputForm = new FormControl('');
  protected sub: Subscription;

  @Input() ownerType: CommonConfigurator.OwnerType;
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() inputChange = new EventEmitter<ConfigFormUpdateEvent>();

  /**
   * In case no config is injected, or when the debounce time is not configured at all,
   * this value will be used as fallback.
   */
  protected readonly FALLBACK_DEBOUNCE_TIME = 500;

  constructor(protected config: ConfiguratorUISettingsConfig) {
    super();
  }

  ngOnInit() {
    this.attributeInputForm.setValue(this.attribute.userInput);
    if (
      this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
      this.attribute.required &&
      this.attribute.incomplete &&
      !this.attributeInputForm.value
    ) {
      this.attributeInputForm.markAsTouched();
    }
    this.sub = this.attributeInputForm.valueChanges
      .pipe(
        debounce(() =>
          timer(
            this.config.productConfigurator?.updateDebounceTime?.input ??
              this.FALLBACK_DEBOUNCE_TIME
          )
        )
      )
      .subscribe(() => this.onChange());
  }

  onChange(): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        userInput: this.attributeInputForm.value,
      },
    };

    if (!this.attributeInputForm.invalid) {
      this.inputChange.emit(event);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
