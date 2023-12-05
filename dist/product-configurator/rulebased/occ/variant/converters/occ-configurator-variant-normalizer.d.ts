import { Converter, OccConfig, TranslationService } from '@spartacus/core';
import { ConfiguratorUISettingsConfig } from '../../../components/config/configurator-ui-settings.config';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantNormalizer implements Converter<OccConfigurator.Configuration, Configurator.Configuration> {
    protected config: OccConfig;
    protected translation: TranslationService;
    protected uiSettingsConfig: ConfiguratorUISettingsConfig;
    /**
     * @deprecated since 6.2
     */
    static readonly RETRACT_VALUE_CODE = "###RETRACT_VALUE_CODE###";
    constructor(config: OccConfig, translation: TranslationService, uiSettingsConfig: ConfiguratorUISettingsConfig);
    convert(source: OccConfigurator.Configuration, target?: Configurator.Configuration): Configurator.Configuration;
    convertGroup(source: OccConfigurator.Group, groupList: Configurator.Group[], flatGroupList: Configurator.Group[]): void;
    getGroupId(key: string, name: string): string;
    convertAttribute(sourceAttribute: OccConfigurator.Attribute, attributeList: Configurator.Attribute[]): void;
    setSelectedSingleValue(attribute: Configurator.Attribute): void;
    protected isRetractValueSelected(sourceAttribute: OccConfigurator.Attribute): boolean;
    protected setRetractValueDisplay(attributeType: Configurator.UiType, value: Configurator.Value): void;
    protected hasSourceAttributeConflicts(sourceAttribute: OccConfigurator.Attribute): boolean;
    protected isSourceAttributeTypeReadOnly(sourceAttribute: OccConfigurator.Attribute): boolean;
    protected isRetractBlocked(sourceAttribute: OccConfigurator.Attribute): boolean;
    protected addRetractValue(sourceAttribute: OccConfigurator.Attribute, values: Configurator.Value[]): void;
    convertValue(occValue: OccConfigurator.Value, values: Configurator.Value[]): void;
    convertImage(occImage: OccConfigurator.Image, images: Configurator.Image[]): void;
    convertAttributeType(sourceAttribute: OccConfigurator.Attribute): Configurator.UiType;
    protected determineCoreUiType(sourceType: string): string;
    convertGroupType(groupType: OccConfigurator.GroupType): Configurator.GroupType;
    setGroupDescription(group: Configurator.Group): void;
    convertImageType(imageType: OccConfigurator.ImageType): Configurator.ImageType;
    convertImageFormatType(formatType: OccConfigurator.ImageFormatType): Configurator.ImageFormatType;
    compileAttributeIncomplete(attribute: Configurator.Attribute): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantNormalizer>;
}
