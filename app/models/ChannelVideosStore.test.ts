import { ChannelVideosStoreModel } from "./ChannelVideosStore"

test("can be created", () => {
  const instance = ChannelVideosStoreModel.create({})

  expect(instance).toBeTruthy()
})
