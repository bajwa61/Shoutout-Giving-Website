import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSuccessfulComponent } from './transaction-successful.component';

describe('TransactionSuccessfulComponent', () => {
  let component: TransactionSuccessfulComponent;
  let fixture: ComponentFixture<TransactionSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
