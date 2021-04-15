import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { FormControl } from '@angular/forms';

@Directive()
export abstract class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  // TODO(#11681): make quantityService a required dependency
  /**
   * default constructor
   * @param {ConfiguratorAttributeQuantityService} quantityService
   */
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(quantityService: ConfiguratorAttributeQuantityService);

  /**
   * @deprecated since 3.3
   */
  constructor();

  constructor(
    protected quantityService?: ConfiguratorAttributeQuantityService
  ) {
    super();
  }

  /**
   * Checks if we are supposed to render a quantity control, which
   * can be derived from the attribute meta data
   *
   * @return {boolean} - Display quantity picker?
   */
  get withQuantity(): boolean {
    return (
      this.quantityService?.withQuantity(
        this.attribute?.dataType ?? Configurator.DataType.NOT_IMPLEMENTED,
        this.attribute?.uiType ?? Configurator.UiType.NOT_IMPLEMENTED
      ) ?? false
    );
  }

  /**
   * Checks if quantity control should be disabled
   *
   * @return {boolean} - Disable quantity picker?
   */
  get disableQuantityActions(): boolean {
    return (
      this.quantityService?.disableQuantityActions(
        this.attribute?.selectedSingleValue
      ) ?? true
    );
  }

  onSelect(value: string): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.selectionChange.emit(event);
  }

  onHandleQuantity(quantity: any): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
    };

    this.selectionChange.emit(event);
  }

  onChangeQuantity(eventObject: any): void {
    if (!eventObject) {
      this.onSelect('');
    } else {
      this.onHandleQuantity(eventObject);
    }
  }

  protected getInitialQuantity(form: FormControl | undefined): number {
    const quantity: number = this.attribute.quantity ?? 0;

    if (form) {
      return form?.value !== '0' ? quantity : 0;
    } else {
      return this.attribute?.selectedSingleValue ? quantity : 0;
    }
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {FormControl} form - Form control
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    form: FormControl | undefined
  ): ConfiguratorAttributeQuantityComponentOptions {
    const initialQuantity = this.getInitialQuantity(form);
    const disableQuantityActions$ = this.loading$.pipe(
      map((loading) => {
        return loading || this.disableQuantityActions;
      })
    );

    return {
      allowZero: !this.attribute?.required,
      initialQuantity: initialQuantity,
      disableQuantityActions$: disableQuantityActions$,
    };
  }

  /**
   * Extract corresponding price formula parameters
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attribute?.quantity,
      price: this.getSelectedValuePrice(),
      priceTotal: this.attribute?.attributePriceTotal,
      isLightedUp: true,
    };
  }

  protected getSelectedValuePrice(): Configurator.PriceDetails | undefined {
    return this.attribute?.values?.find((value) => value?.selected)?.valuePrice;
  }
}
