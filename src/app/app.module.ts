import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  MatInputModule, 
  MatCardModule, 
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http'
import { PostCreateComponent } from './posts/posts-create/post-create.component';
import { PostListComponent } from './posts/posts-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }