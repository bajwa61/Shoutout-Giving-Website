import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionsDetailsComponent } from './conversions-details.component';

describe('ConversionsDetailsComponent', () => {
  let component: ConversionsDetailsComponent;
  let fixture: ComponentFixture<ConversionsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversionsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
