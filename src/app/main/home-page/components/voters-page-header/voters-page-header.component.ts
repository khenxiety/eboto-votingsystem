import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voters-page-header',
  templateUrl: './voters-page-header.component.html',
  styleUrls: ['./voters-page-header.component.scss'],
})
export class VotersPageHeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    this.router.navigate(['login']);
  }
}
