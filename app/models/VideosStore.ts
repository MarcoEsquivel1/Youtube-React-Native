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
    items: types.optional(types.array(VideoModel), []),
  })
  .views((self) => ({
    get videosList() {
      return self.items
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchVideos() {
      const response = await api.getVideos()
      if (response.kind === "ok") {
        self.setProp("items", response.videos)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface VideosStore extends Instance<typeof VideosStoreModel> { }
export interface VideosStoreSnapshotOut extends SnapshotOut<typeof VideosStoreModel> { }
export interface VideosStoreSnapshotIn extends SnapshotIn<typeof VideosStoreModel> { }
export const createVideosStoreDefaultModel = () => types.optional(VideosStoreModel, {})

/* let _videosStore:VideosStore|null = null

export function useStore(){
  if(!_videosStore){
    _videosStore = VideosStoreModel.create({
      items: [],
    })
  }

  return _videosStore
} */
