import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartsService } from '../charts.service';
import { Subscription } from 'rxjs';
@Component({
	selector: 'app-tag-chart',
	templateUrl: './tag-chart.component.html',
	styleUrls: [ './tag-chart.component.scss' ]
})
export class TagChartComponent implements OnInit {
	constructor(private chartService: ChartsService) {}

	private tagSub: Subscription;
	ctx = 'myChart';
	data;
	tags;

	ngOnInit() {
		this.chartService.getUsersTagData();
		this.tagSub = this.chartService.getUserTagsUpdateListener().subscribe((tagData) => {
			this.tags = tagData;

			let dataCount = [
				tagData.tagCount.apps,
				tagData.tagCount.bills,
				tagData.tagCount.donations,
				tagData.tagCount.entertainment,
				tagData.tagCount.finances,
				tagData.tagCount.gaming,
				tagData.tagCount.personalCare,
				tagData.tagCount.shopping
			];

			let myChart = new Chart(this.ctx, {
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
