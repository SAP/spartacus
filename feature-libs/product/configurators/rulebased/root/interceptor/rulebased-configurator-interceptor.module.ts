import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CpqConfiguratorRestInterceptor } from './cpq-configurator-rest.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CpqConfiguratorRestInterceptor,
      multi: true,
    },
  ],
})
export class RulebasedConfiguratorInterceptorModule {}
