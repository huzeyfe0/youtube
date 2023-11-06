import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { GetYoutubeVideos } from '../actions/app.action';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SaveVideos } from '../actions/app.action';

export class VideosStateModel {
  videos: any[];
}

@State<VideosStateModel>({
  name: 'appstate',
  defaults: {
    videos: [],
  },
})
@Injectable()
export class AppState {
  constructor(private http: HttpClient) {}

  @Selector()
  static selectStateData(state: VideosStateModel) {
    return state.videos;
  }

  @Action(GetYoutubeVideos)
  async getDataFromState(
    ctx: StateContext<VideosStateModel>,
    { channelId, maxResults }: GetYoutubeVideos
  ) {
    const url = 'https://www.googleapis.com/youtube/v3/search';

    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyA-j-MWmAtsuR65WOzQQ79HWNWeiht89Rg')// Youtube API key here
      .set('channelId', channelId)
      .set('maxResults', maxResults);

    const options = { params: urlParams };
    try {
      const data = await this.http.get<any>(url, options).toPromise();
      const temp = data.items?.map((item: any, i: number) => {
        return { ...item, customOrder: i, notes: '' };
      });
      const state = ctx.getState();
      ctx.setState({
        ...state,
        videos: temp,
      });
    } catch (err) {
      console.log(`err`, err);
    }
  }

  @Action(SaveVideos)
  saveVideos(ctx: StateContext<VideosStateModel>, { videos }: SaveVideos) {
    const state = ctx.getState();
    console.log(`in actions`, videos);

    let newVids = [...videos];
    ctx.setState({
      ...state,
      videos: newVids,
    });
  }
}
