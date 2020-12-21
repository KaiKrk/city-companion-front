import {Weather} from './weather';
import {AirQuality} from './airQuality';
import {Traffic} from './traffic';
import {Commuting} from './commuting';


export interface DashboardInformations {

  weather: Weather;
  airQuality: AirQuality;
  traffic: Traffic;
  commuting: Commuting;

}
