import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VotersSidePageComponent } from './voters-side-page/voters-side-page.component';
import { VotersPageHeaderComponent } from './components/voters-page-header/voters-page-header.component';
import { VotersPageFooterComponent } from './components/voters-page-footer/voters-page-footer.component';

const routes: Routes = [
  {
    path: 'voting-system',
    component: VotersSidePageComponent,
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
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class VotersSideModule {}
