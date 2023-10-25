import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotifyComponent } from './alert-notify.component';

describe('AlertNotifyComponent', () => {
  let component: AlertNotifyComponent;
  let fixture: ComponentFixture<AlertNotifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertNotifyComponent]
    });
    fixture = TestBed.createComponent(AlertNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
