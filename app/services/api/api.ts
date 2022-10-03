/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse,
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiCommentsResponse,
  ApiConfig,
  ApiFeedResponse, // @demo remove-curent-line
} from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./api-problem"
import type { VideoSnapshotIn } from "../../models/Video"
import { CommentSnapshotIn } from "../../models/Comment"
/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}
//const apiKey = 'AIzaSyBQlbvlM-0n2OLVi99nG0FB7x0N8uyhcYI'
/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
      params: {
        key: 'AIzaSyAAwW69pJNe7rw657Ew4fouWlG6LQ3pn_Q'
    }
    })
  }

  async getComments(videoId: string): Promise<{ kind: "ok"; comments: CommentSnapshotIn[]; nextPageToke: string} | GeneralApiProblem> {
    const response: ApiResponse<ApiCommentsResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet`
    )
    
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      
      // This is where we transform the data into the shape we expect for our MST model.
      const comments: CommentSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      const nextPageToke = rawData.nextPageToken
      return { kind: "ok", comments, nextPageToke}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async getVideos(): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]; nextPageToke: string} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video`
    )
    
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      
      // This is where we transform the data into the shape we expect for our MST model.
      const videos: VideoSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      const nextPageToke = rawData.nextPageToken
      return { kind: "ok", videos, nextPageToke}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async getMoreVideos(pageToken: string): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]; nextPageToke: string} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${pageToken}&type=video`
    )
    
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      
      // This is where we transform the data into the shape we expect for our MST model.
      const videos: VideoSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      const nextPageToke = rawData.nextPageToken
      return { kind: "ok", videos, nextPageToke}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async getChannelVideos(channelId: string): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]; nextPageToke: string} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&order=date&maxResults=10`
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      // This is where we transform the data into the shape we expect for our MST model.
      const videos: VideoSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))
      const nextPageToke = rawData.nextPageToken
      return { kind: "ok", videos, nextPageToke}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async getMoreChannelVideos(channelId: string, pageToken: string): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]; nextPageToke: string} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&pageToken=${pageToken}&order=date&maxResults=10`
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      // This is where we transform the data into the shape we expect for our MST model.
      const videos: VideoSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))
      const nextPageToke = rawData.nextPageToken
      return { kind: "ok", videos, nextPageToke}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  
  async getRecommendedVideos(videoId: string): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]; nextPageToke: string} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/search?type=video&relatedToVideoId=${videoId}&part=snippet&maxResults=10`
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      
      // This is where we transform the data into the shape we expect for our MST model.
      const videos: VideoSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))    
      const nextPageToke = rawData.nextPageToken
      return { kind: "ok", videos, nextPageToke}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async getMoreRecommendedVideos(videoId: string, pageToken: string): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]; nextPageToke: string} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/search?type=video&relatedToVideoId=${videoId}&part=snippet&pageToken=${pageToken}&maxResults=10`
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      
      // This is where we transform the data into the shape we expect for our MST model.
      const videos: VideoSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))    
      const nextPageToke = rawData.nextPageToken
      return { kind: "ok", videos, nextPageToke}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}


// Singleton instance of the API for convenience
export const api = new Api()
