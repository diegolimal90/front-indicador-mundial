import { Indicators } from "./indicators";

export interface ResponseCountries {
    name: string;
    series: Array<Indicators>;
}