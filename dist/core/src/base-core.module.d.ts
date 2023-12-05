import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./state/state.module";
import * as i2 from "./config/config.module";
import * as i3 from "./config/config-initializer/config-initializer.module";
import * as i4 from "./config/config-validator/config-validator.module";
import * as i5 from "./i18n/i18n.module";
import * as i6 from "./cms/cms.module";
import * as i7 from "./global-message/global-message.module";
import * as i8 from "./process/process.module";
import * as i9 from "./features-config/features-config.module";
import * as i10 from "./site-context/site-context.module";
import * as i11 from "./occ/config/meta-tag-config.module";
import * as i12 from "./occ/base-occ.module";
import * as i13 from "./lazy-loading/lazy-loading.module";
import * as i14 from "./http/http.module";
export declare class BaseCoreModule {
    static forRoot(): ModuleWithProviders<BaseCoreModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseCoreModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BaseCoreModule, never, [typeof i1.StateModule, typeof i2.ConfigModule, typeof i3.ConfigInitializerModule, typeof i4.ConfigValidatorModule, typeof i5.I18nModule, typeof i6.CmsModule, typeof i7.GlobalMessageModule, typeof i8.ProcessModule, typeof i9.FeaturesConfigModule, typeof i10.SiteContextModule, typeof i11.MetaTagConfigModule, typeof i12.BaseOccModule, typeof i13.LazyLoadingModule, typeof i14.HttpModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BaseCoreModule>;
}
