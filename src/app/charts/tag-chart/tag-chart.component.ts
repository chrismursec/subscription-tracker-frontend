import { Component, OnInit, ElementRef } from '@angular/core';
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
  ctx = 'myChart';
  tags;
  isLoading = false;
  myChart: any;

  constructor(private chartService: ChartsService, private elementRef: ElementRef) {}

  ngOnInit() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);

    this.isLoading = true;
    this.chartService.getUsersTagData();
    this.tagSub = this.chartService.getUserTagsUpdateListener().subscribe((tagData) => {
      this.isLoading = false;
      this.tags = tagData;

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

      const myChart = new Chart(htmlRef, {
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
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
  }
}
