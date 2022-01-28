import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoogleEventComponent } from './add-google-event.component';

describe('AddGoogleEventComponent', () => {
  let component: AddGoogleEventComponent;
  let fixture: ComponentFixture<AddGoogleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoogleEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoogleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
