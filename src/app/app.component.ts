import { Component, OnInit, OnDestroy } from '@angular/core';
import { multi } from './model/data';
import { CountryService } from './services/country/country.service';
import {Subject} from 'rxjs';

import { ResponseCountries } from './model/response-countries';
import { Country } from './model/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-indicador-banco-mundial';
  multi = [];
  view = [900, 400];
  destroyed = new Subject<void>();
  currentScreenSize: string;
  countriesList: Array<ResponseCountries> = new Array<ResponseCountries>();
  countries = new Array<Country>()
  countrySeleted: string 

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Ano';
  yAxisLabel: string = 'Populacao';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private countryService: CountryService) {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.countryService.getCountries().
      subscribe((country) => {
        this.countriesList = country
        for(let i = 0; i < this.countriesList[1].length; i++){
          this.countries.push({id: this.countriesList[1][i].id, code: this.countriesList[1][i].iso2Code, name: this.countriesList[1][i].name})
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onSelect() {
    this.countryService.getCountry(this.countrySeleted).
      subscribe((country) => {
        this.multi.splice(0, 1, [])
        let indicators = []
        let pais = country[1][0].country.value
        for(let i = 0; i < country[1].length; i++){
          indicators.push({ name: country[1][i].date,
            value: country[1][i].value == null ? 0 : country[1][i].value})
        }
        let data = []
        data.push({name: pais, series: indicators})
        this.multi = data
      });
  }

  selectOption(value){
    this.countrySeleted = value
  }
  
}
