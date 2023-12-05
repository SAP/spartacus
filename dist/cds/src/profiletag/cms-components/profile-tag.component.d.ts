import { Observable } from 'rxjs';
import { ProfileTagInjectorService } from '../services/profile-tag.injector.service';
import * as i0 from "@angular/core";
export declare class ProfileTagComponent {
    private profileTagInjector;
    profileTagEnabled$: Observable<boolean>;
    constructor(profileTagInjector: ProfileTagInjectorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileTagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProfileTagComponent, "cx-profiletag", never, {}, {}, never, never, false, never>;
}
