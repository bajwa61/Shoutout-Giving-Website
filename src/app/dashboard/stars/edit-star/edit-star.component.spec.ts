import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStarComponent } from './edit-star.component';

describe('EditStarComponent', () => {
  let component: EditStarComponent;
  let fixture: ComponentFixture<EditStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
