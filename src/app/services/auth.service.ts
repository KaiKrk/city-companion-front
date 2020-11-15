import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment.prod';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

endpoint: string =  environment.APIEndpoint;

  private currentUserSubject: BehaviorSubject<Account>;
  public currentUser: Observable<Account>;
  public member;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Account {
    return this.currentUserSubject.value;
  }

  emitMemberSubject() {
    this.currentUserSubject.next(this.member);
  }

  login(username: string, password: string) {
    console.log('authenticate');
    this.httpClient
      .post<any>(this.endpoint + '/authenticate', { username, password })
      .subscribe(
        (response) => {
          this.member = response;
          localStorage.setItem('currentUser', JSON.stringify(this.member));
          this.emitMemberSubject();
          console.log('Connection !');
          this.router.navigate(['../bookList']);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  logout() {
    // remove user from local storage to log user out

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
