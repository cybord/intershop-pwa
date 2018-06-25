import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { shoppingReducers } from '../../../shopping/store/shopping.system';
import { MockComponent } from '../../../utils/dev/mock.component';
import { B2bState } from '../../store/b2b.state';
import { b2bReducers } from '../../store/b2b.system';
import { LoadQuotes } from '../../store/quote';
import { QuoteEditPageContainerComponent } from './quote-edit-page.container';

describe('Quote Edit Page Container', () => {
  let component: QuoteEditPageContainerComponent;
  let fixture: ComponentFixture<QuoteEditPageContainerComponent>;
  let element: HTMLElement;
  let store$: Store<B2bState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuoteEditPageContainerComponent,
        MockComponent({ selector: 'ish-quote-edit', template: 'Quote Edit Component', inputs: ['quote'] }),
        MockComponent({ selector: 'ish-loading', template: 'Loading Component' }),
        MockComponent({
          selector: 'ish-breadcrumb',
          template: 'Breadcrumb Component',
          inputs: ['account', 'trailText'],
        }),
      ],
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot({
          b2b: combineReducers(b2bReducers),
          shopping: combineReducers(shoppingReducers),
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteEditPageContainerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    store$ = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should render loading component if quotes loading', () => {
    store$.dispatch(new LoadQuotes());
    fixture.detectChanges();
    expect(element.querySelector('ish-loading')).toBeTruthy();
  });
});
