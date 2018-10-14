import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { BoardsDetailComponent } from './boards-detail/boards-detail.component';
import { BoardsCreateComponent } from './boards-create/boards-create.component';
import { BoardsEditComponent } from './boards-edit/boards-edit.component';
import {FsService} from './fs.service';


const appRoutes: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
    data: { title: 'Boards List' }
  },
  {
    path: 'boards-details/:id',
    component: BoardsDetailComponent,
    data: { title: 'Boards Details' }
  },
  {
    path: 'boards-create',
    component: BoardsCreateComponent,
    data: { title: 'Create Boards' }
  },
  {
    path: 'boards-edit/:id',
    component: BoardsEditComponent,
    data: { title: 'Edit Boards' }
  },
  { path: '',
    redirectTo: '/boards',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    BoardsDetailComponent,
    BoardsCreateComponent,
    BoardsEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FsService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
