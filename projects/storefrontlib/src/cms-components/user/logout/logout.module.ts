import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from 'projects/storefrontlib/src/cms-structure';
import { LogoutGuard } from './logout-guard';

@NgModule({
  imports: [
    PageLayoutModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [LogoutGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'logout' },
      },
    ]),
  ],
})
export class LogoutModule {}
