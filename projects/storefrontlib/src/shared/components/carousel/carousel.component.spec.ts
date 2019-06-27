import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CarouselComponent } from './carousel.component';
import { CarouselService } from './carousel.service';

class MockCarouselService {
  getItemsPerSlide(
    _nativeElement: HTMLElement,
    _itemWidth: number
  ): Observable<number> {
    return of();
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

fdescribe('Carousel Component', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let service: CarouselService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CarouselComponent, MockCxIconComponent],
      providers: [{ provide: CarouselService, useClass: MockCarouselService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;

    service = TestBed.get(CarouselService);

    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a size$ of 4 items per slide', () => {
    spyOn(service, 'getItemsPerSlide').and.returnValue(of(4));

    component.ngOnInit();
    let results: number;

    component.size$.subscribe(value => (results = value)).unsubscribe();

    expect(results).toEqual(4);
  });

  describe('UI Tests for 5 items divided by 2 slides', () => {
    beforeEach(() => {
      spyOn(service, 'getItemsPerSlide').and.returnValue(of(4));
      component.title = 'test carousel with title';
      component.items$ = [of(), of(), of(), of(), of()];
      component.ngOnInit();
      fixture.detectChanges();
    });
    it('should have h3 with title', () => {
      const h3 = fixture.debugElement.query(By.css('h3'));
      expect(h3).toBeTruthy();
      expect(h3.nativeElement).toBeTruthy();

      expect((<HTMLElement>h3.nativeElement).innerText).toEqual(
        'test carousel with title'
      );
    });

    // it('should have previous button', () => {
    //   expect(
    //     fixture.debugElement.query(By.css('button.previous'))
    //   ).toBeTruthy();
    // });

    it('should have a size class', () => {});

    it('should have next button', () => {});

    it('should have 3 indicators', () => {});

    it('should not have indicators', () => {});
  });
});
