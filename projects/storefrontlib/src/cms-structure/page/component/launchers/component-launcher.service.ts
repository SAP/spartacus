import { ComponentRef, ElementRef, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class ComponentLauncherService {
  abstract getLauncher(
    componentType: string,
    uid: string,
    directiveInjector: Injector
  ): Observable<[ElementRef, ComponentRef<any>?]>;
}
