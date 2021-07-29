import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Optional,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeTypeUtilsService } from '../base/configurator-attribute-type-utils.service';

@Component({
  selector: 'cx-configurator-attribute-input-field',
  templateUrl: './configurator-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeInputFieldComponent
  implements OnInit, OnDestroy {
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

  // TODO(#13286): make ConfiguratorAttributeTypeUtilsService a required dependency
  constructor(
    config: ConfiguratorUISettingsConfig,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configAttributeTypeUtilsService: ConfiguratorAttributeTypeUtilsService
  );

  /**
   * @deprecated since 4.1
   */
  constructor(config: ConfiguratorUISettingsConfig);

  constructor(
    protected config: ConfiguratorUISettingsConfig,
    @Optional()
    protected configAttributeTypeUtilsService?: ConfiguratorAttributeTypeUtilsService
  ) {}

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
            this.config?.productConfigurator?.updateDebounceTime?.input ??
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

  /**
   * Creates unique key for config attribute to be sent to configurator.
   *
   * @param {Configurator.Attribute} currentAttribute - Attribute
   * @return {string} - Generated attribute ID
   */
  createAttributeIdForConfigurator(
    currentAttribute: Configurator.Attribute
  ): string | undefined {
    return this.configAttributeTypeUtilsService?.createAttributeIdForConfigurator(
      currentAttribute
    );
  }

  /**
   * Creates unique key for attribute 'aria-labelledby'.
   *
   * @param {string} prefix - Prefix
   * @param {string} attributeId - Attribute ID
   * @param {string} valueId - Value ID
   * @param {boolean} hasQuantity - Has quantity
   * @return {string} - Generated UI key for 'aria-labelledby'
   */
  createAriaLabelledBy(
    prefix: string,
    attributeId: string,
    valueId?: string,
    hasQuantity?: boolean
  ): string | undefined {
    return this.configAttributeTypeUtilsService?.createAriaLabelledBy(
      prefix,
      attributeId,
      valueId,
      hasQuantity
    );
  }
}
