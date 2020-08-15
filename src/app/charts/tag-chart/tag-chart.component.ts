import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartsService } from '../charts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tag-chart',
  templateUrl: './tag-chart.component.html',
  styleUrls: [ './tag-chart.component.scss' ]
})
export class TagChartComponent implements OnInit {
  private tagSub: Subscription;

  isLoading = false;

  myChart: Chart;

  innerWidth: number;
  isSmallScreen: boolean;

  constructor(private chartService: ChartsService, private elementRef: ElementRef) {}

  getScreenSize() {
    return window.innerWidth;
  }

  @HostListener('window:resize', [ '$event' ])
  onResize(event) {
    this.innerWidth = this.getScreenSize();
    this.innerWidth <= 725 ? (this.isSmallScreen = false) : (this.isSmallScreen = true);
    this.myChart.options.legend.display = this.isSmallScreen;
  }

  ngOnInit() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);

    const initialScreenSize = this.getScreenSize();
    initialScreenSize > 725 ? (this.isSmallScreen = true) : (this.isSmallScreen = false);

    this.isLoading = true;
    this.chartService.getUsersTagData();

    this.tagSub = this.chartService.getUserTagsUpdateListener().subscribe((tagData) => {
      this.isLoading = false;

      const dataCount = [
        tagData.tagCount.apps,
        tagData.tagCount.bills,
        tagData.tagCount.donations,
        tagData.tagCount.entertainment,
        tagData.tagCount.finances,
        tagData.tagCount.gaming,
        tagData.tagCount.personalCare,
        tagData.tagCount.shopping
      ];

      this.myChart = new Chart(htmlRef, {
        type: 'pie',
        data: {
          labels: [
            'Apps',
            'Bills',
            'Donations',
            'Entertainment',
            'Finances',
            'Gaming',
            'Personal Care',
            'Shopping'
          ],
          datasets: [
            {
              data: dataCount,
              backgroundColor: [
                '#F44336',
                '#9C27B0',
                '#3F51B5',
                '#03A9F4',
                '#4CAF50',
                '#FFEB3B',
                '#FF9800',
                '#009688'
              ]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            text: 'Your Tag Data',
            fontSize: 24,
            fontFamily: 'Roboto',
            display: true
          },

          scales: {},
          legend: {
            display: this.isSmallScreen,
            position: 'top'
          }
        }
      });
    });
  }
}
