<template>
  <footer class="caption">
    <p>
      Inspired by
      <a href="http://todomvc.com" target="_blank" rel="noopener">TodoMVC</a>
    </p>
    <p>
      <a
        href="https://github.com/yihsuan717/vue-todo"
        target="_blank"
        rel="noopener"
        >View on GitHub</a
      >
    </p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  color: #bfbfbf;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  p {
    line-height: 1;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
