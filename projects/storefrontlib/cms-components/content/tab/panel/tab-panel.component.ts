import { Component, Input, TemplateRef } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Tab } from '../Tab';

@Component({
  selector: 'cx-tab-panel',
  templateUrl: './tab-panel.component.html',
})
export class TabPanelComponent {
  @Input() tab: Tab;
  @Input() tabNum: number;
  @Input() isOpen: boolean;

  /**
   * Returns the content type as a string of 'TemplateRef' or 'ContentSlotComponentData'.
   */
  getContentType(
    content: TemplateRef<any> | ContentSlotComponentData
  ): string | undefined {
    return content instanceof TemplateRef
      ? 'TemplateRef'
      : content?.flexType
      ? 'ContentSlotComponentData'
      : undefined;
  }
}
