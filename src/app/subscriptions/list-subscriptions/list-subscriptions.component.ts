import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { UserSubscription } from '../subscription.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-list-subscriptions',
	templateUrl: './list-subscriptions.component.html',
	styleUrls: [ './list-subscriptions.component.scss' ]
})
export class ListSubscriptionsComponent implements OnInit {
	constructor(private subscriptionService: SubscriptionService, public dialog: MatDialog) {}

	subscriptions: UserSubscription[] = [];
	subscriptionCount = 0;
	subscriptionsPerPage = 5;
	currentPage = 1;
	pageSizeOptions = [ 1, 2, 5, 10 ];
	private subscriptionSub: Subscription;

	onChangedPage(pageData: PageEvent) {
		this.currentPage = pageData.pageIndex + 1;
		this.subscriptionsPerPage = pageData.pageSize;
		this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage);
	}

	openDeleteDialog(id: string, title: string) {
		console.log(id);
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
		this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage);
		this.subscriptionSub = this.subscriptionService
			.getSubscriptionUpdateListener()
			.subscribe((subscriptionData: { subscriptions: UserSubscription[]; subscriptionCount: number }) => {
				this.subscriptionCount = subscriptionData.subscriptionCount;
				this.subscriptions = subscriptionData.subscriptions;
			});
	}
}
