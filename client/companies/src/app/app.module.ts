import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyEditorComponent } from './components/company-editor/company-editor.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CompanyCreatorComponent } from './components/company-creator/company-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    CompanyInfoComponent,
    CompanyEditorComponent,
    PageNotFoundComponent,
    CompanyCreatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
