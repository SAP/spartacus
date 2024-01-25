/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getLocaleId } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  isDevMode,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  FeatureConfigService,
  LoggerService,
  TranslationService,
} from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { timer } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import {
  ConfiguratorAttributeNumericInputFieldService,
  ConfiguratorAttributeNumericInterval,
} from './configurator-attribute-numeric-input-field.component.service';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';

class DefaultSettings {
  numDecimalPlaces: number;
  numTotalLength: number;
  negativeAllowed: boolean;
}

@Component({
  selector: 'cx-configurator-attribute-numeric-input-field',
  templateUrl: './configurator-attribute-numeric-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeNumericInputFieldComponent
  extends ConfiguratorAttributeInputFieldComponent
  implements OnInit, OnDestroy
{
  numericFormatPattern: string;
  locale: string;
  iconType = ICON_TYPE;
  intervals: ConfiguratorAttributeNumericInterval[] = [];
  language: string;

  protected logger = inject(LoggerService);

  constructor(
    configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
    config: ConfiguratorUISettingsConfig,
    translation: TranslationService,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    configuratorCommonsService: ConfiguratorCommonsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfigService: FeatureConfigService
  );

  /**
   * @deprecated since 6.2
   */
  constructor(
    configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
    config: ConfiguratorUISettingsConfig,
    translation: TranslationService,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    configuratorCommonsService: ConfiguratorCommonsService
  );

  // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
  constructor(
    protected configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
    protected config: ConfiguratorUISettingsConfig,
    protected translation: TranslationService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    @Optional()
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService,
    // TODO:(CXSPA-3392) for next major release remove feature config service
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {
    super(
      config,
      attributeComponentContext,
      configuratorCommonsService,
      configuratorStorefrontUtilsService
    );
    this.language = attributeComponentContext.language;
  }

  /**
   * Do we need to display a validation message
   */
  mustDisplayValidationMessage(): boolean {
    const wrongFormat: boolean =
      (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
      this.attributeInputForm.errors?.wrongFormat;

    return wrongFormat;
  }

  /**
   * Do we need to display a validation message concerning intervals
   */
  mustDisplayIntervalMessage(): boolean {
    const intervalNotMet: boolean =
      (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
      this.attributeInputForm.errors?.intervalNotMet;
    return intervalNotMet;
  }

  ngOnInit() {
    this.initializeValidation();

    if (this.attribute.userInput) {
      this.attributeInputForm.setValue(this.attribute.userInput);
    }

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

  protected initializeValidation() {
    //locales are available as 'languages' in the commerce backend
    this.locale = this.getInstalledLocale(this.language);

    let numDecimalPlaces = this.attribute.numDecimalPlaces;
    let numTotalLength = this.attribute.numTotalLength;
    let negativeAllowed = this.attribute.negativeAllowed;

    if (
      numDecimalPlaces === undefined ||
      numTotalLength === undefined ||
      negativeAllowed === undefined
    ) {
      //This won't happen in environments with the standard configurators deployed, as numeric
      //attributes do carry these settings. We still introduce default values to ease development
      //of extension use cases, but log a warning
      const defaultSettings = this.getDefaultSettings();
      numDecimalPlaces = defaultSettings.numDecimalPlaces;
      numTotalLength = defaultSettings.numTotalLength;
      negativeAllowed = defaultSettings.negativeAllowed;
      if (isDevMode()) {
        this.logger.warn(
          'Meta data for numeric attribute not present, falling back to defaults'
        );
      }
    }
    if (this.attribute.intervalInDomain) {
      this.intervals =
        this.configAttributeNumericInputFieldService.getIntervals(
          this.attribute.values
        );
    }

    const numberFormatValidator =
      this.configAttributeNumericInputFieldService.getNumberFormatValidator(
        this.locale,
        numDecimalPlaces,
        numTotalLength,
        negativeAllowed
      );

    // TODO (CXSPA-3392): for next major release remove feature level
    const validatorArray = this.featureConfigService?.isLevel('6.2')
      ? [
          numberFormatValidator,
          this.configAttributeNumericInputFieldService.getIntervalValidator(
            this.locale,
            numDecimalPlaces,
            numTotalLength,
            negativeAllowed,
            this.intervals,
            this.attribute.userInput
          ),
        ]
      : [numberFormatValidator];

    this.attributeInputForm = new UntypedFormControl('', validatorArray);

    this.numericFormatPattern =
      this.configAttributeNumericInputFieldService.getPatternForValidationMessage(
        numDecimalPlaces,
        numTotalLength,
        negativeAllowed,
        this.locale
      );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * Returns a concatenated help text for multiple intervals.
   */
  getHelpTextForInterval(): string {
    let intervalText = '';
    let concatenatedIntervalText = '';

    this.intervals.forEach((interval, index) => {
      intervalText = this.getIntervalText(interval);
      if (index > 0) {
        intervalText =
          intervalText.charAt(0).toLowerCase() + intervalText.slice(1);
        this.translation
          .translate('configurator.a11y.combinedIntervalsText', {
            combinedInterval: concatenatedIntervalText,
            newInterval: intervalText,
          })
          .pipe(take(1))
          .subscribe((text) => (concatenatedIntervalText = text));
      } else {
        concatenatedIntervalText = intervalText;
      }
    });

    return concatenatedIntervalText.trim();
  }

  /**
   * Returns the combined aria text for attribute and value and the interval help text
   */
  getAriaLabelComplete(): string {
    let completeAriaText = '';
    if (this.attribute.userInput?.length === 0) {
      this.translation
        .translate('configurator.a11y.valueOfAttributeBlank', {
          attribute: this.attribute.label,
        })
        .pipe(take(1))
        .subscribe((text) => (completeAriaText = text));
    } else {
      this.translation
        .translate('configurator.a11y.valueOfAttributeFull', {
          value: this.attribute.userInput,
          attribute: this.attribute.label,
        })
        .pipe(take(1))
        .subscribe((text) => (completeAriaText = text));
    }

    completeAriaText += ' ';
    completeAriaText += this.getHelpTextForInterval();

    return completeAriaText;
  }

  protected getIntervalText(
    interval: ConfiguratorAttributeNumericInterval
  ): string {
    let intervalText = '';
    let formattedMinValue = '';
    let formattedMaxValue = '';

    if (interval.minValue) {
      formattedMinValue =
        this.configAttributeNumericInputFieldService.formatIntervalValue(
          interval.minValue,
          this.attribute.numDecimalPlaces,
          this.locale
        );
    }
    if (interval.maxValue) {
      formattedMaxValue =
        this.configAttributeNumericInputFieldService.formatIntervalValue(
          interval.maxValue,
          this.attribute.numDecimalPlaces,
          this.locale
        );
    }

    if (interval.minValue && interval.maxValue) {
      if (interval.minValue === interval.maxValue) {
        this.translation
          .translate('configurator.a11y.numericIntervalSingleValue', {
            value: formattedMinValue,
          })
          .pipe(take(1))
          .subscribe((text) => (intervalText = text));
        return intervalText;
      }
      intervalText = this.getTextForRealInterval(
        formattedMinValue,
        formattedMaxValue,
        intervalText,
        interval
      );
    } else {
      intervalText = this.getTextForPartialInterval(
        interval,
        intervalText,
        formattedMinValue,
        formattedMaxValue
      );
    }
    return intervalText;
  }

  protected getTextForPartialInterval(
    interval: ConfiguratorAttributeNumericInterval,
    intervalText: string,
    formattedMinValue: string,
    formattedMaxValue: string
  ) {
    if (interval.minValue) {
      if (interval.minValueIncluded) {
        intervalText = this.getInfiniteIntervalText(
          'configurator.a11y.numericInfiniteIntervalMinValueIncluded',
          formattedMinValue
        );
      } else {
        intervalText = this.getInfiniteIntervalText(
          'configurator.a11y.numericInfiniteIntervalMinValue',
          formattedMinValue
        );
      }
    } else {
      if (interval.maxValue) {
        if (interval.maxValueIncluded) {
          intervalText = this.getInfiniteIntervalText(
            'configurator.a11y.numericInfiniteIntervalMaxValueIncluded',
            formattedMaxValue
          );
        } else {
          intervalText = this.getInfiniteIntervalText(
            'configurator.a11y.numericInfiniteIntervalMaxValue',
            formattedMaxValue
          );
        }
      }
    }
    return intervalText;
  }

  protected getTextForRealInterval(
    formattedMinValue: string,
    formattedMaxValue: string,
    intervalText: string,
    interval: ConfiguratorAttributeNumericInterval
  ) {
    let textToReturn = intervalText;
    this.translation
      .translate('configurator.a11y.numericIntervalStandard', {
        minValue: formattedMinValue,
        maxValue: formattedMaxValue,
      })
      .pipe(take(1))
      .subscribe((text) => (textToReturn = text));

    if (!interval.minValueIncluded || !interval.maxValueIncluded) {
      if (!interval.minValueIncluded && !interval.maxValueIncluded) {
        textToReturn += ' ';
        textToReturn += this.getAdditionalIntervalText(
          'configurator.a11y.numericIntervalStandardOpen'
        );
      } else {
        if (!interval.minValueIncluded) {
          textToReturn += ' ';
          textToReturn += this.getAdditionalIntervalText(
            'configurator.a11y.numericIntervalStandardLowerEndpointNotIncluded'
          );
        }
        if (!interval.maxValueIncluded) {
          textToReturn += ' ';
          textToReturn += this.getAdditionalIntervalText(
            'configurator.a11y.numericIntervalStandardUpperEndpointNotIncluded'
          );
        }
      }
    }
    return textToReturn;
  }

  protected getAdditionalIntervalText(key: string): string {
    let intervalText = '';
    this.translation
      .translate(key)
      .pipe(take(1))
      .subscribe((text) => (intervalText = text));
    return intervalText;
  }

  protected getInfiniteIntervalText(key: string, value: string): string {
    let intervalText = '';
    this.translation
      .translate(key, {
        value: value,
      })
      .pipe(take(1))
      .subscribe((text) => (intervalText = text));
    return intervalText;
  }

  protected getDefaultSettings(): DefaultSettings {
    return { numDecimalPlaces: 2, numTotalLength: 6, negativeAllowed: false };
  }

  protected getInstalledLocale(locale: string): string {
    try {
      getLocaleId(locale);
      return locale;
    } catch {
      this.reportMissingLocaleData(locale);
      return 'en';
    }
  }

  protected reportMissingLocaleData(lang: string): void {
    if (isDevMode()) {
      this.logger.warn(
        `ConfigAttributeNumericInputFieldComponent: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}
