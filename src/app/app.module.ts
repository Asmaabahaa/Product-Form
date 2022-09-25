import { InMemoryDataService } from './in-memory-data.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductSelectorComponent } from './product-selector/product-selector.component';
import { MessagesComponent } from './messages/messages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
// Custom angular notifier Styling
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 200
		},
    vertical: {
      position: 'top',
    },
  },
  behaviour: {

    autoHide: false,
  }  
}

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductSelectorComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
