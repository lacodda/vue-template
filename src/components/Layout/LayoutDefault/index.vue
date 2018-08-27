<template>
  <div :class="$options.name">
    <slot name="header">
      <app-header/>
    </slot>
    <main :class="`${$options.name}__main`">
      <slot/>
    </main>
    <slot name="footer">
      <app-footer/>
    </slot>
    <modals-list/>
  </div>
</template>

<script>
  export default {
    name: 'LayoutDefault',
  };
</script>

<style lang="scss" scoped>
  @import '../../../scss/objects/wrapper.mixin';

  .LayoutDefault {
    &__main {
      @include wrapper();

      padding-top: 3em;
      padding-bottom: 4em;
    }
  }
</style>
