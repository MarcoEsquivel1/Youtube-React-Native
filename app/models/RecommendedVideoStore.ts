---
patches:
  - path: "app/models/RootStore.ts"
    after: "from \"mobx-state-tree\"\n"
    insert: "import { RecommendedVideoStoreModel } from \"./RecommendedVideoStore\"\n"
    skip: false
  - path: "app/models/RootStore.ts"
    after: "types.model(\"RootStore\").props({\n"
    insert: "  recommendedVideoStore: types.optional(RecommendedVideoStoreModel, {} as any),\n"
    skip: false
  - path: "app/models/index.ts"
    append: "export * from \"./RecommendedVideoStore\"\n" 
    skip: 
---
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const RecommendedVideoStoreModel = types
  .model("RecommendedVideoStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface RecommendedVideoStore extends Instance<typeof RecommendedVideoStoreModel> {}
export interface RecommendedVideoStoreSnapshotOut extends SnapshotOut<typeof RecommendedVideoStoreModel> {}
export interface RecommendedVideoStoreSnapshotIn extends SnapshotIn<typeof RecommendedVideoStoreModel> {}
export const createRecommendedVideoStoreDefaultModel = () => types.optional(RecommendedVideoStoreModel, {})
