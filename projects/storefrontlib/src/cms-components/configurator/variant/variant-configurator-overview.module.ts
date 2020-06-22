import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule, UserService } from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { ConfigOverviewAttributeComponent } from '../commons/config-overview-attribute/config-overview-attribute.component';
import { ConfigOverviewFormComponent } from '../commons/config-overview-form/config-overview-form.component';
import { GenericConfiguratorModule } from '../generic/generic-configurator.module';
import { VariantConfiguratorModule } from './variant-configurator.module';
import { ConfigOverviewLoadingComponent } from '../commons/config-overview-loading/config-overview-loading.component';

@NgModule({
  imports: [
    CommonModule,
    GenericConfiguratorModule,
    VariantConfiguratorModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    IconModule,
    RouterModule,
  ],

  declarations: [
    ConfigOverviewLoadingComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
  exports: [
    ConfigOverviewLoadingComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
  providers: [UserService],
  entryComponents: [
    ConfigOverviewLoadingComponent,
    ConfigOverviewFormComponent,
    ConfigOverviewAttributeComponent,
  ],
})
export class VariantConfiguratorOverviewModule {}
