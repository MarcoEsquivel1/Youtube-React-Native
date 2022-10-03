import { CommentsSotreModel } from "./CommentsSotre"

test("can be created", () => {
  const instance = CommentsSotreModel.create({})

  expect(instance).toBeTruthy()
})
