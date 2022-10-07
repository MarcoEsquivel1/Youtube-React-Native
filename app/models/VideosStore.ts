import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { withSetPropAction } from "./helpers/with-set-prop-action"
import { VideoModel } from "./Video"

/**
 * Model description here for TypeScript hints.
 */
export const VideosStoreModel = types
  .model("VideosStore")
  .props({
    isLoading: false,
    nextPageToken: types.optional(types.string, ''),
    vList: types.optional(types.array(VideoModel), []),
  })
  .views((self) => ({
    get videosList() {
      return self.vList
    },
    get nextToken(){
      return self.nextPageToken
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchVideos() {
      const response = await api.getVideos()
      console.log("prueba", response)
      if (response.kind === "ok") {
        console.log(response.videos)
        self.setProp("vList", response.videos)
        self.setProp("nextPageToken", response.nextPageToke)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
    async fetchMoreVideos() {
      self.setProp("isLoading", true)
      const response = await api.getMoreVideos(self.nextPageToken)
      if (response.kind === "ok") {
        this.update(response)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
      self.setProp("isLoading", false)
    },
    update (response){
      const up = self.videosList
      response.videos.map((video)=>{
        up.push(video)
      })
      self.setProp("vList", up)
      self.setProp("nextPageToken", response.nextPageToke)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface VideosStore extends Instance<typeof VideosStoreModel> { }
export interface VideosStoreSnapshotOut extends SnapshotOut<typeof VideosStoreModel> { }
export interface VideosStoreSnapshotIn extends SnapshotIn<typeof VideosStoreModel> { }
export const createVideosStoreDefaultModel = () => types.optional(VideosStoreModel, {})
