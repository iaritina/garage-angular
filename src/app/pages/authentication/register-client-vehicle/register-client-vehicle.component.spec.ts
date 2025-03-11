import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientVehicleComponent } from './register-client-vehicle.component';

describe('RegisterClientVehicleComponent', () => {
  let component: RegisterClientVehicleComponent;
  let fixture: ComponentFixture<RegisterClientVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterClientVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClientVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
