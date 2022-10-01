import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const VideoModel = types
  .model("Video")
  .props({
    snippet: types.model({
      publishedAt: types.Date,
      channelId: types.string,
      title: types.string,
      description: types.string,
      thumbnails: types.model({
        default: types.model({
          url: types.string,
          width: types.number,
          height: types.number
        }),
        medium: types.model({
          url: types.string,
          width: types.number,
          height: types.number
        }),
        high: types.model({
          url: types.string,
          width: types.number,
          height: types.number
        })
      }),
      channelTitle: types.string,
      liveBroadcastContent: types.string,
      publishTime: types.Date
    }),
    kind: types.string,
    etag: types.string,
    id: types.model({
      kind: types.string,
      videoId: types.string
    }),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Video extends Instance<typeof VideoModel> { }
export interface VideoSnapshotOut extends SnapshotOut<typeof VideoModel> { }
export interface VideoSnapshotIn extends SnapshotIn<typeof VideoModel> { }
export const createVideoDefaultModel = () => types.optional(VideoModel, {})
