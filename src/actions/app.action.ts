//Read
export class GetYoutubeVideos {
  static readonly type = '[Videos] Fetch';
  constructor(public channelId: string, public maxResults: number) {}
}

export class SaveVideos {
  static readonly type = '[App] Save Videos';
  constructor(public videos: any[]) {}
}
