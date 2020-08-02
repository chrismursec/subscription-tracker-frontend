import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { SubscriptionService } from '../subscriptions/subscription.service';
import { Subscription } from 'rxjs';
import { UserSubscription } from '../subscriptions/subscription.model';
import * as moment from 'moment';
import { CalendarEvent } from './calendar-event.model';

@Component({
	selector: 'app-calendar-view',
	templateUrl: './calendar-view.component.html',
	styleUrls: [ './calendar-view.component.scss' ]
})
export class CalendarViewComponent implements OnInit {
	constructor(private subscriptionService: SubscriptionService) {}

	subscriptions: UserSubscription[];
	events: CalendarEvent[];
	private subscriptionSub: Subscription;

	calendarOptions: CalendarOptions = {
		initialView: 'dayGridMonth',
		events: [],
		headerToolbar: {
			left: '',
			center: 'title',
			right: ''
		}
	};

	formatDate(date) {
		return moment(date).format('YYYY-MM-DD');
	}

	getUpcomingDate(date, cycle) {
		switch (cycle) {
			case 'weekly':
				return this.makeThisWeek(date);
			case 'monthly':
				date = this.makeThisYear(date);
				return this.makeThisMonth(date);
			case 'yearly':
				return this.makeThisYear(date);
			default:
				return this.formatDate(date);
		}
	}

	/*TODO:
      -Implement makeThisWeek
    */
	makeThisWeek(date) {}

	makeThisMonth(date) {
		const currentDate = this.formatDate(new Date());
		const subscriptionDate = this.formatDate(date);
		const currentMonth = currentDate.substring(5, 7);

		const thisMonthSubDate = `${subscriptionDate.substring(0, 4)}-${currentMonth}-${subscriptionDate.substring(
			8,
			10
		)}`;
		return thisMonthSubDate;
	}

	makeThisYear(date) {
		const currentDate = this.formatDate(new Date());
		const subscriptionDate = moment(date).format('YYYY-MM-DD');
		const difference = parseInt(currentDate.substring(0, 4)) - parseInt(subscriptionDate.substring(0, 4));
		const currentYear = moment(date).add(difference, 'years').format('YYYY-MM-DD');
		return currentYear;
	}

	ngOnInit() {
		this.subscriptionService.getSubscriptions(null, null);
		this.subscriptionSub = this.subscriptionService
			.getSubscriptionUpdateListener()
			.subscribe((subscriptionData: { subscriptions: UserSubscription[]; subscriptionCount: number }) => {
				this.events = [];
				this.subscriptions = subscriptionData.subscriptions;
				this.subscriptions.map((sub) => {
					this.events.push({
						title: sub.title,
						start: this.getUpcomingDate(sub.startDate, sub.billingCycle)
					});
				});
				this.calendarOptions.events = this.events;
			});
	}
}
