import { Country } from "./country";

export interface ResponseCountries {
    length: number;
    pageInformation: any;
    countries: Array<Country>;
}