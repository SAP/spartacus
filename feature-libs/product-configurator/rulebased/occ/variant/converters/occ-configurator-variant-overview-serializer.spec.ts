import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from '../../../core/model/configurator.model';
import { OccConfiguratorVariantOverviewSerializer } from './occ-configurator-variant-overview-serializer';

const CONFIG_ID = '13334';
const PRODUCT_CODE = 'PRODUCT';
const GROUP_ID = 'GROUP_2';
const OVERVIEW_SOURCE: Configurator.Overview = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
};
const OVERVIEW_ATTRIBUTE_FILTERS: Configurator.OverviewFilter[] = [
  Configurator.OverviewFilter.PRICE_RELEVANT,
];

const OVERVIEW_GROUP_FILTERS: string[] = ['1', GROUP_ID];

describe('OccConfiguratorVariantSerializer', () => {
  let classUnderTest: OccConfiguratorVariantOverviewSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorVariantOverviewSerializer],
    });

    classUnderTest = TestBed.inject(
      OccConfiguratorVariantOverviewSerializer as Type<OccConfiguratorVariantOverviewSerializer>
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('convert', () => {
    it('should convert ID', () => {
      const targetOv: OccConfigurator.Overview =
        classUnderTest.convert(OVERVIEW_SOURCE);
      expect(targetOv.id).toBe(CONFIG_ID);
    });
    it('should convert product code', () => {
      const targetOv: OccConfigurator.Overview =
        classUnderTest.convert(OVERVIEW_SOURCE);
      expect(targetOv.productCode).toBe(PRODUCT_CODE);
    });
  });

  describe('convertAttributeFilters', () => {
    it('should convert a filter to OCC format and mark it as selected', () => {
      const occFilters = classUnderTest['convertAttributeFilters'](
        OVERVIEW_ATTRIBUTE_FILTERS
      );
      expect(occFilters.length).toBe(1);
      const occFilter = occFilters[0];
      expect(occFilter.selected).toBe(true);
    });
    it('should put OCC filter key correctly', () => {
      const occFilters = classUnderTest['convertAttributeFilters'](
        OVERVIEW_ATTRIBUTE_FILTERS
      );
      expect(occFilters.length).toBe(1);
      const occFilter = occFilters[0];
      expect(occFilter.key).toBe(
        OccConfigurator.OverviewFilterEnum.PRICE_RELEVANT
      );
    });
    it('should cover an undefined list of filters', () => {
      const occFilters = classUnderTest['convertAttributeFilters'](undefined);
      expect(occFilters.length).toBe(0);
    });
  });

  describe('convertGroupFilters', () => {
    it('should convert a filter to OCC format and mark it as selected', () => {
      const occFilters = classUnderTest['convertGroupFilters'](
        OVERVIEW_GROUP_FILTERS
      );
      expect(occFilters.length).toBe(2);
      const occFilter = occFilters[0];
      expect(occFilter.selected).toBe(true);
    });
    it('should put OCC filter key correctly', () => {
      const occFilters = classUnderTest['convertGroupFilters'](
        OVERVIEW_GROUP_FILTERS
      );
      expect(occFilters.length).toBe(2);
      const occFilter = occFilters[1];
      expect(occFilter.key).toBe(GROUP_ID);
    });
    it('should cover an undefined list of filters', () => {
      const occFilters = classUnderTest['convertGroupFilters'](undefined);
      expect(occFilters.length).toBe(0);
    });
  });
});
