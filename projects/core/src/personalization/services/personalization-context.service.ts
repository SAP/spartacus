import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {PersonalizationContext} from "../model/personalization-context.model";

@Injectable({
  providedIn: 'root',
})
export class PersonalizationContextService {

  private subject: Subject<PersonalizationContext> = new BehaviorSubject(null);

  getPersonalizationContext(): Observable<PersonalizationContext> {
    return this.subject.asObservable();
  }

  setPersonalizationContext(context: PersonalizationContext) {
    this.subject.next(context);
  }

}
