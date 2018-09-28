import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { DynamicSlotComponent } from './dynamic-slot.component';
import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../../store/reducers';
import * as fromActions from '../../store/actions';
import { Page } from '../../models/page.model';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { OutletDirective } from '../../../outlet';

describe('DynamicSlotComponent', () => {
  let dynamicSlotComponent: DynamicSlotComponent;
  let fixture: ComponentFixture<DynamicSlotComponent>;
  let store: Store<fromReducers.CmsState>;

  const cmsComponents: any[] = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
    { uid: 'comp2', typeCode: 'CMSLinkComponent' },
    { uid: 'comp3', typeCode: 'NavigationComponent' }
  ];
  const page: Page = {
    pageId: 'testPageId',
    name: 'testPage',
    seen: [],
    slots: { left: cmsComponents }
  };
  const payload = { key: 'test', value: page };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromReducers.getReducers())
        })
      ],
      declarations: [
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(DynamicSlotComponent);
    dynamicSlotComponent = fixture.componentInstance;
    dynamicSlotComponent.position = 'left';

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(dynamicSlotComponent).toBeTruthy();
  });

  it('should display the cms components inside the given position', () => {
    const loadPageAction = new fromActions.LoadPageDataSuccess(payload);
    store.dispatch(loadPageAction);
    const getComponentAction = new fromActions.GetComponentFromPage(
      cmsComponents
    );
    store.dispatch(getComponentAction);
    const UpdateLatestPageKeyAction = new fromActions.UpdateLatestPageKey(
      'test'
    );
    store.dispatch(UpdateLatestPageKeyAction);

    dynamicSlotComponent.currentSlot$.subscribe(data => {
      expect(data).toBe(cmsComponents);
    });
  });
});
