import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsChoiceComponent } from './products-choice.component';

describe('ProductsChoiceComponent', () => {
  let component: ProductsChoiceComponent;
  let fixture: ComponentFixture<ProductsChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
