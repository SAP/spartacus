import { LayoutConfig } from '@spartacus/storefront';
import { AsmMainUiComponent } from '../../components/asm-main-ui/asm-main-ui.component';

export const defaultAsmLayoutConfig: LayoutConfig = {
  launch: {
    ASM: {
      outlet: 'cx-storefront',
      component: AsmMainUiComponent,
    },
  },
};
