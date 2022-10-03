import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { withSetPropAction } from "./helpers/with-set-prop-action"
import { ChannelModel } from "./Channel"
/**
 * Model description here for TypeScript hints.
 */
export const ChannelStoreModel = types
  .model("ChannelStore")
  .props({
    isLoading: false,
    items: types.optional(types.array(ChannelModel), []),
  })
  .views((self) => ({
    get channel() {
      return self.items
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchChannel(channelId) {
      self.setProp("isLoading", true)
      console.log('yes')
      const response = await api.getChannel(channelId)
      if (response.kind === "ok") {
        self.setProp("items", response.channel)
      } else {
        console.tron.error(`Error fetching channel: ${JSON.stringify(response)}`, [])
      }
      self.setProp("isLoading", false)
    }
  }))

export interface ChannelStore extends Instance<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotOut extends SnapshotOut<typeof ChannelStoreModel> {}
export interface ChannelStoreSnapshotIn extends SnapshotIn<typeof ChannelStoreModel> {}
export const createChannelStoreDefaultModel = () => types.optional(ChannelStoreModel, {})

