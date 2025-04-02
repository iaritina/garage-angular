import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLoginMechanicComponent } from './side-login-mechanic.component';

describe('SideLoginMechanicComponent', () => {
  let component: SideLoginMechanicComponent;
  let fixture: ComponentFixture<SideLoginMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideLoginMechanicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideLoginMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
