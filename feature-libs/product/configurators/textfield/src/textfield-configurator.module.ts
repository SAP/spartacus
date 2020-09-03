import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { ConfigTextfieldFormComponent } from './components/config-textfield-form/config-textfield-form.component';
import { TextfieldConfiguratorComponentsModule } from './components/textfield-configurator-components.module';
import { TextfieldConfiguratorCoreModule } from './core/textfield-configurator-core.module';

/**
 * Exposes the textfield configurator, a small configurator that only provides 3 attributes at product level without any dependencies between them,
 * and in the first place serves as a template for other configurator implementations.
 */
@NgModule({
  imports: [
    TextfieldConfiguratorCoreModule,
    TextfieldConfiguratorComponentsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        component: PageLayoutComponent,
        data: {
          pageLabel: '/configureTEXTFIELD',
          cxRoute: 'configureTEXTFIELD',
        },
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        TextfieldConfigurationForm: {
          component: ConfigTextfieldFormComponent,
        },
      },
      layoutSlots: {
        TextfieldConfigurationTemplate: {
          slots: ['TextfieldConfigContent'],
        },
      },
    }),
  ],
})
export class TextfieldConfiguratorModule {}
