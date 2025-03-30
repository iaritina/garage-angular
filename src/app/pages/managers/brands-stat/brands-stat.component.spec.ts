import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsStatComponent } from './brands-stat.component';

describe('BrandsStatComponent', () => {
  let component: BrandsStatComponent;
  let fixture: ComponentFixture<BrandsStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
