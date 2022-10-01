import { VideosStoreModel } from "./VideosStore"

test("can be created", () => {
  const instance = VideosStoreModel.create({})

  expect(instance).toBeTruthy()
})
