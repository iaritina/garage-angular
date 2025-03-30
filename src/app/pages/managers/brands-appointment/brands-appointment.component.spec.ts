import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsAppointmentComponent } from './brands-appointment.component';

describe('BrandsAppointmentComponent', () => {
  let component: BrandsAppointmentComponent;
  let fixture: ComponentFixture<BrandsAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
