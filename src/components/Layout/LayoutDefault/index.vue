<template>
  <div :class="$options.name">

    <button class="menu-toggle" @click="menuToggle"></button>
    <nav-menu/>

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

  data() {
    return {
      open: false,
    };
  },

  methods: {
    menuToggle() {
      const el = document.body;
      const open = el.classList.contains('open');

      if (!open) {
        // Add to body class 'open'
        el.classList.add('open');
      } else {
        // Remove from body class 'open'
        el.classList.remove('open');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss/objects/wrapper.mixin';

.LayoutDefault {
  &__main {
    @include wrapper();

    padding-top: 3em;
    padding-bottom: 4em;

    transition: 0.2s ease-out;

    .open & {
      transform: scale(0.92);
      transition: transform 0.2s 0.41s ease-out;
    }
  }
}

$color: rgb(51, 8, 103);
$color2: linear-gradient(to right, rgb(48, 207, 208) 0%, rgb(51, 8, 103) 100%);

@mixin position-center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

button {
  opacity: 0.6;
  background-color: transparent;
  position: fixed;
  z-index: 2;
  top: 24px;
  left: 24px;
  border: none;
  width: 36px;
  height: 30px;
  outline: none;
  transition: opacity 0.2s ease-out;
  &:before {
    content: '';
    @include position-center;
    right: auto;
    width: 100%;
    background: linear-gradient(
      to bottom,
      $color,
      $color 20%,
      transparent 20%,
      transparent 40%,
      $color 40%,
      $color 60%,
      transparent 60%,
      transparent 80%,
      $color 80%,
      $color 100%
    );
    transition: opacity 0.2s ease-out, width 0.2s 0.2s ease-out;
  }
  &:after {
    opacity: 0;
    content: '×';
    color: white;
    position: absolute;
    top: 16px;
    left: -4px;
    font-family: Arial, sans-serif;
    font-size: 76px;
    line-height: 0;
    transition: opacity 0.4s ease-out;
  }
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    opacity: 1;
  }
  .open & {
    opacity: 1;
    &:before {
      opacity: 0;
      width: 0;
    }
    &:after {
      opacity: 1;
      transform: translate3d(0, 0, 0) rotate(360deg);
      transition: transform 0.4s 1s ease-out, opacity 0.4s 1s ease-out;
    }
  }
}
</style>
