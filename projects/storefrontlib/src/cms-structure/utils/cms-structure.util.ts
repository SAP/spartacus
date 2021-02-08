import { ValueProvider } from '@angular/core';
import { CmsStructureConfig, provideConfig } from '@spartacus/core';
import { LayoutConfig } from '../../layout/config/layout-config';
import { CmsStructureOptions } from './cms-structure.model';

/**
 * Helper function to simplify the creation of static CMS structure (`CmsStructureConfig`).
 * The helper function leverage the `provideConfig`, and is only providing an easy way to
 * generate the cms structure. The function creates a configuration structure for components,
 * page slot and page template. The following example adds a component to a page slot:
 *
 * ```ts
 * provideCmsStructure({
 *   componentId: 'LoginComponent',
 *   pageSlotPosition: 'SiteLogin'
 * })
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
function buildCmsStructure({
  componentId,
  pageSlotPosition,
}: CmsStructureOptions = {}): CmsStructureConfig {
  const config: CmsStructureConfig = { cmsStructure: {} };

  if (componentId) {
    config.cmsStructure = {
      components: {
        [componentId]: {
          typeCode: componentId,
          flexType: componentId,
        },
      },
    };
  }

  if (componentId && pageSlotPosition) {
    config.cmsStructure.slots = {
      [pageSlotPosition]: { componentIds: [componentId] },
    };
  }
  return config;
}

/**
 * @private
 */
function buildLayoutConfig({
  pageTemplate,
  pageSlotPosition,
  breakpoint,
  section,
}: CmsStructureOptions = {}): LayoutConfig {
  const layoutConfig: LayoutConfig = {};
  if (pageTemplate && pageSlotPosition) {
    const pageTemplateSlots: any = {};
    if (breakpoint) {
      pageTemplateSlots[breakpoint] = {
        slots: [pageSlotPosition],
      };
    } else {
      pageTemplateSlots.slots = [pageSlotPosition];
    }
    layoutConfig.layoutSlots = {
      [pageTemplate]: pageTemplateSlots,
    };
  }

  if (section && pageSlotPosition) {
    const sectionSlots: any = {};
    if (breakpoint) {
      sectionSlots[breakpoint] = { slots: [pageSlotPosition] };
    } else {
      sectionSlots.slots = [pageSlotPosition];
    }
    if (layoutConfig.layoutSlots) {
      layoutConfig.layoutSlots[section] = sectionSlots;
    } else {
      layoutConfig.layoutSlots = {
        [section]: sectionSlots,
      };
    }
  }
  return layoutConfig;
}
