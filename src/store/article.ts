import axios from 'axios'
import { Commit } from 'vuex'

type Credentials = { username?: string, password?: string }
type Article = { id: number, title: string, author: string }
type ArticleStore = { articles: Record<string, Article>, authenticated: boolean }

export default {
  state: {
    articles: {},
    authenticated: false
  },
  mutations: {
    setArticle (state: ArticleStore, article: Article) {
      state.articles = { ...state.articles, [article.id]: article }
    },
    setAuthenticated (state: ArticleStore, authenticated: boolean) {
      state.authenticated = authenticated
    }
  },
  actions: {
    async authenticate ({ commit }: { commit: Commit }, payload: Credentials) {
      const authenticated = await axios.post('/api/authenticate', {
        username: payload.username,
        password: payload.password
      })

      commit('setAuthenticated', authenticated)
    },
    async addArticle ({ commit, state }: { commit: Commit, state: ArticleStore }, payload: Article) {
      const id = Object.values(state.articles).length + 1
      commit('setArticle', { ...payload, id })
    }
  },
  getters: {
    allArticle: (state: ArticleStore) => {
      const articles = Object.values(state.articles)
      return articles
    },
    lastArticle: (state: ArticleStore) => {
      const articles = Object.values(state.articles)
      const last = articles[articles.length - 1]
      return last
    },
    getArticleByAuthor: (state: ArticleStore) => (author: string) => {
      const articles = Object.values(state.articles)
      const articleByAuthor = articles.filter(article => author === article.author)
      return articleByAuthor
    }
  }
}
