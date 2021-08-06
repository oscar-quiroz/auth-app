import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 10px 40px;
      }

      .btn-grad {
        background-image: linear-gradient(
          to right,
          #e9d362 0%,
          #333333 51%,
          #e9d362 100%
        );
      }

      .btn-grad {
        margin: 10px;
        padding: 15px 45px;
        text-align: center;
        text-transform: uppercase;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20px #eee;
        border-radius: 10px;
        display: block;
      }
    `,
  ],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigateByUrl('/auth');
  }
}
