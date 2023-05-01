import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WordFilterComponent } from './word-filter/word-filter.component';
import { WordListComponent } from './word-list/word-list.component';
import { WordPreviewComponent } from './word-preview/word-preview.component';
import { WordDetailsComponent } from './word-details/word-details.component';
import { WordIndexComponent } from './word-index/word-index.component';
import { WordEditComponent } from './word-edit/word-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WordFilterComponent,
    WordListComponent,
    WordPreviewComponent,
    WordDetailsComponent,
    WordIndexComponent,
    WordEditComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
