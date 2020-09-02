import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFailedComponent } from './transaction-failed.component';

describe('TransactionFailedComponent', () => {
  let component: TransactionFailedComponent;
  let fixture: ComponentFixture<TransactionFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
