import { Observable } from 'rxjs';
import { TranslationService } from '../translation.service';
import * as i0 from "@angular/core";
export declare class MockTranslationService implements TranslationService {
    translate(key: string, options?: any, _whitespaceUntilLoaded?: boolean): Observable<string>;
    loadChunks(_chunks: string | string[]): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockTranslationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockTranslationService>;
}
