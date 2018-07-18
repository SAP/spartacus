import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import { GlobalMessageComponent } from './global-messsage.component';
import * as fromGlobalMessage from '../store';
fdescribe('GlobalMessageComponent', () => {
  let store: Store<fromGlobalMessage.GlobalMessageState>;
  let globalMessageComponent: GlobalMessageComponent;
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromGlobalMessage.reducers
        })
      ],
      declarations: [GlobalMessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    globalMessageComponent = fixture.componentInstance;
    store = TestBed.get(Store);
  });
  it('should do this', () => {});
});
