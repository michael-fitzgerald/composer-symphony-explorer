import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SymphonyViewComponent } from './components/symphony-view/symphony-view.component';

const routes: Routes = [
  { path : 'view', component : SymphonyViewComponent},
  { path: '',   redirectTo: '/view', pathMatch: 'full' },
  { path: '**',   component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
