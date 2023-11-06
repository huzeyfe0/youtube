import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgxsModule } from '@ngxs/store';
import { AppState } from 'src/states/app.state';
import {
  NgxsStoragePluginModule,
  StorageEngine,
  STORAGE_ENGINE,
} from '@ngxs/storage-plugin';

// export class MyStorageEngine implements StorageEngine {
//   sessionStorageStates = ['exampleStorageSessionStateName'];
//   readonly length: number = sessionStorage.length + localStorage.length;

//   clear(): void {
//     sessionStorage.clear();
//     localStorage.clear();
//   }

//   getItem(key: string): any {
//     let val: any;
//     if (this.sessionStorageStates.includes(key)) {
//       val = sessionStorage.getItem(key);
//     } else {
//       val = localStorage.getItem(key);
//     }
//     return val;
//   }

//   removeItem(key: string): void {
//     if (this.sessionStorageStates.includes(key)) {
//       sessionStorage.removeItem(key);
//     } else {
//       localStorage.removeItem(key);
//     }
//   }

//   setItem(key: string, val: any): void {
//     if (this.sessionStorageStates.includes(key)) {
//       sessionStorage.setItem(key, val);
//     } else {
//       localStorage.setItem(key, val);
//     }
//   }
// }

export class MyModule {}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    CdkDrag,
    CdkDropList,
    NgFor,
    NgxsModule.forRoot([AppState], {
      developmentMode: true,
    }),
    NgxsStoragePluginModule.forRoot({ key: 'appstate' }),
  ], //imports: [CdkDropList, NgFor, CdkDrag],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
