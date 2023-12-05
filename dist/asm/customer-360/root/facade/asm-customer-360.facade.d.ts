import { Observable } from 'rxjs';
import { AsmCustomer360Response, AsmCustomer360TabComponent } from '../model';
import * as i0 from "@angular/core";
export declare abstract class AsmCustomer360Facade {
    abstract get360Data(components: Array<AsmCustomer360TabComponent>): Observable<AsmCustomer360Response | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360Facade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmCustomer360Facade>;
}
