import { TestBed } from '@angular/core/testing';
import { CmsStructureConfig } from '@spartacus/core';
import { BREAKPOINT, LayoutConfig } from '../../layout/config/layout-config';
import { provideCmsStructure } from './cms-structure.util';

describe('provideCmsStructure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should not fail with undefined options', () => {
    const provider = provideCmsStructure(undefined);
    const value: CmsStructureConfig = provider.useValue;
    expect(value.cmsStructure).toEqual({});
  });

  describe('components', () => {
    it('should not have slot structure', () => {
      const provider = provideCmsStructure({});
      const value: CmsStructureConfig = provider.useValue;
      expect(value.cmsStructure.components).toBeUndefined();
    });

    it('should have component structure', () => {
      const provider = provideCmsStructure({ componentId: 'TestComponent' });
      const value: CmsStructureConfig = provider.useValue;
      expect(value.cmsStructure.components.TestComponent).toEqual({
        typeCode: 'TestComponent',
        flexType: 'TestComponent',
      });
    });
  });

  describe('slots', () => {
    it('should not have slot structure', () => {
      const provider = provideCmsStructure({ componentId: 'TestComponent' });
      const value: CmsStructureConfig = provider.useValue;
      expect(value.cmsStructure.slots).toBeUndefined();
    });

    it('should not have slot structure', () => {
      const provider = provideCmsStructure({ pageSlotPosition: 'pos-1' });
      const value: CmsStructureConfig = provider.useValue;
      expect(value.cmsStructure.slots).toBeUndefined();
    });

    it('should have slot structure', () => {
      const provider = provideCmsStructure({
        pageSlotPosition: 'TestPosition',
        componentId: 'TestComponent',
      });
      const value: CmsStructureConfig = provider.useValue;
      expect(value.cmsStructure.slots).toBeDefined();
      expect(value.cmsStructure.slots.TestPosition).toEqual({
        componentIds: ['TestComponent'],
      });
    });
  });

  describe('page template', () => {
    it('should not have page template structure', () => {
      const provider = provideCmsStructure({
        pageSlotPosition: 'TestPosition',
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots).toBeUndefined();
    });

    it('should not have page template structure', () => {
      const provider = provideCmsStructure({
        pageTemplate: 'TestTemplate',
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots).toBeUndefined();
    });

    it('should have page template with slot position', () => {
      const provider = provideCmsStructure({
        pageSlotPosition: 'TestPosition',
        pageTemplate: 'TestTemplate',
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots.TestTemplate).toEqual({
        slots: ['TestPosition'],
      });
    });

    it('should have page template with responsive slot position', () => {
      const provider = provideCmsStructure({
        pageSlotPosition: 'TestPosition',
        pageTemplate: 'TestTemplate',
        breakpoint: BREAKPOINT.lg,
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots.TestTemplate).toEqual({
        lg: { slots: ['TestPosition'] },
      });
    });
  });

  describe('section', () => {
    it('should not have section', () => {
      const provider = provideCmsStructure({
        pageSlotPosition: 'TestPosition',
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots).toBeUndefined();
    });

    it('should not have section', () => {
      const provider = provideCmsStructure({
        section: 'TestSection',
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots).toBeUndefined();
    });

    it('should have section with slot position', () => {
      const provider = provideCmsStructure({
        pageSlotPosition: 'TestPosition',
        section: 'TestSection',
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots.TestSection).toEqual({
        slots: ['TestPosition'],
      });
    });

    it('should have section with responsive slot position', () => {
      const provider = provideCmsStructure({
        pageSlotPosition: 'TestPosition',
        section: 'TestSection',
        breakpoint: BREAKPOINT.lg,
      });
      const value: LayoutConfig = provider.useValue;
      expect(value.layoutSlots.TestSection).toEqual({
        lg: { slots: ['TestPosition'] },
      });
    });
  });
});
