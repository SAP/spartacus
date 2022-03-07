import {
  Compiler,
  CompilerFactory,
  COMPILER_OPTIONS,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { SupplementHashAnchorsModule } from '../../../shared/pipes/suplement-hash-anchors/supplement-hash-anchors.module';
import { ParagraphComponent } from './paragraph.component';
import { HtmlOutletDirective } from './html-outlet';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { SupplementInternalLinksModule } from 'projects/storefrontlib/shared/pipes/suplement-internal-links/supplement-internal-links.module';

@NgModule({
  imports: [
    CommonModule,
    SupplementHashAnchorsModule,
    SupplementInternalLinksModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CMSParagraphComponent: {
          component: ParagraphComponent,
        },
        CMSTabParagraphComponent: {
          component: ParagraphComponent,
        },
      },
    }),
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
  ],
  declarations: [ParagraphComponent, HtmlOutletDirective],
  exports: [ParagraphComponent],
})
export class CmsParagraphModule {}

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}
