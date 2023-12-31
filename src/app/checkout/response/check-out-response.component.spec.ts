import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutResponseComponent } from './check-out-response.component';

describe('CheckOutResponseComponent', () => {
  let component: CheckOutResponseComponent;
  let fixture: ComponentFixture<CheckOutResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
