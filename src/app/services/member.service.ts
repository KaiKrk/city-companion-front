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
  memberInfoSubject = new Subject<RegistrationModel>();
  memberInfoSubject2 = new Subject<any[]>();

  private members = [] ;
  private memberInfo = [];

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  emitMemberSubject() {
    this.memberSubject.next(this.members.slice());
  }

  emitMemberInfoSubject() {
    console.log('le Subject avant' + this.memberInfoSubject);
    // @ts-ignore
    this.memberInfoSubject.next(this.memberInfo);
    console.log('le Subject ' + this.memberInfoSubject);
  }

  emitMemberInfoSubject2() {
    this.memberInfoSubject2.next(this.memberInfo);
  }
  addMember(registration: RegistrationModel) {
    this.saveMember(registration);
  }

  getMember(id: number) {
    this.httpClient
      .get<any[]>(this.endpoint + '/account?id=' + id)
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
  getMemberInfo(id: number) {
    this.httpClient
      .get<any[]>(this.endpoint + '/account?id=' + id)
      .subscribe(
        (response) => {
          this.memberInfo = response;
          console.log(this.memberInfo);
          this.emitMemberInfoSubject();
          this.emitMemberInfoSubject2();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    return this.memberInfo;
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

  updateMember(member: RegistrationModel) {
    console.log('update Member :' + JSON.stringify(member));
    this.httpClient
      .post(this.endpoint + '/updateAccount', member)
      .subscribe(
        () => {
          console.log('Mise à jour terminé terminé !');
          this.router.navigate(['../dashboard']);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }


}
