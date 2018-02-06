import { Injectable } from '@angular/core';
import { OccCmsService } from '../occ/occ-cms/occ-cms.service';
import { ModelService } from './model.service';
import { SiteContextService } from './site-context.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

const PAGE_PREFIX = 'page';
const SLOT_PREFIX = 'slot';
const COMPONENT_PREFIX = 'comp';

const CONTENT_PAGE = 1;
const PRODUCT_PAGE = 2;
const CATEGORY_PAGE = 3;
const CATALOG_PAGE = 4;

@Injectable()
export class CmsService {
  private activeSlots: any;

  latest = {
    type: null,
    context: null
  };

  constructor(
    private occCmsService: OccCmsService,
    private modelService: ModelService,
    private siteLoader: SiteContextService
  ) {
    this.siteLoader
      .getSiteContextChangeSubscription()
      .subscribe((value: number) => {
        if (value > 0) {
          this.refresh();
        }
      });
  }

  refresh() {
    let pageId: string = null;
    let productCode: string = null;
    let categoryCode: string = null;
    let catalogCode: string = null;

    switch (this.latest.type) {
      case PRODUCT_PAGE:
        productCode = this.latest.context;
        break;
      case CATEGORY_PAGE:
        categoryCode = this.latest.context;
        break;
      case CATALOG_PAGE:
        catalogCode = this.latest.context;
        break;
      default:
        pageId = this.latest.context;
    }
    this.getPageData(pageId, productCode, categoryCode, catalogCode);
  }

  getPageData(
    pageId: string,
    productCode: string,
    categoryCode: string,
    catalogCode: string
  ) {
    if (productCode != null) {
      this.latest.type = PRODUCT_PAGE;
      this.latest.context = productCode;
    } else if (categoryCode != null) {
      this.latest.type = CATEGORY_PAGE;
      this.latest.context = categoryCode;
    } else if (catalogCode != null) {
      this.latest.type = CATALOG_PAGE;
      this.latest.context = catalogCode;
    } else {
      this.latest.type = CONTENT_PAGE;
      this.latest.context = pageId;
    }

    this.occCmsService
      .loadPageData(pageId, productCode, categoryCode, catalogCode)
      .map(res => res.json())
      .subscribe(value => this.storePageData(value));
  }

  public getComponentSubscription(key: string): BehaviorSubject<any> {
    return this.modelService.get(COMPONENT_PREFIX + key);
  }

  public getSlotSubscription(key: string): BehaviorSubject<any> {
    return this.modelService.get(SLOT_PREFIX + key);
  }

  public getPageSubscription(key: string): BehaviorSubject<any> {
    return this.modelService.get(PAGE_PREFIX + key);
  }

  public storePageData(pageData: any) {
    this.storeComponents(pageData);
    this.storeSlots(pageData.pageId, pageData.contentSlots.contentSlot);

    this.modelService.store(PAGE_PREFIX + pageData.pageId, {
      pageId: pageData.pageId,
      title: pageData.title,
      template: pageData.template
    });
  }

  public storeComponent(key, model) {
    this.modelService.store(COMPONENT_PREFIX + key, model);
  }

  get baseUrl(): string {
    return this.occCmsService.getBaseUrl();
  }

  private storeComponents(pageData: any) {
    if (pageData) {
      for (const slot of pageData.contentSlots.contentSlot) {
        if (slot.components.component) {
          for (const component of slot.components.component) {
            this.storeComponent(component.uid, component);
          }
        }
      }
    }
  }

  storeSlots(pageId: string, slots: Array<any>) {
    const pageSlots = {};
    for (const slot of slots) {
      pageSlots[slot.position] = [];
      if (slot.components.component) {
        for (const component of slot.components.component) {
          pageSlots[slot.position].push({
            uid: component.uid,
            typeCode: component.typeCode
          });
        }
      }
    }
    // clear existing slots if they have not been updated by the data
    if (this.activeSlots) {
      for (const activeSlotKey of Object.keys(this.activeSlots)) {
        if (!pageSlots[activeSlotKey]) {
          const subscription = this.modelService.get(
            SLOT_PREFIX + pageId + activeSlotKey
          );
          subscription.next(null);
        }
      }
    }
    // update all dynamic subject that have been filled before or in this page
    for (const key of Object.keys(pageSlots)) {
      this.modelService.store(SLOT_PREFIX + key, pageSlots[key]);
    }

    this.activeSlots = pageSlots;
  }
}
