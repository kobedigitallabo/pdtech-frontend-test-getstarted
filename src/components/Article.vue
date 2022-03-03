<template>
  <div>
    <!-- ここから登録フォーム -->
    <p><span>タイトル</span> <input type="text" class="article_title" v-model="title"></p>
    <p><span>作者</span> <input type="text" class="article_author" v-model="author"></p>
    <button class="add_article" @click="onSubmit">登録</button>

    <!-- ここからは登録した内容のリスト -->
    <ul id="article_list">
      <li class="article_item" v-for="article in allArticle" :key="article.id">
        {{ article.author }}: {{ article.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Article',
  computed: {
    ...mapGetters(['allArticle', 'getArticleByAuthor'])
  },
  data: () => ({
    title: '',
    author: ''
  }),
  methods: {
    ...mapActions(['addArticle']),
    onSubmit () {
      this.addArticle({
        title: this.title,
        author: this.author
      })
      this.title = ''
      this.author = ''
    }
  }
}
</script>
