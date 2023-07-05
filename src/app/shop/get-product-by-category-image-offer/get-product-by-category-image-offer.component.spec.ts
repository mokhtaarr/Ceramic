import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductByCategoryImageOfferComponent } from './get-product-by-category-image-offer.component';

describe('GetProductByCategoryImageOfferComponent', () => {
  let component: GetProductByCategoryImageOfferComponent;
  let fixture: ComponentFixture<GetProductByCategoryImageOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProductByCategoryImageOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProductByCategoryImageOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
