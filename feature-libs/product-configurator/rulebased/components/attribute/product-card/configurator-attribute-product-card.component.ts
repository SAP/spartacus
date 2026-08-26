/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FeatureDirective,
  Product,
  ProductService,
  TranslatePipe,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import {
  ConfiguratorProductScope,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  KeyboardFocusService,
  MediaComponent,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../core/facade/configurator-commons.service';
import { ConfiguratorUtilsService } from '../../../core/facade/utils/configurator-utils.service';
import { Configurator } from '../../../core/model/configurator.model';
import { QuantityUpdateEvent } from '../../form/configurator-form.event';
import {
  ConfiguratorMessageComponent,
  ConfiguratorMessageGroup,
  ConfiguratorMessagesView,
  splitMessagesBySeverity,
} from '../../message/configurator-message.component';
import {
  ConfiguratorPriceComponent,
  ConfiguratorPriceComponentOptions,
} from '../../price/configurator-price.component';
import { ConfiguratorShowMoreComponent } from '../../show-more/configurator-show-more.component';
import {
  ConfiguratorAttributeQuantityComponent,
  ConfiguratorAttributeQuantityComponentOptions,
} from '../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';

export interface ConfiguratorAttributeProductCardComponentOptions {
  /**
   * If set to `true`, all action buttons will be disabled.
   */
  disableAllButtons?: boolean;
  /** If set to `true`, the remove/deselect button won't be available. Useful for required attributes,
   *  where a deselect/remove of last value shall not be possible.  */
  hideRemoveButton?: boolean;
  fallbackFocusId?: string;
  multiSelect?: boolean;
  productBoundValue: Configurator.Value;
  singleDropdown?: boolean;
  withQuantity?: boolean;
  /**
   * Used to indicate loading state, for example in case a request triggered by parent component to CPQ is currently in progress.
   * Component will react on it and disable all controls that could cause a request.
   * This prevents the user from triggering concurrent requests with potential conflicting content that might cause unexpected behavior.
   */
  loading$?: Observable<boolean>;
  attributeId: number;
  attributeLabel?: string;
  attributeName: string;
  itemCount: number;
  itemIndex: number;
  containerRow?: Configurator.ContainerRow;
}

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    MediaComponent,
    ConfiguratorShowMoreComponent,
    ConfiguratorAttributeQuantityComponent,
    ConfiguratorPriceComponent,
    ConfiguratorMessageComponent,
    FocusDirective,
    IconComponent,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class ConfiguratorAttributeProductCardComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  protected configuratorUtilsService = inject(ConfiguratorUtilsService);
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected configRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );

  /**
   * Messages of the nested configuration that belongs to the bound container
   * row. Looked up from the row group identified by `containerRow.groupId`.
   */
  messages$: Observable<ConfiguratorMessagesView> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      ),
      map((configuration) => this.getMessages(configuration))
    );

  product$: Observable<Product>;
  loading$ = new BehaviorSubject<boolean>(true);
  /**
   * Emits `true` while either the product data is being fetched (local
   * `loading$`) or the parent component signals that a configuration update
   * round trip is in progress (`productCardOptions.loading$`). Used to disable
   * the action buttons and the quantity control.
   */
  disableActions$: Observable<boolean>;
  showDeselectionNotPossible = false;
  /**
   * Whether the container-row overflow menu is currently open.
   */
  isActionsMenuOpen = false;

  @Input()
  productCardOptions: ConfiguratorAttributeProductCardComponentOptions;

  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();
  @Output() handleRowAction =
    new EventEmitter<Configurator.ContainerRowAction>();

  constructor(
    protected productService: ProductService,
    protected keyBoardFocus: KeyboardFocusService,
    protected translation: TranslationService
  ) {
    super();
    useFeatureStyles('productConfiguratorCPQContainer');
  }
  iconType = ICON_TYPE;

  ngOnInit() {
    this.loading$.next(true);
    const productSystemId =
      this.productCardOptions.productBoundValue.productSystemId;

    this.product$ = this.productService
      .get(
        productSystemId || '',
        ConfiguratorProductScope.CONFIGURATOR_PRODUCT_CARD
      )
      .pipe(
        map((respProduct) => {
          return (
            respProduct ??
            this.transformToProductType(
              this.productCardOptions.productBoundValue
            )
          );
        }),
        catchError(() =>
          of(
            this.transformToProductType(
              this.productCardOptions.productBoundValue
            )
          )
        ),
        tap(() => this.loading$.next(false))
      );

    this.disableActions$ = this.productCardOptions.loading$
      ? combineLatest([this.loading$, this.productCardOptions.loading$]).pipe(
          map(([localLoading, parentLoading]) => localLoading || parentLoading)
        )
      : this.loading$;
  }

  get showQuantity(): boolean {
    return (
      (this.productCardOptions.withQuantity &&
        this.productCardOptions.productBoundValue.selected &&
        this.productCardOptions.multiSelect) ??
      false
    );
  }

  /**
   * Verifies whether the card should render the overflow menu. The menu is shown
   * only for selected products that define container-row actions. When the card
   * is in container context but no actions are defined, neither the menu nor
   * the default add/remove/select buttons are shown.
   *
   * @returns - overflow menu visible?
   */
  get hasContainerRowActions(): boolean {
    return (
      !!this.productCardOptions.productBoundValue?.selected &&
      !!this.productCardOptions.containerRow?.actions?.length
    );
  }

  /**
   * Whether to render ADD, REMOVE, or SELECT. These buttons are used outside
   * the container context. Available (unselected) container products keep the
   * add button. Selected container products never fall back to these buttons.
   *
   * @returns - default action buttons visible?
   */
  get showDefaultActions(): boolean {
    if (!this.productCardOptions.containerRow) {
      return true;
    }
    return !this.productCardOptions.productBoundValue?.selected;
  }

  /**
   * Actions defined on the bound container row.
   *
   * @returns - row actions
   */
  get containerRowActions(): Configurator.ContainerRowAction[] {
    return this.productCardOptions.containerRow?.actions ?? [];
  }

  /**
   * Warning and error groups of the bound container row.
   * Passed to `cx-configurator-message` for display.
   *
   * @param messages - Messages of the bound container row
   * @returns - message groups
   */
  getContainerMessageGroups(
    messages: ConfiguratorMessagesView
  ): ConfiguratorMessageGroup[] {
    return [
      {
        messages: messages.errorMessages,
        messageClass: 'cx-product-card-rows container-error-message',
        iconClass: 'container-error-symbol',
        iconType: this.iconType.ERROR,
        uiKeyPrefix: 'row-error-msg',
        role: 'alert',
      },
      {
        messages: messages.warningMessages,
        messageClass: 'cx-product-card-rows container-warning-message',
        iconClass: 'container-warning-symbol',
        iconType: this.iconType.WARNING,
        uiKeyPrefix: 'row-warning-msg',
      },
    ].filter((group) => group.messages.length > 0);
  }

  /**
   * Determines the messages to display for the bound container row.
   *
   * @param configuration - Current configuration
   * @returns Messages of the nested configuration of the bound container row
   */
  protected getMessages(
    configuration: Configurator.Configuration
  ): ConfiguratorMessagesView {
    const containerRowGroup = this.getContainerRowGroup(configuration);
    return splitMessagesBySeverity(containerRowGroup?.messages);
  }

  /**
   * Retrieves the group that carries the nested configuration of the bound
   * container row, using the row's `groupId`.
   *
   * @param configuration - Current configuration
   * @returns Container row group, or `undefined` if the row is not
   * configurable or the group cannot be found
   */
  protected getContainerRowGroup(
    configuration: Configurator.Configuration
  ): Configurator.Group | undefined {
    const groupId = this.productCardOptions.containerRow?.groupId;
    if (!groupId || !configuration.groups?.length) {
      return undefined;
    }
    return this.configuratorUtilsService.getOptionalGroupById(
      configuration.groups,
      groupId
    );
  }

  get focusConfig(): FocusConfig {
    const focusConfig = {
      key: this.createFocusId(
        this.productCardOptions.attributeId.toString(),
        this.productCardOptions.productBoundValue.valueCode
      ),
    };
    return focusConfig;
  }

  onHandleSelect(): void {
    if (
      this.productCardOptions.hideRemoveButton &&
      this.productCardOptions.fallbackFocusId
    ) {
      this.keyBoardFocus.set(this.productCardOptions.fallbackFocusId);
    }
    this.handleSelect.emit(this.productCardOptions.productBoundValue.valueCode);
  }

  onHandleDeselect(): void {
    {
      if (
        this.productCardOptions.productBoundValue.selected &&
        this.productCardOptions.hideRemoveButton
      ) {
        this.showDeselectionNotPossibleMessage();
        return;
      }
      this.handleDeselect.emit(
        this.productCardOptions.productBoundValue.valueCode
      );
    }
  }

  onChangeQuantity(eventObject: any): void {
    if (!eventObject) {
      this.onHandleDeselect();
    } else {
      this.onHandleQuantity(eventObject);
    }
  }

  /**
   * Verifies whether the product card refers to a selected value
   * @return {boolean} - Selected?
   */
  isProductCardSelected(): boolean {
    const isProductCardSelected =
      this.productCardOptions.productBoundValue &&
      this.productCardOptions.productBoundValue.selected &&
      !this.productCardOptions.singleDropdown;

    return isProductCardSelected ?? false;
  }

  /**
   * Checks if price needs to be displayed. This is the
   * case if either value price, quantity or value price total
   * are present
   * @return {boolean} - Price display?
   */
  hasPriceDisplay(): boolean {
    const productPrice =
      this.productCardOptions.productBoundValue.valuePrice ||
      this.productCardOptions.productBoundValue.quantity ||
      this.productCardOptions.productBoundValue.valuePriceTotal;

    return productPrice ? true : false;
  }

  /**
   * Extract corresponding price formula parameters
   *
   *  @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    if (!this.productCardOptions.multiSelect) {
      return {
        price: this.productCardOptions.productBoundValue.valuePrice,
        isLightedUp: this.productCardOptions.productBoundValue.selected,
      };
    }
    return {
      quantity: this.productCardOptions.productBoundValue.quantity,
      price: this.productCardOptions.productBoundValue.valuePrice,
      priceTotal: this.productCardOptions.productBoundValue.valuePriceTotal,
      isLightedUp: this.productCardOptions.productBoundValue.selected,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    const quantityFromOptions =
      this.productCardOptions.productBoundValue.quantity;

    return {
      allowZero: true,
      initialQuantity: quantityFromOptions ? quantityFromOptions : 0,
      disableQuantityActions$: this.disableActions$,
      resetToInitialQuantityOnZero:
        (this.productCardOptions.productBoundValue.selected &&
          this.productCardOptions.hideRemoveButton) ??
        false,
    };
  }

  /**
   * Verifies whether the value code is defined.
   *
   * @param {string} valueCode - Value code
   * @return {boolean} - 'true' if the value code is defined, otherwise 'false'
   */
  isValueCodeDefined(valueCode: string | null | undefined): boolean {
    return valueCode && valueCode !== Configurator.RetractValueCode
      ? true
      : false;
  }

  protected transformToProductType(
    value: Configurator.Value | undefined
  ): Product {
    return {
      code: value?.productSystemId,
      description: value?.description,
      images: {},
      name: value?.valueDisplay,
    };
  }

  protected onHandleQuantity(quantity: number): void {
    this.handleQuantity.emit({
      quantity,
      valueCode: this.productCardOptions.productBoundValue.valueCode,
    });
  }

  showDeselectionNotPossibleMessage() {
    this.showDeselectionNotPossible = true;
  }

  /**
   * Opens or closes the container-row overflow menu.
   *
   * @param event - Click event used to keep the document listener
   * from immediately closing the menu
   */
  toggleActionsMenu(event: Event): void {
    event.stopPropagation();
    this.isActionsMenuOpen = !this.isActionsMenuOpen;
  }

  /**
   * Emits the selected container-row action and closes the overflow menu.
   *
   * @param action - Selected row action
   */
  onHandleRowAction(action: Configurator.ContainerRowAction): void {
    this.closeActionsMenu();
    this.handleRowAction.emit(action);
  }

  /**
   * Resolves the i18n key for a container-row action.
   * Falls back to the action name when no translation is defined.
   *
   * @param action - Row action
   * @returns - Translation key, or the action name if none is defined
   */
  getContainerRowActionLabel(action: Configurator.ContainerRowAction): string {
    switch (action) {
      case Configurator.ContainerRowAction.DELETE:
        return 'configurator.button.remove';
      case Configurator.ContainerRowAction.EDIT:
        return 'configurator.button.edit';
      case Configurator.ContainerRowAction.COPY:
        return 'configurator.button.duplicate';
      case Configurator.ContainerRowAction.ADD:
        return 'configurator.button.add';
      default:
        return action;
    }
  }

  /**
   * Closes the container-row overflow menu. Bound to document click
   * and the Escape key.
   */
  @HostListener('document:click')
  @HostListener('document:keydown.escape')
  closeActionsMenu(): void {
    this.isActionsMenuOpen = false;
  }

  getAriaLabelSingleUnselected(product: Product): string {
    let translatedText = '';
    const index = this.productCardOptions.itemIndex + 1;
    if (
      this.isValueCodeDefined(
        this.productCardOptions?.productBoundValue?.valueCode
      )
    ) {
      if (
        this.hasPriceDisplay() &&
        this.productCardOptions.productBoundValue.valuePrice?.value !== 0
      ) {
        this.translation
          .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
            price:
              this.productCardOptions.productBoundValue.valuePriceTotal
                ?.formattedValue,
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      } else {
        this.translation
          .translate('configurator.a11y.itemOfAttributeUnselected', {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      }
    } else {
      this.translation
        .translate('configurator.a11y.selectNoItemOfAttribute', {
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }
    return translatedText;
  }

  getAriaLabelSingleSelected(product: Product): string {
    let translatedText = '';
    const index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate(
          'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice',
          {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
            price:
              this.productCardOptions.productBoundValue.valuePriceTotal
                ?.formattedValue,
          }
        )
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }

  getAriaLabelSingleSelectedNoButton(product: Product): string {
    let translatedText = '';
    const index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelectedWithPrice', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
          price:
            this.productCardOptions.productBoundValue.valuePriceTotal
              ?.formattedValue,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelected', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }

  getAriaLabelMultiSelected(product: Product): string {
    let translatedText = '';
    const index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate(
          'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice',
          {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
            price:
              this.productCardOptions.productBoundValue.valuePriceTotal
                ?.formattedValue,
          }
        )
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }

  getAriaLabelMultiUnselected(product: Product): string {
    let translatedText = '';
    const index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
          price:
            this.productCardOptions.productBoundValue.valuePriceTotal
              ?.formattedValue,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeUnselected', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }
}
