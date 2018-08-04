<template>
  <div class="modal" :class="[cssClass]">

    <!-- TRANSITION OF MODAL WINDOW START -->
    <transition
      name="custom-classes-transition"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass">

      <!-- MODAL WINDOW START -->
      <div class="modal__component" v-if="visible">
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header">
              <h5 class="modal__title">{{ title }}</h5>
              <svg-icon name="close"
                        size="24"
                        class="modal__close"
                        @click.native="hideModal"/>
            </div>
            <div class="modal__body">
              <component :is="component" :id="widgetId"/>
            </div>
            <div class="modal__footer">
              <button class="btn btn--primary btn--block" type="button">accept</button>
            </div>
          </div>
        </div>
      </div>
      <!-- MODAL WINDOW END -->

    </transition>
    <!-- TRANSITION OF MODAL WINDOW END -->

    <!-- TRANSITION OF MODAL BACKDROP START -->
    <transition
      name="custom-classes-transition"
      enter-active-class="modal__backdrop--fade-in"
      leave-active-class="modal__backdrop--fade-out">

      <!-- MODAL BACKDROP START -->
      <div class="modal__backdrop" v-if="visible" @click="hideModal"></div>
      <!-- MODAL BACKDROP END -->
    </transition>
    <!-- TRANSITION OF MODAL BACKDROP END -->

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'modal',

    data: () => ({
      visible: false,
      title: String,
      component: String,
      widgetId: '',
      cssClass: String,
      enterActiveClass: '',
      leaveActiveClass: '',
    }),

    computed: {
      ...mapGetters(['currentModal']),
    },

    watch: {
      currentModal(modal) {
        this.visible = Boolean(modal);
        const el = document.body;
        if (modal) {
          this.title = modal.title;
          this.component = modal.component;
          this.widgetId = modal.widgetId;
          this.setCssClass(modal.type);
          // Add to body class 'modal-open'
          el.classList.add('modal-open');
        } else {
          // Remove from body class 'modal-open'
          el.classList.remove('modal-open');
        }
      },
    },

    created() {
      const escapeHandler = (e) => {
        if (e.key === 'Escape' && this.visible) {
          this.hideModal();
        }
      };
      document.addEventListener('keydown', escapeHandler);
      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', escapeHandler);
      });
    },

    methods: {
      ...mapActions(['hideModal']),
      setCssClass(type) {
        // debugger;
        switch (type) {
          case 'right':
            this.cssClass = 'modal--sticky--right';
            this.enterActiveClass = 'animation__fade-in-right';
            this.leaveActiveClass = 'animation__fade-out-right';
            break;
          default:
            this.cssClass = '';
            this.enterActiveClass = 'animation__fade-in-down';
            this.leaveActiveClass = 'animation__fade-out-up';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
