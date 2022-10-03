/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */


/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export interface ApiFeedResponse {
  nextPageToken: string;
  items: VideoItem[];
}

export interface VideoItem {
  id: ID;
  snippet: Snippet;
}

export interface ID {
  kind: string;
  videoId: string;
}



export interface Snippet {
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
}


export interface Thumbnails {
  default: Default;
  high: Default;
  medium: Default;
}

export interface Default {
  height: number;
  url: string;
  width: number;
}

export interface ApiChannelResponse {
  etag:     string;
  items:    Item[];
  kind:     string;
  pageInfo: PageInfo;
 }
 
 export interface Item {
  brandingSettings: BrandingSettings;
  etag:             string;
  id:               string;
  kind:             string;
 }
 
 export interface BrandingSettings {
  channel: Channel;
  image:   Image;
 }
 
 export interface Channel {
  description:         string;
  title:               string;
  unsubscribedTrailer: string;
 }
 
 export interface Image {
  bannerExternalUrl: string;
 }
 
 export interface PageInfo {
  resultsPerPage: number;
  totalResults:   number;
 }
 

