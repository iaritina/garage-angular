import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAppointmentComponent } from './clients-appointment.component';

describe('ClientsAppointmentComponent', () => {
  let component: ClientsAppointmentComponent;
  let fixture: ComponentFixture<ClientsAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
