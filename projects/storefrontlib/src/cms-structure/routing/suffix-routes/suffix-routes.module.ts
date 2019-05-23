import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../guards/cms-page.guard';
import { PageLayoutComponent } from '../../page/index';
import { suffixUrlMatcher } from './suffix-url-matcher';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        matcher: suffixUrlMatcher,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxSuffixUrlMatcher: {
            marker: 'c',
            paramName: 'categoryCode',
          },
        },
      },
    ]),
  ],
})
export class SuffixRoutesModule {}
