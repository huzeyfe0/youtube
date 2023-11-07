import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';

import { GetYoutubeVideos, SaveVideos } from '../actions/app.action';
import { AppState } from '../states/app.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'youtube';
  isLoading: boolean = false;
  error: string = '';
  videos: [];
  @Select(AppState.selectStateData) videos$: Observable<any>;

  search: any = {
    keyword: '',
    channelId: 'UC6107grRI4m0o2-emgoDnAA', // famous channel of youtube SmarterEveryDay https://www.youtube.com/channel/UC6107grRI4m0o2-emgoDnAA just to show some data
    note: '',
    type: '',
    maxResults: 5, // default 5 ruseults
  };
  constructor(private sanitizer: DomSanitizer, private store: Store) {}

  ngOnInit(): void {
    this.videos$.subscribe((returnData) => {
      this.videos = returnData;
      this.isLoading = false;
    });
  }

  addNote(note: any, index: number) {
    console.log(`note`, note, index);
    var containputiner = document.querySelector('#' + note) as HTMLInputElement;
    console.log(containputiner?.value);

    let temp = this.videos;
    temp.map((vid: any, i: number) => {
      if (i == index) {
        vid['notes'] = containputiner?.value;
        return vid;
      } else return vid;
    });

    this.store.dispatch(new SaveVideos(temp));
  }

  async searchYoutube() {
    this.isLoading = true;
    this.store.dispatch(
      await new GetYoutubeVideos(this.search.channelId, this.search.maxResults)
    );
    this.videos$.subscribe((returnData) => {
      console.log(`returnData`, returnData);
      this.videos = returnData;
      this.isLoading = false;
    });
  }

  getVideoSource(id: string): SafeResourceUrl {
    if (id != '') {
      const url = 'https://www.youtube.com/embed/' + id;

      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return '';
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
    this.store.dispatch(new SaveVideos(this.videos));
  }
}
