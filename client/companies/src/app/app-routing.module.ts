import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyCreatorComponent } from './components/company-creator/company-creator.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyEditorComponent } from './components/company-editor/company-editor.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/companies', pathMatch: 'full' },
  { path: 'companies',        component: CompanyListComponent },
  { path: 'companies/new',    component: CompanyCreatorComponent },
  { path: 'company/:id',      component: CompanyInfoComponent },
  { path: 'company/:id/edit', component: CompanyEditorComponent },
  { path: '**',               component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
