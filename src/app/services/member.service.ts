import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account.model';
import {environment} from '../../environments/environment.prod';
import {Router} from '@angular/router';
import {RegistrationModel} from '../models/registration.model';
import {AccountInfo} from '../models/account.info.model';

@Injectable()
export class MemberService {
  endpoint: string =  environment.APIEndpoint;
  private member: Account[] = [];
  memberSubject = new Subject<any[]>();
  memberInfoSubject = new Subject<AccountInfo>();
  memberInfoSubject2 = new Subject<any[]>();

  private members = [] ;
  public accountInfo: AccountInfo;
  public memberInfoR: RegistrationModel[];
  coco: string;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  emitMemberSubject() {
    this.memberSubject.next(this.members.slice());
  }

  emitMemberInfoSubject() {
    this.memberInfoSubject.next(this.accountInfo);
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
      .get<any>(this.endpoint + '/account?id=' + id)
      .subscribe(
        (response) => {
          this.accountInfo = response;
          console.log('response '  + response);
          console.log(this.accountInfo);
          this.emitMemberInfoSubject();
          return this.accountInfo;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    return this.accountInfo;
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
