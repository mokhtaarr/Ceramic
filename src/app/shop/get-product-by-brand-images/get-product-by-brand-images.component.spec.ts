import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductByBrandImagesComponent } from './get-product-by-brand-images.component';

describe('GetProductByBrandImagesComponent', () => {
  let component: GetProductByBrandImagesComponent;
  let fixture: ComponentFixture<GetProductByBrandImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProductByBrandImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProductByBrandImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
