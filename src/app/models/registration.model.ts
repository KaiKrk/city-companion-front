import {Account} from './account.model';
import {AdressModel} from './adress.model';
import {TransportModel} from './transport.model';

export interface RegistrationModel {
  account: Account;
  homeAddress: AdressModel;
  workAddress: AdressModel;
  transport: TransportModel;

}
