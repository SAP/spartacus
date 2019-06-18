import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ICON_TYPE } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CarouselComponent } from './carousel.component';
import { CarouselService } from './carousel.service';

class MockCarouselService {
  getSize(_nativeElement: HTMLElement, _itemWidth: number) {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
  @Input() alt;
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
      declarations: [
        CarouselComponent,
        MockCxIconComponent,
        MockMediaComponent,
        MockUrlPipe,
      ],
      providers: [{ provide: CarouselService, useClass: MockCarouselService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;

    service = TestBed.get(CarouselService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get the size', () => {
    spyOn(service, 'getSize').and.returnValue(of(4));
    component.ngOnInit();
    component.size$.subscribe(value => expect(value).toEqual(4));
  });
});
