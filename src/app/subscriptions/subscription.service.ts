import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserSubscription } from './subscription.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptions: UserSubscription[] = [];
  private subscriptionsUpdated = new Subject<{ subscriptions: UserSubscription[]; subscriptionCount: number }>();
  private hostUrl: string = 'https://subtrackerapi.herokuapp.com/api/subscriptions';
  // private hostUrl: string = 'http://localhost:3000/api/subscriptions';

  constructor(private http: HttpClient, private router: Router) {}

  addSubscription(data) {
    this.http
      .post<{ message: string; subscription: UserSubscription; id: string }>(this.hostUrl, data)
      .subscribe((responseData) => {
        const postId = responseData.id;
        this.router.navigate([ '/subscriptions' ]);
      });
  }

  updateSubscription(data) {
    this.http.put(this.hostUrl + `/${data.id}`, data).subscribe((response) => {
      this.router.navigate([ '/subscriptions' ]);
    });
  }

  getSubscriptions(subsPerPage: number, currentPage: number, sort: string) {
    let queryParams;

    if (subsPerPage && currentPage) {
      queryParams = `?pagesize=${subsPerPage}&page=${currentPage}`;
    } else {
      queryParams = '';
    }

    if (sort) {
      queryParams = `${queryParams}&sort=${sort}`;
    }

    this.http
      .get<{ message: string; subscriptions: any; maxPosts: number }>(this.hostUrl + queryParams)
      .pipe(
        map((subscriptionData) => {
          return {
            subscriptions: subscriptionData.subscriptions.map((subscription) => {
              return {
                id: subscription._id,
                title: subscription.title,
                startDate: subscription.startDate,
                startDateString: subscription.startDateString,
                price: subscription.price,
                billingCycle: subscription.billingCycle,
                tags: subscription.tags
              };
            }),
            maxPosts: subscriptionData.maxPosts
          };
        })
      )
      .subscribe((transformedSubscriptionData) => {
        this.subscriptions = transformedSubscriptionData.subscriptions;
        this.subscriptionsUpdated.next({
          subscriptions: [ ...this.subscriptions ],
          subscriptionCount: transformedSubscriptionData.maxPosts
        });
      });
  }

  getSubscription(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      price: number;
      startDate: any;
      billingCycle: string;
      startDateString: string;
      owner: string;
      tags: string;
    }>(this.hostUrl + `/${id}`);
  }

  getSubscriptionUpdateListener() {
    return this.subscriptionsUpdated.asObservable();
  }

  deleteSubscription(id: string) {
    return this.http.delete(this.hostUrl + `/${id}`);
  }
}
