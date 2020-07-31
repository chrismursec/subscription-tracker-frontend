import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { UserSubscription } from '../subscription.model';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-list-subscriptions',
  templateUrl: './list-subscriptions.component.html',
  styleUrls: ['./list-subscriptions.component.scss']
})
export class ListSubscriptionsComponent implements OnInit {

  constructor(private subscriptionService: SubscriptionService, public dialog: MatDialog) { }


  subscriptions: UserSubscription[] = [];
	totalSubscriptions = 0;
	private subscriptionSub: Subscription;
	subscriptionsPerPage = 5;
	currentPage = 1;
	pageSizeOptions = [ 1, 2, 5, 10 ];

  onChangedPage(pageData: PageEvent) {
		this.currentPage = pageData.pageIndex + 1;
		this.subscriptionsPerPage = pageData.pageSize;
		this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage);
  }

  openDeleteDialog(id: string, title: string) {


  }

  onDelete(id: string) {
		this.subscriptionService.deleteSubscription(id).subscribe(() => {
			this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage);
		});
	}


	ngOnInit() {
		this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage);
		this.subscriptionSub = this.subscriptionService
			.getSubscriptionUpdateListener()
			.subscribe((subscriptionData: { subscriptions: UserSubscription[]; subscriptionCount: number }) => {
        console.log(subscriptionData);
				this.totalSubscriptions = subscriptionData.subscriptionCount;
				this.subscriptions = subscriptionData.subscriptions;
			});
	}

}

