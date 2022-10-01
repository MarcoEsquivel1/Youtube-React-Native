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
  etag:          string;
  items:         VideoItem[];
  kind:          string;
  nextPageToken: string;
  pageInfo:      PageInfo;
  regionCode:    string;
 }
 
 export interface VideoItem {
  snippet: Snippet;
  kind:    string;
  etag:    string;
  id:      ID;
 }
 
 export interface ID {
  kind:    string;
  videoId: string;
 }
 

 
 export interface Snippet {
  publishedAt:          Date;
  channelId:            string;
  title:                string;
  description:          string;
  thumbnails:           Thumbnails;
  channelTitle:         string;
  liveBroadcastContent: string;
  publishTime:          Date;
 }

 
 export interface Thumbnails {
  default: Default;
  high:    Default;
  medium:  Default;
 }
 
 export interface Default {
  height: number;
  url:    string;
  width:  number;
 }
 
 export interface PageInfo {
  resultsPerPage: number;
  totalResults:   number;
 }
 