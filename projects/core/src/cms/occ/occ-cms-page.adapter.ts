import { Injectable } from '@angular/core';
import { CMSPage } from '../../occ/index';
import {
  CMS_FLEX_COMPONENT_TYPE,
  JSP_INCLUDE_CMS_COMPONENT_TYPE,
} from '../config/cms-config';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { ContentSlotData } from '../model/content-slot-data.model';
import { CmsStructureModel } from '../model/page.model';
import { CmsPageAdapter } from '../services/cms-page.adapter';

@Injectable()
export class OccCmsPageAdapter extends CmsPageAdapter<CMSPage> {
  adapt(source: CMSPage): CmsStructureModel {
    const target = {};
    this.serializePageData(source, target);
    this.serializePageSlotData(source, target);
    this.serializePageComponentData(source, target);
    this.serializeComponentData(source, target);
    return target;
  }

  private serializePageData(source: any, target: CmsStructureModel): void {
    target.page = {
      loadTime: Date.now(),
      uuid: source.uuid,
      name: source.name,
      type: source.typeCode,
      title: source.title,
      catalogUuid: this.getCatalogUuid(source),
      pageId: source.uid,
      template: source.template,
      slots: {},
    };
  }

  private serializePageSlotData(source: any, target: CmsStructureModel): void {
    for (const slot of source.contentSlots.contentSlot) {
      target.page.slots[slot.position] = {
        uid: slot.slotId,
        uuid: slot.slotUuid,
        catalogUuid: this.getCatalogUuid(slot),
        components: [],
      } as ContentSlotData;
    }
  }

  private serializePageComponentData(
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
            catalogUuid: this.getCatalogUuid(component),
          };
          if (component.uuid) {
            comp.uuid = component.uuid;
          }

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

  private serializeComponentData(source: any, target: CmsStructureModel): void {
    target.components = [];

    for (const slot of source.contentSlots.contentSlot) {
      if (
        slot.components.component &&
        Array.isArray(slot.components.component)
      ) {
        for (const component of slot.components.component as any) {
          // we dont put smartedit properties into store
          if (component.properties) {
            component.properties = undefined;
          }
          target.components.push(component);
        }
      }
    }
  }

  private getCatalogUuid(cmsItem: any): string {
    if (cmsItem.properties && cmsItem.properties.smartedit) {
      const smartEditProp = cmsItem.properties.smartedit;
      if (smartEditProp.catalogVersionUuid) {
        return smartEditProp.catalogVersionUuid;
      } else if (smartEditProp.classes) {
        let catalogUuid: string;
        const seClass = smartEditProp.classes.split(' ');
        seClass.forEach(item => {
          if (item.indexOf('smartedit-catalog-version-uuid') > -1) {
            catalogUuid = item.substr('smartedit-catalog-version-uuid-'.length);
          }
        });
        return catalogUuid;
      }
    }
  }
}
