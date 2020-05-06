import { LayoutConfig } from '../../layout/config/layout-config';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';

export const defaultAsmLayoutConfig: LayoutConfig = {
  launch: {
    ASM: {
      outlet: 'cx-storefront',
      component: AsmMainUiComponent,
    },
  },
};
