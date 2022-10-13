import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { SemanticPathService } from "@spartacus/core";
import { Observable, ReplaySubject } from "rxjs";

export type ParamData = {
	[key: string]: string;
};

@Injectable({
  providedIn: 'root',
})
export class DeepLinkService {
  get deepLinkActive(): boolean {
    return this._deepLinkActive;
  }

  get paramData(): Observable<ParamData | undefined> {
    return this._paramDataSubject.asObservable();
  }

  private _paramDataSubject: ReplaySubject<ParamData | undefined>;
  private _deepLinkActive = false;

  constructor(
    protected location: Location,
    protected semanticPathService: SemanticPathService
  ) {
    const currentPath = this.location.path().split('?')[0];
    const asmDeepLink = this.semanticPathService.get('asmDeepLink');
    this._deepLinkActive = currentPath === asmDeepLink;
    this._paramDataSubject = new ReplaySubject(1);
    this._paramDataSubject.next(undefined);
  }

  setParamData(paramData: ParamData | undefined) {
    this._paramDataSubject.next(paramData);
  }

  clearParamData(): void {
    this._paramDataSubject.next({});
  }
}
