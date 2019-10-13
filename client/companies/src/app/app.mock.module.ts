import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule, MatButton} from '@angular/material/button';
import {MatCardModule, MatCard} from '@angular/material/card';
import {MatFormFieldModule, MatFormField, MatError} from '@angular/material/form-field';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    RouterTestingModule,

    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  exports: [
    MatCard,
    MatError,
    MatFormField,
    MatIcon,
    MatSpinner,
  ]
})
export class AppMockModule { }
