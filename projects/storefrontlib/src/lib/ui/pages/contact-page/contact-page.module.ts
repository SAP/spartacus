import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ContactPageLayoutModule } from '../../layout/contact-page-layout/contact-page-layout.module';
import { ContactPageComponent } from './contact-page.component';
import { ConfigurableRouterModule } from '@spartacus/core';
// import { RouterModule, Routes } from '@angular/router';

// TODO bring back - original routes:
// const routes: Routes = [
//   {
//     path: 'contact',
//     canActivate: [CmsPageGuards],

//     // TODO:
//     // When 'contact page' is implemented in CMS backend,
//     // then 'homepage' pageLabel should be changed to adequate one
//     data: { pageLabel: 'homepage' },

//     component: ContactPageComponent
//   }
// ];

const configurableRoutes = {
  // object key 'contact' is unique route name, will be matched with config route key
  contact: {
    defaultPath: 'contact',
    route: {
      // PLEASE NOTE: there is no path parameter!
      canActivate: [CmsPageGuards],
      data: { pageLabel: 'homepage' },
      component: ContactPageComponent
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    ContactPageLayoutModule,
    ConfigurableRouterModule.forChild(configurableRoutes)
    // RouterModule.forChild(routes)
  ],
  declarations: [ContactPageComponent],
  exports: [ContactPageComponent]
})
export class ContactPageModule {}
