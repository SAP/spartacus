import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/index';
import { AttributeRadioButtonComponent } from '../commons/attribute-types/attribute-radio-button/attribute-radio-button.component';
import { ConfigurationFormComponent } from '../commons/configuration-form/configuration-form.component';
import { ConfigurationImageComponent } from '../commons/configuration-image/configuration-image.component';
import { ConfigurationTitleComponent } from '../commons/configuration-title/configuration-title.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'configureCPQCONFIGURATOR/:rootProduct',
        data: { pageLabel: '/configureCPQCONFIGURATOR' },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationForm: {
          component: ConfigurationFormComponent,
          guards: [],
        },
        VariantConfigurationTitleSummary: {
          component: ConfigurationTitleComponent,
          guards: [],
        },
        VariantConfigurationImage: {
          component: ConfigurationImageComponent,
          guards: [],
        },
      },
      layoutSlots: {
        VariantConfigurationTemplate: {
          slots: [
            'VariantConfigTitle',
            'VariantConfigHeader',
            'VariantConfigContent',
          ],
        },
      },
    }),

    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
  ],

  declarations: [
    ConfigurationFormComponent,
    ConfigurationTitleComponent,
    ConfigurationImageComponent,
    AttributeRadioButtonComponent,
  ],
  exports: [
    ConfigurationFormComponent,
    ConfigurationTitleComponent,
    ConfigurationImageComponent,
    AttributeRadioButtonComponent,
  ],
  providers: [UserService],
  entryComponents: [
    ConfigurationFormComponent,
    ConfigurationTitleComponent,
    ConfigurationImageComponent,
    AttributeRadioButtonComponent,
  ],
})
export class VariantConfiguratorModule {}
