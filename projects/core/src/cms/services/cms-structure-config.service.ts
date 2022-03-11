import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  CmsPageConfig,
  CmsPageSlotsConfig,
  CmsStructureConfig,
} from '../config/cms-structure.config';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { CmsStructureModel } from '../model/page.model';

/**
 * Service that provides access to CMS structure from a static
 * configuration or configuration file. This class uses static
 * configuration is designed in async fashion so that configurations
 * can be loaded from a file or stream.
 *
 * The intent of the `CmsStructureConfigService` however is to provide
 * fast loading pages and default cms structure for commodity commerce.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class CmsStructureConfigService {
  constructor(protected cmsDataConfig: CmsStructureConfig) {}

  /**
   * Merge the cms structure to the pageStructure. The page structure
   * can either hold complete page structures or global structures that
   * might apply to all pages (such has header coponents).
   */
  mergePageStructure(
    pageId: string,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.mergePage(pageId, pageStructure).pipe(
      switchMap((page) => this.mergeSlots(page))
    );
  }

  /**
   *
   * Returns boolean observable to indicate whether the page should not be
   * loaded from the backend. This is useful for pages which are comoditized
   * and follow best practice.
   *
   * By default, configurable pages are driven by static configuration,
   * in order to allow for fast loading pages (preventing network delays).
   */
  shouldIgnoreBackend(pageId: string): Observable<boolean> {
    return this.getPageFromConfig(pageId).pipe(
      map((page) => !!page && !!page.ignoreBackend)
    );
  }

  /**
   * returns an Observable component data from the static configuration.
   */
  getComponentFromConfig(
    componentId: string
  ): Observable<ContentSlotComponentData | any> {
    return of(this.getComponentById(componentId));
  }

  /**
   * returns an Observable components data from the static configuration.
   */
  getComponentsFromConfig(
    ids: string[]
  ): Observable<ContentSlotComponentData[]> {
    return of(ids.map((id) => this.getComponentById(id)));
  }

  /**
   * returns an observable with the `PageConfig`.
   */
  protected getPageFromConfig(pageId: string): Observable<CmsPageConfig> {
    return of(
      this.cmsDataConfig.cmsStructure && this.cmsDataConfig.cmsStructure.pages
        ? this.cmsDataConfig.cmsStructure.pages.find((p) => p.pageId === pageId)
        : null
    );
  }

  /**
   * Merge page data from the configuration into the given structure, if any.
   * If the given page structure is empty, a page is created and the page slots are
   * are merged into the page.
   */
  protected mergePage(
    pageId: string,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.getPageFromConfig(pageId).pipe(
      switchMap((page) => {
        if (page) {
          // serialize page data
          if (!pageStructure.page) {
            pageStructure.page = {
              ...page,
            };
            pageStructure.page.slots = {};
          }
          if (!pageStructure.page.slots) {
            pageStructure.page.slots = {};
          }
          return this.mergeSlots(pageStructure, page.slots);
        } else {
          return of(pageStructure);
        }
      })
    );
  }

  /**
   * Adds any pre-configured slots for pages that do not use them.
   * If pages have a slot for the given position, the configiuration
   * is ingored. Even if the slot does not have inner structure (such as
   * components), so that the cms structure is able to override the (static)
   * configuration.
   */
  protected mergeSlots(
    pageStructure: CmsStructureModel,
    slots?: CmsPageSlotsConfig
  ): Observable<CmsStructureModel> {
    // if no slots have been given, we use the global configured slots
    if (
      !slots &&
      this.cmsDataConfig.cmsStructure &&
      this.cmsDataConfig.cmsStructure.slots
    ) {
      slots = this.cmsDataConfig.cmsStructure.slots;
    }

    if (!slots) {
      return of(pageStructure);
    }

    for (const position of Object.keys(slots)) {
      if (!Object.keys(pageStructure.page.slots).includes(position)) {
        // the global slot isn't yet part of the page structure
        pageStructure.page.slots[position] = {};

        for (const component of this.getComponentsByPosition(slots, position)) {
          if (!pageStructure.page.slots[position].components) {
            pageStructure.page.slots[position].components = [];
          }
          pageStructure.page.slots[position].components.push({
            uid: component.uid,
            flexType: component.flexType,
            typeCode: component.typeCode,
          });
          if (!pageStructure.components) {
            pageStructure.components = [];
          }

          pageStructure.components.push(component);
        }
      }
    }

    return of(pageStructure);
  }

  protected getComponentsByPosition(
    slots: CmsPageSlotsConfig,
    position: string
  ): ContentSlotComponentData[] {
    const components = [];
    if (slots[position] && slots[position].componentIds) {
      for (const componentId of slots[position].componentIds) {
        if (
          this.cmsDataConfig.cmsStructure &&
          this.cmsDataConfig.cmsStructure.components
        ) {
          const component =
            this.cmsDataConfig.cmsStructure.components[componentId];
          if (component) {
            components.push({ uid: componentId, ...component });
          }
        }
      }
    }
    return components;
  }

  protected getComponentById(componentId: string): ContentSlotComponentData {
    return this.cmsDataConfig.cmsStructure &&
      this.cmsDataConfig.cmsStructure.components
      ? this.cmsDataConfig.cmsStructure.components[componentId]
      : undefined;
  }
}
