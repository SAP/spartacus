import { Injectable } from '@angular/core';
import {
  CMS_FLEX_COMPONENT_TYPE,
  JSP_INCLUDE_CMS_COMPONENT_TYPE,
} from '../../../../cms/config/cms-config';
import { ContentSlotComponentData } from '../../../../cms/model/content-slot-component-data.model';
import { ContentSlotData } from '../../../../cms/model/content-slot-data.model';
import {
  CmsStructureModel,
  Page,
  PageRobotsMeta,
} from '../../../../cms/model/page.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class OccCmsPageNormalizer
  implements Converter<Occ.CMSPage, CmsStructureModel>
{
  convert(
    source: Occ.CMSPage,
    target: CmsStructureModel = {}
  ): CmsStructureModel {
    this.normalizePageData(source, target);
    this.normalizePageSlotData(source, target);
    this.normalizePageComponentData(source, target);
    this.normalizeComponentData(source, target);
    return target;
  }

  /**
   * Converts the OCC cms page model to the `Page` in the `CmsStructureModel`.
   */
  protected normalizePageData(
    source: Occ.CMSPage,
    target: CmsStructureModel
  ): void {
    if (!source) {
      return;
    }
    const page: Page = {};

    if (source.name) {
      page.name = source.name;
    }
    if (source.typeCode) {
      page.type = source.typeCode;
    }
    if (source.label) {
      page.label = source.label;
    }
    if (source.template) {
      page.template = source.template;
    }
    if (source.uid) {
      page.pageId = source.uid;
    }
    if (source.title) {
      page.title = source.title;
    }
    if (source.description) {
      page.description = source.description;
    }
    if (source.properties) {
      page.properties = source.properties;
    }

    this.normalizeRobots(source, page);

    target.page = page;
  }

  /**
   * Adds a ContentSlotData for each page slot in the `CmsStructureModel`.
   */
  protected normalizePageSlotData(
    source: Occ.CMSPage,
    target: CmsStructureModel
  ): void {
    if (!source?.contentSlots) {
      return;
    }
    if (!Array.isArray(source.contentSlots.contentSlot)) {
      source.contentSlots.contentSlot = [source.contentSlots.contentSlot];
    }
    target.page.slots = {};
    for (const slot of source.contentSlots.contentSlot) {
      target.page.slots[slot.position] = {} as ContentSlotData;
      if (slot.properties) {
        target.page.slots[slot.position].properties = slot.properties;
      }
    }
  }

  /**
   * Registers the `ContentSlotComponentData` for each component.
   */
  protected normalizePageComponentData(
    source: Occ.CMSPage,
    target: CmsStructureModel
  ): void {
    if (!source?.contentSlots?.contentSlot) {
      return;
    }
    for (const slot of source.contentSlots.contentSlot) {
      if (Array.isArray(slot.components?.component)) {
        for (const component of slot.components.component) {
          const comp: ContentSlotComponentData = {
            uid: component.uid,
            typeCode: component.typeCode,
          };
          if (component.properties) {
            comp.properties = component.properties;
          }

          if (component.typeCode === CMS_FLEX_COMPONENT_TYPE) {
            comp.flexType = component.flexType;
          } else if (component.typeCode === JSP_INCLUDE_CMS_COMPONENT_TYPE) {
            comp.flexType = component.uid;
          } else {
            comp.flexType = component.typeCode;
          }
          if (!target.page.slots[slot.position].components) {
            target.page.slots[slot.position].components = [];
          }
          target.page.slots[slot.position].components.push(comp);
        }
      }
    }
  }

  /**
   * Adds the actual component data whenever available in the CMS page data.
   *
   * If the data is not populated in this payload, it is loaded separately
   * (`OccCmsComponentAdapter`).
   */
  protected normalizeComponentData(
    source: Occ.CMSPage,
    target: CmsStructureModel
  ): void {
    if (!source?.contentSlots?.contentSlot) {
      return;
    }

    for (const slot of source.contentSlots.contentSlot) {
      if (Array.isArray(slot.components?.component)) {
        for (const component of slot.components.component as any) {
          // while we're hoping to get this right from the backend api,
          // the OCC api stills seems out of sync with the right model.
          if (component.modifiedtime) {
            component.modifiedTime = component.modifiedtime;
            delete component.modifiedtime;
          }

          // we don't put properties into component state
          if (component.properties) {
            component.properties = undefined;
          }
          if (!target.components) {
            target.components = [];
          }
          target.components.push(component);
        }
      }
    }
  }

  /**
   * Normalizes the page robot string to an array of `PageRobotsMeta` items.
   */
  protected normalizeRobots(source: Occ.CMSPage, target: Page): void {
    const robots = [];
    if (source.robotTag) {
      switch (source.robotTag) {
        case Occ.PageRobots.INDEX_FOLLOW:
          robots.push(PageRobotsMeta.INDEX);
          robots.push(PageRobotsMeta.FOLLOW);
          break;
        case Occ.PageRobots.NOINDEX_FOLLOW:
          robots.push(PageRobotsMeta.NOINDEX);
          robots.push(PageRobotsMeta.FOLLOW);
          break;
        case Occ.PageRobots.INDEX_NOFOLLOW:
          robots.push(PageRobotsMeta.INDEX);
          robots.push(PageRobotsMeta.NOFOLLOW);
          break;
        case Occ.PageRobots.NOINDEX_NOFOLLOW:
          robots.push(PageRobotsMeta.NOINDEX);
          robots.push(PageRobotsMeta.NOFOLLOW);
          break;
      }
    }

    target.robots = robots;
  }
}
