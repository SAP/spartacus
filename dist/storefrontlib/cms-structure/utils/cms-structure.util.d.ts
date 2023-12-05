import { ValueProvider } from '@angular/core';
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
export declare function provideCmsStructure(options: CmsStructureOptions): ValueProvider;
