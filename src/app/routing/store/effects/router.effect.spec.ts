import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { Actions } from "@ngrx/effects";

import { hot, cold } from "jasmine-marbles";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";

import { Router } from "@angular/router";
import { Location } from "@angular/common";

import * as fromEffects from "./router.effect";
import * as fromActions from "../actions/router.action";

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

fdescribe("Router Effects", () => {
  let actions$: TestActions;
  let effects: fromEffects.RouterEffects;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        fromEffects.RouterEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(fromEffects.RouterEffects);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  describe("navigate$", () => {
    it("should navigate to path", () => {
      const action = new fromActions.Go({
        path: ["/test"]
      });

      actions$.stream = hot("-a", { a: action });

      spyOn(router, "navigate");
      effects.navigate$.subscribe(value => {
        expect(router.navigate).toHaveBeenCalledWith(["/test"], {
          queryParams: undefined
        });
      });
    });
  });

  describe("navigateBack$", () => {
    it("should navigate back", () => {
      const action = new fromActions.Back();

      actions$.stream = hot("-a", { a: action });

      spyOn(location, "back");
      effects.navigate$.subscribe(value => {
        expect(location.back).toHaveBeenCalled();
      });
    });
  });

  describe("navigateForward$", () => {
    it("should navigate forward", () => {
      const action = new fromActions.Back();

      actions$.stream = hot("-a", { a: action });

      spyOn(location, "forward");
      effects.navigate$.subscribe(value => {
        expect(location.forward).toHaveBeenCalled();
      });
    });
  });
});
