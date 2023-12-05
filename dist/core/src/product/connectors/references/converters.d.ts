import { InjectionToken } from '@angular/core';
import { ProductReference } from '../../../model/product.model';
import { Converter } from '../../../util/converter.service';
export declare const PRODUCT_REFERENCES_NORMALIZER: InjectionToken<Converter<any, ProductReference[]>>;
