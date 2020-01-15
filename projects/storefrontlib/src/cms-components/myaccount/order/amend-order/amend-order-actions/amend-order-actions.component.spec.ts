import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { AmendOrderActionsComponent } from './amend-order-actions.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('AmendOrderActionsComponent', () => {
  let component: AmendOrderActionsComponent;
  let fixture: ComponentFixture<AmendOrderActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],

      declarations: [MockUrlPipe, AmendOrderActionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendOrderActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have row class', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.classList).toContain('row');
  });
});
