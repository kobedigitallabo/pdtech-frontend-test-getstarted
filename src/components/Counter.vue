<template>
  <div>
    <p>clicked: {{ count }}</p>
    <button @click="add">add</button>
  </div>
</template>

<script>
  export default {
    name: 'Counter',
    data: () => ({
      count: 0,
    }),
    methods: {
      add() {
        this.count++
      },
    },
  }
</script>

