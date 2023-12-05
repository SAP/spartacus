import { InjectionToken } from '@angular/core';
import { B2BApprovalProcess, B2BUnit, Converter } from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';
export declare const B2BUNIT_NODE_NORMALIZER: InjectionToken<Converter<any, B2BUnitNode>>;
export declare const B2BUNIT_NODE_LIST_NORMALIZER: InjectionToken<Converter<any, B2BUnitNode[]>>;
export declare const B2BUNIT_NORMALIZER: InjectionToken<Converter<any, B2BUnit>>;
export declare const B2BUNIT_SERIALIZER: InjectionToken<Converter<B2BUnit, any>>;
export declare const B2BUNIT_APPROVAL_PROCESSES_NORMALIZER: InjectionToken<Converter<any, B2BApprovalProcess[]>>;
