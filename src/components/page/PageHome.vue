<template>
  <div :class="$options.name">
    <app-hero :action="{ to: { name: 'article' }, label: 'Click me!' }">
      <template slot="headline">
        Welcome!
      </template>
      <h1 class="text">Hello</h1>
      <p>
        Lorem ipsum dolor sit amet,
        <app-link :to="{ name: 'list' }">
          consetetur
        </app-link>
        adipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </p>

      <a class="btn btn--flex btn--primary" @click="openModal">
        <svg-icon name="combo-chart"/>
        Open Modal
      </a>
    </app-hero>



    <app-teaser-list :class="`${$options.name}__teaserList`">
      <app-teaser-list-item>
        <app-teaser :action="{ to: { name: 'article' }, label: 'Read more' }">
          <template slot="headline">
            Article
          </template>

          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed.
          </p>
          <p>
            Diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est.
          </p>
        </app-teaser>
      </app-teaser-list-item>
      <app-teaser-list-item>
        <app-teaser :action="{ to: { name: 'list' }, label: 'Read more' }">
          <template slot="headline">
            List
          </template>

          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed.
          </p>
          <p>
            Diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est.
          </p>
        </app-teaser>
      </app-teaser-list-item>
    </app-teaser-list>
    <modal />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import AppHero from '../app/AppHero.vue';
  import AppLink from '../app/AppLink.vue';
  import AppTeaser from '../app/AppTeaser.vue';
  import AppTeaserList from '../app/AppTeaserList.vue';
  import AppTeaserListItem from '../app/AppTeaserListItem.vue';
  import Modal from 'components/modal';

  export default {
    name: 'PageHome',

    components: {
      Modal,
      AppHero,
      AppLink,
      AppTeaser,
      AppTeaserList,
      AppTeaserListItem,
    },

    methods: {
      ...mapActions(['showModal']),
      openModal() {
        const modal = {
          title: 'List',
          // component: 'Modal',
        };
        this.showModal(modal);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .PageHome {
    $section-spacing: 3em;

    &__teaserList {
      margin-top: $section-spacing;
    }
    .text {
      text-transform: uppercase;
      background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
      color: transparent;
      -webkit-background-clip: text;
      font: {
        size: 100px;
      }
    ;
    }
  }
</style>
