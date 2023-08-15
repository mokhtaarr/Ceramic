import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBasketComponent } from './shared-basket.component';

describe('SharedBasketComponent', () => {
  let component: SharedBasketComponent;
  let fixture: ComponentFixture<SharedBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
