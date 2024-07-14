import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { PaymentService } from '../services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { debounce } from 'lodash';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  userId: number = 0;
  successMessage: string = '';
  private isUpgraded: boolean = false; 
  private isUpgradeInProgress: boolean = false; 

  constructor(private premiumService: PaymentService, private authService: AuthService) {}
  ngOnInit(): void {
    const userId = this.authService.userId();

    if (userId !== null && userId !== undefined) {
      this.premiumService.upgradeToPremium(userId).subscribe(
        (response: any) => {
          //console.log('Payment URL:', response.url);
          //console.log("Response", response);
          // this.paymentUrl = response.url;
          //window.location.href = this.paymentUrl;
        }
      );
    } else {
      console.error('User ID is missing.');
    }
  }

  upgradeToPremium(): void {
    const userId = this.authService.userId();
    this.premiumService.upgradeToPremium(userId).subscribe(
      response => {
        console.log('success');
      }
    );
  }
}