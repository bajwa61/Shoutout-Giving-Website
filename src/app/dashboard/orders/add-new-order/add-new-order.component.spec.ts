import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOrderComponent } from './add-new-order.component';

describe('AddNewOrderComponent', () => {
  let component: AddNewOrderComponent;
  let fixture: ComponentFixture<AddNewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
