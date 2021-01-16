import {Weather} from './weather';
import {AirQuality} from './airQuality';
import {Traffic} from './traffic';
import {Commuting} from './commuting';


export interface DashboardInformations {
  date: string;
  weather: Weather;
  airQuality: AirQuality;
  carTraffic: Traffic;
  publicTransport: Commuting;

}
