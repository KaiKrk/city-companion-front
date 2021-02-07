import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {DashboardInformations} from '../models/informations/DashboardInformations';
import {MemberService} from '../services/member.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-city-companion-dashboard',
  templateUrl: './city-companion-dashboard.component.html',
  styleUrls: ['./city-companion-dashboard.component.scss']
})
export class CityCompanionDashboardComponent implements OnInit {

  dashboardInfo: DashboardInformations;
  constructor(private dashboardService: DashboardService,
              private memberService: MemberService,
              private authenticationService: AuthService) { }
  currentUser = this.authenticationService.currentUserValue;


  ngOnInit(): void {

    this.dashboardInfo = this.dashboardService.getDashboardInfo(this.currentUser.id);
  }

}
