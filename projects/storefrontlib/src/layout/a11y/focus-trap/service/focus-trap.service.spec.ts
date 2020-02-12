import { Type, Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FocusTrapService } from './focus-trap.service';

@Component({
  template: `
    <div>
      <a href="/"></a>
    </div>
  `,
})
class TestContainerComponent {}

describe('FocusTrapService', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: FocusTrapService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [TestContainerComponent],
      providers: [FocusTrapService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.get(FocusTrapService as Type<FocusTrapService>);
    fixture.detectChanges();
  });

  it('should get trap handler', () => {
    const element: HTMLElement = fixture.nativeElement;
    const handler: any = service.getTrapHandler(element);
    expect(handler).toEqual(jasmine.any(Function));
  });
});
