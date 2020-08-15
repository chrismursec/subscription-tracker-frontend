import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { UserSubscription } from '../subscription.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {
  faEdit,
  faTrash,
  faCalendar,
  faRedoAlt,
  faTags,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-subscriptions',
  templateUrl: './list-subscriptions.component.html',
  styleUrls: [ './list-subscriptions.component.scss' ]
})
export class ListSubscriptionsComponent implements OnInit {
  private subscriptionSub: Subscription;
  subscriptions: UserSubscription[] = [];
  subscriptionCount = 0;
  subscriptionsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [ 1, 2, 5, 10 ];
  sortChoice = 'titleasc';
  sortOptions = [
    { value: 'titleasc', viewValue: 'A-Z', icon: faSortUp },
    { value: 'titledesc', viewValue: 'A-Z', icon: faSortDown },

    { value: 'startDateasc', viewValue: 'Start Date', icon: faSortUp },
    { value: 'startDatedesc', viewValue: 'Start Date', icon: faSortDown },

    { value: 'priceasc', viewValue: 'Price', icon: faSortUp },
    { value: 'pricedesc', viewValue: 'Price', icon: faSortDown }
  ];

  faEdit = faEdit;
  faTrash = faTrash;
  faCalendar = faCalendar;
  faRedoAlt = faRedoAlt;
  faTags = faTags;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  isLoading = false;

  constructor(private subscriptionService: SubscriptionService, public dialog: MatDialog) {}

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
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
      id,
      title
    };
    this.dialog.open(DeleteDialogComponent, dialogConfig);
  }

  toUpper(cycle: string) {
    let firstLetter = cycle.substring(0, 1);
    const rest = cycle.substring(1);
    firstLetter = firstLetter.toUpperCase();
    cycle = firstLetter + rest;
    return cycle;
  }

  ngOnInit() {
    this.isLoading = true;
    this.subscriptionService.getSubscriptions(this.subscriptionsPerPage, this.currentPage, this.sortChoice);
    this.subscriptionSub = this.subscriptionService
      .getSubscriptionUpdateListener()
      .subscribe((subscriptionData: { subscriptions: UserSubscription[]; subscriptionCount: number }) => {
        this.isLoading = false;
        this.subscriptionCount = subscriptionData.subscriptionCount;
        this.subscriptions = subscriptionData.subscriptions;
      });
  }
}
