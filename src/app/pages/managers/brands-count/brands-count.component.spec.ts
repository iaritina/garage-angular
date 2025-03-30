import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsCountComponent } from './brands-count.component';

describe('BrandsCountComponent', () => {
  let component: BrandsCountComponent;
  let fixture: ComponentFixture<BrandsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
