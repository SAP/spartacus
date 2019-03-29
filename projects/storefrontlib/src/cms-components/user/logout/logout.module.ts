import { NgModule } from '@angular/core';
import { LogoutGuard } from './logout-guard';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../lib/cms/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'logout',
        canActivate: [LogoutGuard],
        component: PageLayoutComponent
      }
    ])
  ]
})
export class LogoutModule {}
