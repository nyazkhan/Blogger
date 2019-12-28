import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvitationListPage } from './invitation-list.page';
import { CommanModule } from '../comman/comman.module';
import { InvitationComponent } from '../comman/invitation/invitation.component';

const routes: Routes = [
  {
    path: '',
    component: InvitationListPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    CommanModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvitationListPage],
  entryComponents: [InvitationComponent]
})
export class InvitationListPageModule { }
