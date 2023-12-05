import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Product } from '../../../model/product.model';
export declare const PRODUCT_NORMALIZER: InjectionToken<Converter<any, Product>>;
