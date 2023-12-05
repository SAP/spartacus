import { OnDestroy, OnInit } from '@angular/core';
import { FeatureConfigService, LoggerService, TranslationService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import { ConfiguratorAttributeNumericInputFieldService, ConfiguratorAttributeNumericInterval } from './configurator-attribute-numeric-input-field.component.service';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
declare class DefaultSettings {
    numDecimalPlaces: number;
    numTotalLength: number;
    negativeAllowed: boolean;
}
export declare class ConfiguratorAttributeNumericInputFieldComponent extends ConfiguratorAttributeInputFieldComponent implements OnInit, OnDestroy {
    protected configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService;
    protected config: ConfiguratorUISettingsConfig;
    protected translation: TranslationService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService | undefined;
    protected featureConfigService?: FeatureConfigService | undefined;
    numericFormatPattern: string;
    locale: string;
    iconType: typeof ICON_TYPE;
    intervals: ConfiguratorAttributeNumericInterval[];
    language: string;
    protected logger: LoggerService;
    constructor(configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService, config: ConfiguratorUISettingsConfig, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService, configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService, featureConfigService: FeatureConfigService);
    /**
     * @deprecated since 6.2
     */
    constructor(configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService, config: ConfiguratorUISettingsConfig, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    /**
     * Do we need to display a validation message
     */
    mustDisplayValidationMessage(): boolean;
    /**
     * Do we need to display a validation message concerning intervals
     */
    mustDisplayIntervalMessage(): boolean;
    ngOnInit(): void;
    protected initializeValidation(): void;
    ngOnDestroy(): void;
    /**
     * Returns a concatenated help text for multiple intervals.
     */
    getHelpTextForInterval(): string;
    /**
     * Returns the combined aria text for attribute and value and the interval help text
     */
    getAriaLabelComplete(): string;
    protected getIntervalText(interval: ConfiguratorAttributeNumericInterval): string;
    protected getTextForPartialInterval(interval: ConfiguratorAttributeNumericInterval, intervalText: string, formattedMinValue: string, formattedMaxValue: string): string;
    protected getTextForRealInterval(formattedMinValue: string, formattedMaxValue: string, intervalText: string, interval: ConfiguratorAttributeNumericInterval): string;
    protected getAdditionalIntervalText(key: string): string;
    protected getInfiniteIntervalText(key: string, value: string): string;
    protected getDefaultSettings(): DefaultSettings;
    protected getInstalledLocale(locale: string): string;
    protected reportMissingLocaleData(lang: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeNumericInputFieldComponent, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeNumericInputFieldComponent, "cx-configurator-attribute-numeric-input-field", never, {}, {}, never, never, false, never>;
}
export {};
