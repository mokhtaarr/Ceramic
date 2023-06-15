import { TestBed } from '@angular/core/testing';

import { ProductBrandImagesService } from './product-brand-images.service';

describe('ProductBrandImagesService', () => {
  let service: ProductBrandImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBrandImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
