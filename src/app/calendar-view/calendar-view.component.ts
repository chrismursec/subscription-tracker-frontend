import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { SubscriptionService } from '../subscriptions/subscription.service';
import { Subscription } from 'rxjs';
import { UserSubscription } from '../subscriptions/subscription.model';

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
			left: '',
			center: 'title',
			right: ''
		}
	};

	formatDate(date) {
		const d = new Date(date);
		let month = '' + (d.getMonth() + 1);
		let day = '' + (d.getDate() + 1);

		let year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		const formattedDate = [ year, month, day ].join('-');
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
		const subMonth = formattedSubDate.substring(5, 7);
		const nowMonth = formattedNow.substring(5, 7);

		let thisMonthSubDate = `${formattedSubDate.substring(0, 4)}-${nowMonth}-${formattedSubDate.substring(8, 10)}`;
		return thisMonthSubDate;
	}

	makeThisWeek(date) {}

	makeThisYear(date) {
		const now = new Date();
		const formattedNow = this.formatDate(now);
		const formattedSubDate = this.formatDate(date);
		const subYear = formattedSubDate.substring(0, 4);
		const nowYear = formattedNow.substring(0, 4);

		let thisYearSubDate = `${nowYear}-${formattedSubDate.substring(5, 7)}-${formattedSubDate.substring(8, 10)}`;
		return thisYearSubDate;
	}

	ngOnInit() {
		this.subscriptionService.getSubscriptions(null, null);

		this.subscriptionSub = this.subscriptionService
			.getSubscriptionUpdateListener()
			.subscribe((subscriptionData: { subscriptions: UserSubscription[]; subscriptionCount: number }) => {
				this.subscriptions = subscriptionData.subscriptions;
				this.subscriptions.map((sub) => {
					this.makeThisMonth(sub.startDate);
					this.events = [
						...this.events,
						{
							title: sub.title,
							start: this.getUpcomingDate(sub.startDate, sub.billingCycle)
						}
					];
				});
				console.log(this.events);

				this.calendarOptions.events = this.events;
			});
	}
}
