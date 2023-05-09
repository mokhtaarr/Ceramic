import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCarouselWithCardComponent } from './product-carousel-with-card.component';

describe('ProductCarouselWithCardComponent', () => {
  let component: ProductCarouselWithCardComponent;
  let fixture: ComponentFixture<ProductCarouselWithCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCarouselWithCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCarouselWithCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
