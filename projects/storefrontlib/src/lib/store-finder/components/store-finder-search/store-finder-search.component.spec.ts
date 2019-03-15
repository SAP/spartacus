import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderSearchComponent } from './store-finder-search.component';

import { RoutingService } from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const query = 'address';

const keyEvent = {
  key: 'Enter'
};
const badKeyEvent = {
  key: 'Enter95'
};

const mockActivatedRoute = {
  snapshot: {
    params: {}
  }
};

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('StoreFinderSearchComponent', () => {
  let component: StoreFinderSearchComponent;
  let fixture: ComponentFixture<StoreFinderSearchComponent>;

  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [StoreFinderSearchComponent, MockTranslateUrlPipe],
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() }
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchComponent);
    component = fixture.componentInstance;
    routingService = TestBed.get(RoutingService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new query', () => {
    component.searchBox.setValue(query);
    component.findStores(component.searchBox.value);
    expect(routingService.go).toHaveBeenCalledWith(
      ['find'],
      { query },
      { relativeTo: mockActivatedRoute }
    );
  });

  it('should call onKey and dispatch query', () => {
    component.searchBox.setValue(query);
    component.onKey(keyEvent);
    expect(routingService.go).toHaveBeenCalledWith(
      ['find'],
      { query },
      { relativeTo: mockActivatedRoute }
    );
  });

  it('should only call onKey', () => {
    component.onKey(badKeyEvent);
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should view stores near by my location', () => {
    component.viewStoresWithMyLoc();
    expect(routingService.go).toHaveBeenCalledWith(
      ['find'],
      {
        useMyLocation: true
      },
      { relativeTo: mockActivatedRoute }
    );
  });
});
