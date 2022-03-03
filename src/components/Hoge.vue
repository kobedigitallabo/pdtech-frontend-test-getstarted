<template>
  <div>
    {{ hoge }}
    <counter></counter>
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue'

export default {
  name: "hoge",
  components: {
    Counter
  },
  data() {
    return {
      hoge: "コンポーネントテスト"
    }
  }
}
</script>
