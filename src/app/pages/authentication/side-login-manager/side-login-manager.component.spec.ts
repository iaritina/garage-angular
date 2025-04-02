import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLoginManagerComponent } from './side-login-manager.component';

describe('SideLoginManagerComponent', () => {
  let component: SideLoginManagerComponent;
  let fixture: ComponentFixture<SideLoginManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideLoginManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideLoginManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
