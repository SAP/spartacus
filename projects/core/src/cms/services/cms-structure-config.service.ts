import { Injectable } from '@angular/core';
import {
  CmsStructureConfig,
  CmsPageConfig,
  CmsPageSlotsConfig,
} from '../config/cms-structure.config';
import { CmsStructureModel } from '../model/page.model';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Service that provides access to CMS structure from a static
 * configuration or configuration file. This class uses static
 * configuration is designed in async fashion so that configuratiosn
 * can be loaded from a file or stream.
 *
 * The intend of the `CmsStructureConfigService` however is to provide
 * fast loading pages and default cms structure for comodoty commerce.
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
  mergeConfig(
    pageId: string,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.mergePage(pageId, pageStructure).pipe(
      switchMap(page => this.mergeSlots(page))
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
      map(page => page && !!page.ignoreBackend)
    );
  }

  /**
   * returns an observable with the `PageConfig`.
   */
  private getPageFromConfig(pageId: string): Observable<CmsPageConfig> {
    return of(
      this.cmsDataConfig.cmsStructure && this.cmsDataConfig.cmsStructure.pages
        ? this.cmsDataConfig.cmsStructure.pages.find(p => p.pageId === pageId)
        : null
    );
  }

  /**
   * Merge page data from the configuration into the given structure, if any.
   * If the given page structure is empty, a page is created and the page slots are
   * are merged into the page.
   */
  private mergePage(
    pageId: string,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.getPageFromConfig(pageId).pipe(
      switchMap(page => {
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
  private mergeSlots(
    pageStructure: CmsStructureModel,
    slots?: CmsPageSlotsConfig
  ): Observable<CmsStructureModel> {
    if (
      !slots &&
      this.cmsDataConfig.cmsStructure &&
      this.cmsDataConfig.cmsStructure.slots
    ) {
      slots = this.cmsDataConfig.cmsStructure.slots;
    }
    if (slots) {
      for (const position of Object.keys(slots)) {
        if (Object.keys(pageStructure.page.slots).indexOf(position) === -1) {
          // add slot
          pageStructure.page.slots[position] = slots[position];
          pageStructure.page.slots[position].uid = position;

          // add slot components
          if (!pageStructure.components) {
            pageStructure.components = [];
          }
          if (slots[position].components) {
            slots[position].components.forEach(c => {
              pageStructure.components.push(c);
            });
          }
        }
      }
    }
    return of(pageStructure);
  }
}
