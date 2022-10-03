import { RecommendedVideoStoreModel } from "./RecommendedVideoStore"

test("can be created", () => {
  const instance = RecommendedVideoStoreModel.create({})

  expect(instance).toBeTruthy()
})
