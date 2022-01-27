import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEventTableComponent } from './preview-event-table.component';

describe('PreviewEventTableComponent', () => {
  let component: PreviewEventTableComponent;
  let fixture: ComponentFixture<PreviewEventTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEventTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
