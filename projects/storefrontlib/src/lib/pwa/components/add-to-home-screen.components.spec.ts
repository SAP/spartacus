import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { AddToHomeScreenService } from '../services/add-to-home-screen.service';
import { AddToHomeScreenComponent } from './add-to-home-screen.component';

@Component({
  selector: 'cx-add-to-home',
  template: 'test-add-to-home'
})
class ExampleAddToHomeScreenComponent extends AddToHomeScreenComponent {
  constructor(protected addToHomeScreenService: AddToHomeScreenService) {
    super(addToHomeScreenService);
  }
}

class MockAddToHomeScreenService {
  firePrompt = createSpy();
  canPrompt$ = of(true);
}

describe('AddToHomeScreenComponent', () => {
  let component: AddToHomeScreenComponent;
  let fixture: ComponentFixture<ExampleAddToHomeScreenComponent>;
  let mockAddToHomeScreenService: MockAddToHomeScreenService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleAddToHomeScreenComponent],
      providers: [
        {
          provide: AddToHomeScreenService,
          useClass: MockAddToHomeScreenService
        }
      ]
    }).compileComponents();

    mockAddToHomeScreenService = TestBed.get(AddToHomeScreenService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAddToHomeScreenComponent);
    component = fixture.componentInstance;
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
