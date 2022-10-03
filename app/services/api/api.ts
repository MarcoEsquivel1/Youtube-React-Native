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
  ApiChannelResponse,
  ApiConfig,
  ApiFeedResponse, // @demo remove-curent-line
} from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./api-problem"
import type { VideoSnapshotIn } from "../../models/Video"
import { ChannelSnapshotIn } from "../../models/Channel"
/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

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
    })
  }

  async getVideos(): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=AIzaSyBH_bhuhrVku-kxyqkl1ddDbiopWPT7m6g"
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

      return { kind: "ok", videos}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async getChannelVideos(channelId: string): Promise<{ kind: "ok"; videos: VideoSnapshotIn[]} | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBH_bhuhrVku-kxyqkl1ddDbiopWPT7m6g&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`
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

      return { kind: "ok", videos}
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getChannel(channelId: string): Promise<{ kind: "ok"; channel: ChannelSnapshotIn[]} | GeneralApiProblem> {
    const response: ApiResponse<ApiChannelResponse> = await this.apisauce.get(
      `​https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=AIzaSyBH_bhuhrVku-kxyqkl1ddDbiopWPT7m6g`
    )
    console.log(response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      
      // This is where we transform the data into the shape we expect for our MST model.
      const channel: ChannelSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", channel}
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
