import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSubscription } from '../subscription.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: [ './create-subscription.component.scss' ]
})
export class CreateSubscriptionComponent implements OnInit {
  form: FormGroup;
  categories = [ 'Apps', 'Bills', 'Donations', 'Entertainment', 'Finances', 'Gaming', 'Personal Care', 'Shopping' ];
  subscription: UserSubscription;
  private postId: string;
  private mode = 'create';
  isLoading = false;

  constructor(public subscriptionService: SubscriptionService, public route: ActivatedRoute) {}

  onSubmit() {
    this.isLoading = true;
    const fullStartDateString = moment(this.form.value.startDate).format('LL');
    const formattedStartDate = moment(this.form.value.startDate).format('YYYY-MM-DD');

    const subscriptionData: UserSubscription = {
      id: null,
      title: this.form.value.title,
      startDate: formattedStartDate,
      startDateString: fullStartDateString,
      price: this.form.value.price,
      billingCycle: this.form.value.billingCycle,
      tags: this.form.value.tags,
      owner: null
    };

    if (this.mode === 'create') {
      this.subscriptionService.addSubscription(subscriptionData);
      this.form.reset();
    } else if (this.mode === 'edit') {
      subscriptionData.id = this.subscription.id;
      subscriptionData.owner = this.subscription.owner;
      this.subscriptionService.updateSubscription(subscriptionData);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [ Validators.required, Validators.minLength(3) ]),
      startDate: new FormControl(null, [ Validators.required ]),
      price: new FormControl(null, [ Validators.required ]),
      billingCycle: new FormControl(null, [ Validators.required ]),
      tags: new FormControl(null, [ Validators.required ])
    });

    this.postId = null;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.subscriptionService.getSubscription(this.postId).subscribe((subscriptionData) => {
          this.isLoading = false;
          this.subscription = {
            id: subscriptionData._id,
            title: subscriptionData.title,
            price: subscriptionData.price,
            startDate: subscriptionData.startDate,
            billingCycle: subscriptionData.billingCycle,
            startDateString: subscriptionData.startDateString,
            owner: subscriptionData.owner,
            tags: subscriptionData.tags
          };

          const startDate = new Date(this.subscription.startDate);
          this.form.setValue({
            title: this.subscription.title,
            price: this.subscription.price,
            startDate,
            billingCycle: this.subscription.billingCycle,
            tags: this.subscription.tags
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
