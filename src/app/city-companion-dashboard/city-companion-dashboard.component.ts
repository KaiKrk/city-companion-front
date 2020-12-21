import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {DashboardInformations} from '../models/informations/DashboardInformations';

@Component({
  selector: 'app-city-companion-dashboard',
  templateUrl: './city-companion-dashboard.component.html',
  styleUrls: ['./city-companion-dashboard.component.scss']
})
export class CityCompanionDashboardComponent implements OnInit {

  dashboardInformation: DashboardInformations;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

}
