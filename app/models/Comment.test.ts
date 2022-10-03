import { CommentModel } from "./Comment"

test("can be created", () => {
  const instance = CommentModel.create({})

  expect(instance).toBeTruthy()
})
