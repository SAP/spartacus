import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../cms-structure/page/index';
import { LogoutGuard } from './logout-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'logout',
        canActivate: [LogoutGuard],
        component: PageLayoutComponent,
      },
    ]),
  ],
})
export class LogoutModule {}
