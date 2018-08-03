<template>
  <svg :height="size" :width="size">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="getIcon"></use>
  </svg>
</template>

<script>
  import * as icons from 'images/icons.svg';

  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        default: '20',
      },
    },

    data: () => ({
      iconsPath: icons.default,
    }),

    computed: {
      getIcon() {
        return `${this.iconsPath}#icon-${this.name}`;
      },
    },
  };
</script>
