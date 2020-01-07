import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {PersonalizationContext} from "../model/personalization-context.model";

@Injectable({
  providedIn: 'root',
})
export class PersonalizationContextService {

  private context: PersonalizationContext;

  getPersonalizationContext(): Observable<PersonalizationContext> {
    return of(this.context);
  }

  setPersonalizationContext(context: PersonalizationContext) {
    this.context = context;
  }

}
