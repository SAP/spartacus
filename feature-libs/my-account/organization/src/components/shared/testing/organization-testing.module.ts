import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';

const modules = [
  CommonModule, // angular
  RouterTestingModule, // angular
  I18nTestingModule, // public MOCK - already existing
  UrlTestingModule, // private MOCK - supports most frequent use cases of cxRoute
  SplitViewTestingModule, // private MOCK (but ORIGINAL is not too heavy)
  TableModule, // ORIGINAL - to allow for using embedded outlets
  PaginationTestingModule, // private MOCK = ORIGINAL component + ORIGINAL default config
  IconTestingModule, // private MOCK - simply render icon type
];

// PRIVATE TESTING UTIL
@NgModule({
  imports: modules,
  exports: modules,
})
export class OrganizationTestingModule {}
