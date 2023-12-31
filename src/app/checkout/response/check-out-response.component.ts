import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-check-out-response',
  templateUrl: './check-out-response.component.html',
  styleUrls: ['./check-out-response.component.scss']
})
export class CheckOutResponseComponent implements OnInit {
  stateData: any;

  constructor(public checkoutServices : CheckoutService) {}

  ngOnInit(): void {
    this.stateData = this.checkoutServices.getState();

  }
 
}
