import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { WordDetailsComponent } from './word-details/word-details.component';
import { WordIndexComponent } from './word-index/word-index.component';
import { WordEditComponent } from './word-edit/word-edit.component';
import { wordResolver } from './services/word.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [ 
  { path: 'words', component: WordIndexComponent, 
  children:[
    {path: 'edit/:id',  component: WordEditComponent,  resolve: { word: wordResolver }},
    {path: 'edit',  component: WordEditComponent}
  ] },
  { path: 'words/:id', component: WordDetailsComponent  },
  { path: 'dashboard', component: DashboardComponent},
  { path:'', component:HomePageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
