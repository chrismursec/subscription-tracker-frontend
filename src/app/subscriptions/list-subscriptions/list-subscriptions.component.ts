import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { UserSubscription } from '../subscription.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { faEdit, faTrash, faCalendar, faRedoAlt, faTags } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-list-subscriptions',
	templateUrl: './list-subscriptions.component.html',
	styleUrls: [ './list-subscriptions.component.scss' ]
})
export class ListSubscriptionsComponent implements OnInit {
	constructor(private subscriptionService: SubscriptionService, public dialog: MatDialog) {}

	private subscriptionSub: Subscription;
	subscriptions: UserSubscription[] = [];
	subscriptionCount = 0;
	subscriptionsPerPage = 5;
	currentPage = 1;
	pageSizeOptions = [ 1, 2, 5, 10 ];
	sortChoice = 'title';
	sortOptions = [
		{ value: 'title', viewValue: 'A-Z' },
		{ value: 'startDate', viewValue: 'Start Date' },
		{ value: 'price', viewValue: 'Price' }
	];

	faEdit = faEdit;
	faTrash = faTrash;
	faCalendar = faCalendar;
	faRedoAlt = faRedoAlt;
	faTags = faTags;

	onChangedPage(pageData: PageEvent) {
		this.currentPage = pageData.pageIndex + 1;
		this.subscriptionsPerPage = pageData.pageSize;
		this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage, this.sortChoice);
	}

	onSortSelected(sortOption: string) {
		this.sortChoice = sortOption;
		this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage, this.sortChoice);
	}

	openDeleteDialog(id: string, title: string) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			id: id,
			title: title
		};
		this.dialog.open(DeleteDialogComponent, dialogConfig);
	}

	toUpper(cycle: string) {
		let firstLetter = cycle.substring(0, 1);
		let rest = cycle.substring(1);
		firstLetter = firstLetter.toUpperCase();
		cycle = firstLetter + rest;
		return cycle;
	}

	ngOnInit() {
		this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage, this.sortChoice);
		this.subscriptionSub = this.subscriptionService
			.getSubscriptionUpdateListener()
			.subscribe((subscriptionData: { subscriptions: UserSubscription[]; subscriptionCount: number }) => {
				this.subscriptionCount = subscriptionData.subscriptionCount;
				this.subscriptions = subscriptionData.subscriptions;
			});
	}
}
