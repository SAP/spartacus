import { Injectable } from '@angular/core';
import {
  CMS_FLEX_COMPONENT_TYPE,
  JSP_INCLUDE_CMS_COMPONENT_TYPE,
} from '../../../../cms/config/cms-config';
import { ContentSlotComponentData } from '../../../../cms/model/content-slot-component-data.model';
import { ContentSlotData } from '../../../../cms/model/content-slot-data.model';
import { CmsStructureModel } from '../../../../cms/model/page.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class OccCmsPageNormalizer
  implements Converter<Occ.CMSPage, CmsStructureModel> {
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

  private normalizePageData(source: any, target: CmsStructureModel): void {
    target.page = {
      loadTime: Date.now(),
      name: source.name,
      type: source.typeCode,
      title: source.title,
      pageId: source.uid,
      template: source.template,
      slots: {},
      properties: source.properties,
      label: source.label,
    };
  }

  private normalizePageSlotData(source: any, target: CmsStructureModel): void {
    if (!Array.isArray(source.contentSlots.contentSlot)) {
      source.contentSlots.contentSlot = [source.contentSlots.contentSlot];
    }
    for (const slot of source.contentSlots.contentSlot) {
      target.page.slots[slot.position] = {
        components: [],
        properties: slot.properties,
      } as ContentSlotData;
    }
  }

  private normalizePageComponentData(
    source: any,
    target: CmsStructureModel
  ): void {
    for (const slot of source.contentSlots.contentSlot) {
      if (
        slot.components.component &&
        Array.isArray(slot.components.component)
      ) {
        for (const component of slot.components.component) {
          const comp: ContentSlotComponentData = {
            uid: component.uid,
            typeCode: component.typeCode,
            properties: component.properties,
          };

          if (component.typeCode === CMS_FLEX_COMPONENT_TYPE) {
            comp.flexType = component.flexType;
          } else if (component.typeCode === JSP_INCLUDE_CMS_COMPONENT_TYPE) {
            comp.flexType = component.uid;
          } else {
            comp.flexType = component.typeCode;
          }
          target.page.slots[slot.position].components.push(comp);
        }
      }
    }
  }

  private normalizeComponentData(source: any, target: CmsStructureModel): void {
    target.components = [];

    for (const slot of source.contentSlots.contentSlot) {
      if (
        slot.components.component &&
        Array.isArray(slot.components.component)
      ) {
        for (const component of slot.components.component as any) {
          // we don't put properties into component state
          if (component.properties) {
            component.properties = undefined;
          }
          target.components.push(component);
        }
      }
    }
  }
}
