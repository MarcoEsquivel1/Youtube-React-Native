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


//comments
export interface ApiCommentsResponse {
  items: CommentItem[];
  nextPageToken: string;
}

export interface CommentItem {
  id: string;
  snippet: ItemSnippet;
}

export interface ItemSnippet {
  topLevelComment: TopLevelComment;
  totalReplyCount: number;
  videoId: string;
}

export interface TopLevelComment {
  id: string;
  snippet: TopLevelCommentSnippet;
}


export interface TopLevelCommentSnippet {
  authorDisplayName: string;
  authorProfileImageUrl: string;
  likeCount: number;
  textDisplay: string;
  textOriginal: string;
  videoId: string;
}

export interface AuthorChannelID {
  value: string;
}

