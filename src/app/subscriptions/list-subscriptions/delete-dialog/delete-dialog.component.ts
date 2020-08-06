import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubscriptionService } from '../../subscription.service';

@Component({
	selector: 'app-delete-dialog',
	templateUrl: './delete-dialog.component.html',
	styleUrls: [ './delete-dialog.component.scss' ]
})
export class DeleteDialogComponent implements OnInit {
	constructor(
		private dialogRef: MatDialogRef<DeleteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data,
		private subscriptionService: SubscriptionService
	) {
		this.title = data.title;
		this.id = data.id;
	}

	title: string;
	id: string;
	subscriptionsPerPage = 5;
	currentPage = 1;

	close() {
		this.dialogRef.close();
	}

	onDelete(id: string) {
		this.subscriptionService.deleteSubscription(id).subscribe(() => {
			this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage, null);
		});
		this.close();
	}

	ngOnInit() {}
}
