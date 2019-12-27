import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvitationListPage } from './invitation-list.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationListPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvitationListPage]
})
export class InvitationListPageModule {}
