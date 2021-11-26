import { Component, Input, TemplateRef } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Tab, TAB_PANEL_CONTENT_TYPE } from '../Tab';

@Component({
  selector: 'cx-tab-panel',
  templateUrl: './tab-panel.component.html',
})
export class TabPanelComponent {
  @Input() tab: Tab;
  @Input() tabNum: number;
  @Input() isOpen: boolean;

  CONTENT_TYPE = TAB_PANEL_CONTENT_TYPE;

  /**
   * Returns the content type as a string of 'TemplateRef' or 'ContentSlotComponentData'.
   */
  getContentType(
    content: TemplateRef<any> | ContentSlotComponentData
  ): string | undefined {
    return content instanceof TemplateRef
      ? TAB_PANEL_CONTENT_TYPE.TEMPLATE_REF
      : content?.flexType
      ? TAB_PANEL_CONTENT_TYPE.CONTENT_SLOT_COMPONENT_DATA
      : undefined;
  }
}
