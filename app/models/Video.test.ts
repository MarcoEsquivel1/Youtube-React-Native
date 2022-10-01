import { VideoModel } from "./Video"

test("can be created", () => {
  const instance = VideoModel.create({})

  expect(instance).toBeTruthy()
})
