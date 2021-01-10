import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment.prod';
import {Router} from '@angular/router';
import {DashboardInformations} from '../models/informations/DashboardInformations';
import {AccountInfo} from '../models/account.info.model';

@Injectable()
export class DashboardService {

  endpoint: string =  environment.APIEndpoint;

  private currentUserSubject: BehaviorSubject<Account>;
  public currentUser: Observable<Account>;
  public member;
  public dashboardInfo: DashboardInformations;
  dashboardInfoSubject = new Subject<DashboardInformations>();



  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getWeatherUpdates(id: number) {

  }

  emitDashboardInfoSubject() {
    this.dashboardInfoSubject.next(this.dashboardInfo);
  }

  getDashboardInfo(id: number) {
    this.httpClient
      .get<any>(this.endpoint + '/dashboard?id=' + id)
      .subscribe(
        (response) => {
          this.dashboardInfo = response;
          console.log('response '  + response);
          console.log(this.dashboardInfo);
          this.emitDashboardInfoSubject();
          return this.dashboardInfo;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    return this.dashboardInfo;
  }

}
