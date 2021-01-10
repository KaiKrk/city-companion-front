import {Departures} from './Departures';

export interface Commuting {
  station: string;
  status: string;
  departures: Departures;
}
