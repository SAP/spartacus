import { B2BUser, FeatureConfigService } from '@spartacus/core';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export declare class UserFormService extends FormService<B2BUser> {
    protected readonly featureConfigService: FeatureConfigService | null;
    protected build(): void;
    protected patchData(item: B2BUser): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserFormService>;
}
