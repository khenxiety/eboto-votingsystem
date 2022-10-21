import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VotersSidePageComponent } from './voters-side-page/voters-side-page.component';
import { VotersPageHeaderComponent } from './components/voters-page-header/voters-page-header.component';
import { VotersPageFooterComponent } from './components/voters-page-footer/voters-page-footer.component';
import { VoteSubmittedComponent } from './vote-submitted/vote-submitted.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService as AuthGuard } from 'src/app/auth/auth-guard.service';
const routes: Routes = [
  {
    path: 'voting-system',
    component: VotersSidePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vote-complete',
    component: VoteSubmittedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'voting-system',
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [
    VotersSidePageComponent,
    VotersPageHeaderComponent,
    VotersPageFooterComponent,
    VoteSubmittedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class VotersSideModule {}
