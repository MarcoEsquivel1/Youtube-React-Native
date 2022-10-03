
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ChannelModel = types
  .model("Channel")
  .props({
    id: types.string,
    brandingSettings: types.model({
      channel: types.model({
        title: types.string,
        description: types.string,
        country: types.string
      }),
      image: types.model({
        bannerExternalUrl: types.string
      })
    })
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Channel extends Instance<typeof ChannelModel> { }
export interface ChannelSnapshotOut extends SnapshotOut<typeof ChannelModel> { }
export interface ChannelSnapshotIn extends SnapshotIn<typeof ChannelModel> { }
export const createChannelDefaultModel = () => types.optional(ChannelModel, {})
