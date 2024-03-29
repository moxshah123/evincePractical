import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule
  ],
  exports:[
    CommonModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule
  ]
})
export class SharedModule { }
