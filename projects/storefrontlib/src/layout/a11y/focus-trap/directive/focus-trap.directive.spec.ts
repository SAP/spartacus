import { Component, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusTrapDirective } from './focus-trap.directive';
import { FocusTrapService } from '../service/focus-trap.service';

class MockFocusTrapService {
  getTrapHandler = () => {
    return () => {
      console.log('hi');
    };
  };
}

@Component({
  template: `
    <div cxFocusTrap></div>
  `,
})
class TestContainerComponent {}

fdescribe('FocusTrapDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: FocusTrapService;
  let component: TestContainerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestContainerComponent, FocusTrapDirective],
      providers: [
        { provide: FocusTrapService, useClass: MockFocusTrapService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.get(FocusTrapService as Type<FocusTrapService>);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create focus trap on component creation', () => {
    const spyHandler = spyOn(service, 'getTrapHandler');
    // const element: any = fixture.componentRef.location;
    const spyListener = spyOn(
      fixture.debugElement.nativeElement,
      'addEventListener'
    );
    expect(spyHandler).not.toHaveBeenCalled();
    fixture.detectChanges();
    expect(spyHandler).toHaveBeenCalled();
    expect(spyListener).toHaveBeenCalled();
    // element.dispatchEvent(event);
    // fixture.detectChanges();
    // fixture.whenStable().then(() => {
    //   element.dispatchEvent(event);
    //   console.log(document);
    // });
  });

  xit('should remove focus trap on component destruction', () => {
    fixture.detectChanges();
    fixture.destroy();
  });
});
