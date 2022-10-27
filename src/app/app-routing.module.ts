import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySymphoniesComponent } from './components/my-symphonies/my-symphonies.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SymphonyViewComponent } from './components/symphony-view/symphony-view.component';

const routes: Routes = [
  { path : 'view', component : SymphonyViewComponent },
  { path: 'mySymphonies', component : MySymphoniesComponent },
  { path: '',   redirectTo: '/mySymphonies', pathMatch: 'full' },
  { path: '**',   component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
