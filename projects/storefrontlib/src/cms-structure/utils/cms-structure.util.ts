import { ValueProvider } from '@angular/core';
import { CmsStructureConfig, provideConfig } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';
import { CmsStructureOptions } from './cms-structure.model';

/**
 * Helper function to simplify the creation of static CMS structure (`CmsStructureConfig`).
 *
 * The function can create a structure for components, page slot and page template. The
 * following example adds a component to a page slot for a specific page template:
 *
 * ```ts
 * provideCmsStructure({
 *   componentId: 'LastVisited',
 *   pageSlotPosition: techEdSlots.LastVisitedSlot,
 *   pageTemplate: 'ProductDetailTemplate',
 * }),
 * ```
 *
 * @param options.componentId component identifier is used to provide component structure
 * @param options.pageSlotPosition page slot position is used to provide the slot configuration
 * @param options.pageTemplate the page template is used to provide the page slot to the given page template
 * @param options.section the section is used to provide the page slot to the given section
 * @param options.breakpoint the breakpoint is used to provide the page slot for a specific breakpoint
 */
export function provideCmsStructure(
  options: CmsStructureOptions
): ValueProvider {
  return provideConfig({
    ...buildCmsStructure(options),
    ...buildLayoutConfig(options),
  });
}

/**
 * @private
 */
function buildCmsStructure(options: CmsStructureOptions): CmsStructureConfig {
  const config: CmsStructureConfig = { cmsStructure: {} };

  if (options.componentId) {
    config.cmsStructure = {
      components: {
        [options.componentId]: {
          typeCode: options.componentId,
          flexType: options.componentId,
        },
      },
    };
  }

  if (options.componentId && options.pageSlotPosition) {
    config.cmsStructure.slots = {
      [options.pageSlotPosition]: { componentIds: [options.componentId] },
    };
  }
  return config;
}

/**
 * @private
 */
function buildLayoutConfig(options: CmsStructureOptions): LayoutConfig {
  const layoutConfig: LayoutConfig = {};
  if (options.pageTemplate && options.pageSlotPosition) {
    const pageTemplateSlots: any = {};
    if (options.breakpoint) {
      pageTemplateSlots[options.breakpoint] = {
        slots: [options.pageSlotPosition],
      };
    } else {
      pageTemplateSlots.slots = [options.pageSlotPosition];
    }
    layoutConfig.layoutSlots = {
      [options.pageTemplate]: pageTemplateSlots,
    };
  }

  if (options.section && options.pageSlotPosition) {
    const sectionSlots: any = {};
    if (options.breakpoint) {
      sectionSlots[options.breakpoint] = { slots: [options.pageSlotPosition] };
    } else {
      sectionSlots.slots = [options.pageSlotPosition];
    }

    layoutConfig.layoutSlots = {
      [options.section]: sectionSlots,
    };
  }
  return layoutConfig;
}
