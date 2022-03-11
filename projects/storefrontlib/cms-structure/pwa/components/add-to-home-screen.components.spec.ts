import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AddToHomeScreenService } from '../services/add-to-home-screen.service';
import { AddToHomeScreenComponent } from './add-to-home-screen.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-add-to-home',
  template: 'test-add-to-home',
})
class ExampleAddToHomeScreenComponent extends AddToHomeScreenComponent {
  constructor(protected addToHomeScreenService: AddToHomeScreenService) {
    super(addToHomeScreenService);
  }
}

class MockAddToHomeScreenService {
  firePrompt = createSpy();
  canPrompt$: Observable<boolean> = of(true);
}

describe('AddToHomeScreenComponent', () => {
  let component: AddToHomeScreenComponent;
  let fixture: ComponentFixture<ExampleAddToHomeScreenComponent>;
  let mockAddToHomeScreenService: AddToHomeScreenService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExampleAddToHomeScreenComponent],
        providers: [
          {
            provide: AddToHomeScreenService,
            useClass: MockAddToHomeScreenService,
          },
        ],
      }).compileComponents();

      mockAddToHomeScreenService = TestBed.inject(AddToHomeScreenService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAddToHomeScreenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get canPrompt', () => {
    component.ngOnInit();
    let canPrompt: boolean;
    component.canPrompt$.subscribe((value) => (canPrompt = value));
    expect(canPrompt).toBeTruthy();
  });

  it('should be able to call prompt', () => {
    component.prompt();
    expect(mockAddToHomeScreenService.firePrompt).toHaveBeenCalled();
  });
});
