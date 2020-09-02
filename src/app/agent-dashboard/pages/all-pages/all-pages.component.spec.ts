import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPagesComponent } from './all-pages.component';

describe('AllPagesComponent', () => {
  let component: AllPagesComponent;
  let fixture: ComponentFixture<AllPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
