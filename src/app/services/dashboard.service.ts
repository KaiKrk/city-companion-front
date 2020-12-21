import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment.prod';
import {Router} from '@angular/router';

@Injectable()
export class DashboardService {

  endpoint: string =  environment.APIEndpoint;

  private currentUserSubject: BehaviorSubject<Account>;
  public currentUser: Observable<Account>;
  public member;



  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getWeatherUpdates(id: number) {

  }



}
