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
    channelId: 'UCtinbF-Q-fVthA0qrFQTgXQ',
    note: '',
    type: '',
    maxResults: 5,
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
    // console.log(`wwwwwwwwwwww`);

    if (id != '') {
      const url = 'https://www.youtube.com/embed/' + id;
      // console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));

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
