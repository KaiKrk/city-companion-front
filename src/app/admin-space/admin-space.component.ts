import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.scss']
})
export class AdminSpaceComponent implements OnInit {

  bookings: any[];
  bookingsSubscription: Subscription;

  pickups: any[];
  pickupSubscription: Subscription;

  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
