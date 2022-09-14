import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeComponent } from './component/recipe/recipe.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UserComponent } from './component/user/user.component';
import { AuthInterceptorProvider } from './interceptor/auth.interceptor';
import { CreateRecipeComponent } from './component/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from './component/update-recipe/update-recipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    RecipeComponent,
    PageNotFoundComponent,
    UserComponent,
    CreateRecipeComponent,
    UpdateRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'absolute',
    }),
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
