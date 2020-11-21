import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment.prod';
import {Router} from '@angular/router';
import {RegistrationModel} from '../models/registration.model';

@Injectable()
export class MemberService {
  endpoint: string =  environment.APIEndpoint;
  private member: Account[] = [];
  memberSubject = new Subject<any[]>();

  private members = [] ;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  emitMemberSubject() {
    this.memberSubject.next(this.members.slice());
  }
  addMember(registration: RegistrationModel) {
    this.saveMember(registration);
  }

  getAccounts() {
    this.httpClient
      .get<any[]>(this.endpoint + '/accounts')
      .subscribe(
        (response) => {
          this.members = response;
          this.emitMemberSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  saveMember(member: RegistrationModel) {
    console.log('new Member :' + JSON.stringify(member));
    this.httpClient
      .post(this.endpoint + '/saveAccount', member)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          this.router.navigate(['../authentication']);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }


}
