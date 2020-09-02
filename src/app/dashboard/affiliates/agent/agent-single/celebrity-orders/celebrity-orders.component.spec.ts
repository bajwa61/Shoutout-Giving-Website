import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrityOrdersComponent } from './celebrity-orders.component';

describe('CelebrityOrdersComponent', () => {
  let component: CelebrityOrdersComponent;
  let fixture: ComponentFixture<CelebrityOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebrityOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebrityOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
