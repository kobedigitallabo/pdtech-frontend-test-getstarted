import Vuex, { Store } from 'vuex';
import articleStore from "@/store/article"

let url = ''
let body = {}
let mockError = false

jest.mock("axios", () => ({
  post: (_url: string, _body: any) => {
    return new Promise((resolve) => {
      if (mockError) throw Error("API Error occurred")
      url = _url
      body = _body
      resolve(true)
    })
  }
}))

describe("記事ストアーテスト", () => {
  let store: Store<any>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        articleStore
      }
    })
  })

  it("記事を追加する", () => {
    const article = { id: 1, title: "テスト", author: "tarou" }
    console.log(store)
    store.commit('setArticle', article)
    expect(store.state.articleStore.articles).toEqual({ "1": article })
  })

  it("記事取得テスト", () => {
    const articles = {
      "1" : { id: 1, title: "最初の記事", author: 'tarou' },
      "2" : { id: 2, title: "テスト駆動", author: 'tarou' },
      "3" : { id: 3, title: "ユニットテスト", author: 'kobe' },
    }
    store.commit('setArticle', articles["1"]);
    store.commit('setArticle', articles["2"]);
    store.commit('setArticle', articles["3"]);
    const lastArticle = store.getters.lastArticle
    expect(lastArticle).toEqual(articles["3"])
    const articleByTarou = store.getters.getArticleByAuthor('tarou')
    expect(articleByTarou).toEqual([articles["1"], articles["2"]])
  })

  it("ユーザー認証テスト", async () => {
    const username = "ユーザ名"
    const password = "パスワード"

    await store.dispatch("authenticate", { username, password })

    expect(url).toBe("/api/authenticate")
    expect(body).toEqual({ username, password })
  })

  it("Api側がエラーとなる場合", async () => {
    mockError = true

    await expect(articleStore.actions.authenticate({ commit: jest.fn() }, {}))
      .rejects.toThrow("API Error occurred")
  })
})
