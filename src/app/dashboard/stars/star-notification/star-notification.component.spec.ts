import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarNotificationComponent } from './star-notification.component';

describe('StarNotificationComponent', () => {
  let component: StarNotificationComponent;
  let fixture: ComponentFixture<StarNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
