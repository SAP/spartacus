import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './404.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('404Component', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PageNotFoundComponent, MockTranslateUrlPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI test', () => {
    it('should display the 404 image', () => {
      const imgDebugElement = fixture.debugElement.query(
        By.css('img.cx-error__img')
      );
      expect(imgDebugElement).not.toBeNull();
      const img = imgDebugElement.nativeElement;
      expect(
        img.src.startsWith('data:image/gif;base64,iVBORw0KGgoAAAANSUhEUg')
      ).toBeTruthy();
    });
  });
});
