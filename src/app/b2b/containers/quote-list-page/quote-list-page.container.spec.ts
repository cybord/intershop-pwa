import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Quote } from '../../../models/quote/quote.model';
import { MockComponent } from '../../../utils/dev/mock.component';
import { B2bState } from '../../store/b2b.state';
import { b2bReducers } from '../../store/b2b.system';
import { LoadQuotes, LoadQuotesSuccess } from '../../store/quote';
import { QuoteListPageContainerComponent } from './quote-list-page.container';

describe('Quote List Page Container', () => {
  let component: QuoteListPageContainerComponent;
  let fixture: ComponentFixture<QuoteListPageContainerComponent>;
  let element: HTMLElement;
  let store$: Store<B2bState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuoteListPageContainerComponent,
        MockComponent({ selector: 'ish-quote-list', template: 'Quote List Component', inputs: ['quotes'] }),
        MockComponent({ selector: 'ish-loading', template: 'Loading Component' }),
      ],
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot({
          b2b: combineReducers(b2bReducers),
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListPageContainerComponent);
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

  it('should render quote list component if quotes present', () => {
    const quotes = [
      {
        id: 'test',
      } as Quote,
    ];

    store$.dispatch(new LoadQuotesSuccess(quotes));
    fixture.detectChanges();
    expect(element.querySelector('ish-quote-list')).toBeTruthy();
  });
});
