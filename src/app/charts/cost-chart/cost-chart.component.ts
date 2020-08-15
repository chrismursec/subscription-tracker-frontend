import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ChartsService } from '../charts.service';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cost-chart',
  templateUrl: './cost-chart.component.html',
  styleUrls: [ './cost-chart.component.scss' ]
})
export class CostChartComponent implements OnInit {
  private priceSub: Subscription;
  priceLineChart: Chart;
  isLoading: boolean = false;
  titles: [];
  prices: [];

  constructor(private chartService: ChartsService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.isLoading = true;
    this.chartService.getUserPriceData().subscribe((priceData) => {
      this.titles = priceData.subscriptionTitles;
      this.prices = priceData.subscriptionPrices;

      this.isLoading = false;

      const htmlRef = this.elementRef.nativeElement.querySelector(`#priceLineChart`);

      this.priceLineChart = new Chart(htmlRef, {
        type: 'line',

        data: {
          labels: this.titles,
          datasets: [
            {
              label: 'Price',
              data: this.prices,
              borderColor: '#00BCD4',
              backgroundColor: '#00BCD4',
              borderWidth: 1,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            text: 'Price Range',
            fontSize: 24,
            fontFamily: 'Roboto',
            display: true
          }
        }
      });
    });
  }
}
