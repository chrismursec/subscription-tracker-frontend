import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { SubscriptionService } from '../subscriptions/subscription.service';
import { Subscription } from 'rxjs';
import { UserSubscription } from '../subscriptions/subscription.model';
import * as moment from 'moment';

@Component({
	selector: 'app-calendar-view',
	templateUrl: './calendar-view.component.html',
	styleUrls: [ './calendar-view.component.scss' ]
})
export class CalendarViewComponent implements OnInit {
	constructor(private subscriptionService: SubscriptionService) {}

	events: any[] = [];
	subscriptions: any[] = [];
	private subscriptionSub: Subscription;
	calendarOptions: CalendarOptions = {
		initialView: 'dayGridMonth',
		events: [],
		headerToolbar: {
			left: 'prev,next',
			center: 'title',
			right: ''
		}
	};

	formatDate(date) {
		let formattedDate = moment(date).format('YYYY-MM-DD');
		return formattedDate;
	}

	getUpcomingDate(date, cycle) {
		switch (cycle) {
			case 'weekly':
				return this.makeThisWeek(date);
			case 'monthly':
				let newDate = this.makeThisYear(date);
				return this.makeThisMonth(newDate);
			case 'yearly':
				return this.makeThisYear(date);
			default:
				return this.formatDate(date);
		}
	}

	makeThisMonth(date) {
		const now = new Date();
		const formattedNow = this.formatDate(now);
		const formattedSubDate = this.formatDate(date);
		const nowMonth = formattedNow.substring(5, 7);

		let thisMonthSubDate = `${formattedSubDate.substring(0, 4)}-${nowMonth}-${formattedSubDate.substring(8, 10)}`;
		return thisMonthSubDate;
	}

	makeThisWeek(date) {}

	makeThisYear(date) {
		let currentDate = moment().format('YYYY-MM-DD');
		let subscriptionOGDate = moment(date).format('YYYY-MM-DD');

		let difference = parseInt(currentDate.substring(0, 4)) - parseInt(subscriptionOGDate.substring(0, 4));
		let futureYear = moment(date).add(difference, 'years').format('YYYY-MM-DD');
		return futureYear;
	}

	ngOnInit() {
		this.subscriptionService.getSubscriptions(null, null);

		this.subscriptionSub = this.subscriptionService
			.getSubscriptionUpdateListener()
			.subscribe((subscriptionData: { subscriptions: UserSubscription[]; subscriptionCount: number }) => {
				this.events = [];
				this.subscriptions = subscriptionData.subscriptions;
				this.subscriptions.map((sub) => {
					// this.makeThisMonth(sub.startDate);
					this.events.push({
						title: sub.title,
						start: this.getUpcomingDate(sub.startDate, sub.billingCycle)
					});
				});
				console.log(this.events);

				this.calendarOptions.events = this.events;
			});
	}
}
