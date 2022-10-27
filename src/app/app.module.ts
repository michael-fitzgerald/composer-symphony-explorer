import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SymphonyViewComponent } from './components/symphony-view/symphony-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SymphonyViewNodeComponent } from './components/symphony-view-node/symphony-view-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table'


import { FormsModule } from '@angular/forms';
import { AssetPipe } from './pipes/asset.pipe';
import { MySymphoniesComponent } from './components/my-symphonies/my-symphonies.component';

@NgModule({
  declarations: [
    AppComponent,
    SymphonyViewComponent,
    PageNotFoundComponent,
    SymphonyViewNodeComponent,
    AssetPipe,
    MySymphoniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
