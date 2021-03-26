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
import { ConfiguratorUISettings } from '../../../config/configurator-ui-settings';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-input-field',
  templateUrl: './configurator-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeInputFieldComponent
  extends ConfiguratorAttributeBaseComponent
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
  private readonly FALLBACK_DEBOUNCE_TIME = 500;

  /**
   * @param {ConfiguratorUISettings} config Optional configuration for debounce time,
   * if omitted {@link FALLBACK_DEBOUNCE_TIME} is used instead.
   */
  constructor(protected config?: ConfiguratorUISettings) {
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
            this.config?.rulebasedConfigurator.inputDebounceTime ??
              this.FALLBACK_DEBOUNCE_TIME
          )
        )
      )
      .subscribe(() => this.onChange());
  }

  /**
   * Triggered when the user input has been changed
   */
  onChange(): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        userInput: this.attributeInputForm.value,
      },
    };

    this.inputChange.emit(event);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
