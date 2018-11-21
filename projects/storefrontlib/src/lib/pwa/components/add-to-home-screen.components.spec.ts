import { async } from '@angular/core/testing';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { AddToHomeScreenComponent } from './add-to-home-screen.component';

class ExampleAddToHomeScreenComponent extends AddToHomeScreenComponent {}

describe('AddToHomeScreenComponent', () => {
  let component: AddToHomeScreenComponent;
  let mockAddToHomeScreenService: any;

  beforeEach(async(() => {
    mockAddToHomeScreenService = {
      firePrompt: createSpy(),
      canPrompt$: of(true)
    };
  }));

  beforeEach(() => {
    component = new ExampleAddToHomeScreenComponent(mockAddToHomeScreenService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get canPrompt', () => {
    component.ngOnInit();
    let canPrompt;
    component.canPrompt$.subscribe(value => (canPrompt = value));
    expect(canPrompt).toBeTruthy();
  });

  it('should be able to call prompt', () => {
    component.prompt();
    expect(mockAddToHomeScreenService.firePrompt).toHaveBeenCalled();
  });
});
