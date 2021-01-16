import {Departures} from './Departures';

export interface Commuting {
  transportType: string;
  transportLine: string;
  station: string;
  lineStatus: string;
  nextDepartures: Departures;
}
