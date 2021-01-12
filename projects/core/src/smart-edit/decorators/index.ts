import { Provider } from '@angular/core';
import { ComponentDecorator } from '../../cms/decorators/component-decorator';
import { PageDecorator } from '../../cms/decorators/page-decorator';
import { SlotDecorator } from '../../cms/decorators/slot-decorator';
import { SmartEditComponentDecorator } from './smart-edit-component-decorator';
import { SmartEditHtmlBodyDecorator } from './smart-edit-html-body-decorator';
import { SmartEditSlotDecorator } from './smart-edit-slot-decorator';

export const smartEditDecorators: Provider[] = [
  {
    provide: ComponentDecorator,
    useExisting: SmartEditComponentDecorator,
    multi: true,
  },
  {
    provide: SlotDecorator,
    useExisting: SmartEditSlotDecorator,
    multi: true,
  },
  {
    provide: PageDecorator,
    useExisting: SmartEditHtmlBodyDecorator,
    multi: true,
  },
];
