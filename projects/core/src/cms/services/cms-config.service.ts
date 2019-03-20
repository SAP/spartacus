import { Injectable } from '@angular/core';
import {
  CmsContentConfig,
  ContentSlotDataConfig,
  PageConfig
} from '../config/cms-content.config';
import { CmsStructureModel } from '../model/page.model';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class CmsConfigService {
  constructor(protected cmsDataConfig: CmsContentConfig) {}

  serialize(
    pageId: string,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.serializeConfiguredPage(pageId, pageStructure)
    .pipe(switchMap(page => this.serializeConfiguredSlots(page)));
  }

  /**
   *
   * Returns boolean observable to indicate whether the page should be
   * loaded from config. This is useful for pages which are comoditie
   * and follow best practice.
   *
   * By default, configurable pages are driven by static configuration,
   * in order to allow for fast ll=oading pages (preventing networ delays).
   *
   * The `loadPageFromConfig` method is however designed in an async way and
   * allows for loading configuration from files rather then static files.
   */
  loadPageFromConfig(pageId: string): Observable<boolean> {
    return this.getPageFromConfig(pageId).pipe(
      map(page => page && page.ignoreBackend)
    );
  }

  private serializeConfiguredPage(
    pageId: string,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.getPageFromConfig(pageId).pipe(
      switchMap(page => {
        if (page) {
          // serialize page data
          if (!pageStructure.page) {
            pageStructure.page = {
              ...page
            };
            pageStructure.page.slots = {};
          }
          if (!pageStructure.page.slots) {
            pageStructure.page.slots = {};
          }
          return this.serializeConfiguredSlots(pageStructure, page.slots);
        } else {
          return of(pageStructure);
        }
      })
    );
  }

  private getPageFromConfig(pageId: string): Observable<PageConfig> {
    return of(this.cmsDataConfig.cmsData.pages.find(p => p.pageId === pageId));
  }

  /**
   * Find configured slots and compare them with the slots provided in the content
   */
  private serializeConfiguredSlots(
    pageStructure: CmsStructureModel,
    slots?: { [key: string]: ContentSlotDataConfig }
  ): Observable<CmsStructureModel> {
    if (
      !slots &&
      this.cmsDataConfig.cmsData &&
      this.cmsDataConfig.cmsData.slots
    ) {
      slots = this.cmsDataConfig.cmsData.slots;
    }
    if (slots) {
      for (const position of Object.keys(slots)) {
        if (Object.keys(pageStructure.page.slots).indexOf(position) === -1) {
          // add slot
          pageStructure.page.slots[position] = slots[position];
          pageStructure.page.slots[position].uid = position;

          if (!pageStructure.components) {
            pageStructure.components = [];
          }

          // add slot components
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
