import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsModelsComponent } from './brands-models.component';

describe('BrandsModelsComponent', () => {
  let component: BrandsModelsComponent;
  let fixture: ComponentFixture<BrandsModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
