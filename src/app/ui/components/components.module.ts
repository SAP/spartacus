import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MediaModule } from './media/media.module';


// we include all UI component modules here, but in real live
// projects would only include those that are relevant.
// for "accelerators", we could include only those that are relevant, so this 
// component module could be configurable or we could have separate component modules, 
// i.e. powertools-components.module.
@NgModule({
    imports: [
        CommonModule,

        UserModule,
        ProductModule,
        MediaModule,
    ],
    declarations: [],
    exports: [
        ProductModule
    ]
})
export class ComponentsModule { }
