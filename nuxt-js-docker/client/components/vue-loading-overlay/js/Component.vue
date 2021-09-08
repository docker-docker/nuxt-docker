<template>
  <transition :name="transition">
    <div
      v-show="isActive"
      :class="{ 'is-full-page': isFullPage }"
      :aria-busy="isActive"
      :style="{ zIndex }"
      tabindex="0"
      class="vld-overlay is-active"
      aria-label="Loading"
    >
      <div
        :style="{ background: backgroundColor, opacity }"
        class="vld-background"
        @click.prevent="cancel"
      />
      <div class="vld-icon">
        <slot name="before" />
        <slot name="default">
          <component :is="loader" :color="color" :width="width" :height="height" />
        </slot>
        <slot name="after" />
      </div>
    </div>
  </transition>
</template>

<script>
import Loaders from '../loaders/index.js'
import { HTMLElement, removeElement } from './helpers.js'
import trapFocusMixin from './trapFocusMixin.js'

export default {
  name: 'VueLoading',
  components: Loaders,
  mixins: [trapFocusMixin],
  props: {
    active: Boolean,
    programmatic: Boolean,
    container: [Object, Function, HTMLElement],
    isFullPage: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'fade'
    },
    /**
     * Allow user to hide the loader
     */
    canCancel: Boolean,
    /**
     * Do something on cancel
     */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    color: String,
    backgroundColor: String,
    opacity: Number,
    width: Number,
    height: Number,
    zIndex: Number,
    loader: {
      type: String,
      default: 'spinner'
    }
  },
  data () {
    return {
      // Don't mutate the prop
      isActive: this.active
    }
  },
  watch: {
    active (value) {
      this.isActive = value
    }
  },
  beforeMount () {
    // Insert the component in DOM when called programmatically
    if (this.programmatic) {
      if (this.container) {
        this.isFullPage = false
        this.container.appendChild(this.$el)
      } else {
        document.body.appendChild(this.$el)
      }
    }
  },
  mounted () {
    // Activate immediately when called programmatically
    if (this.programmatic) {
      this.isActive = true
    }

    document.addEventListener('keyup', this.keyPress)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.keyPress)
  },
  methods: {
    /**
     * Proxy to hide() method.
     * Gets called by ESC button or when click outside
     */
    cancel () {
      if (!this.canCancel || !this.isActive) {
        return
      }
      this.hide()
      this.onCancel.apply(null, arguments)
    },
    /**
     * Hide and destroy component if it's programmatic.
     */
    hide () {
      this.$emit('hide')
      this.$emit('update:active', false)

      // Timeout for the animation complete before destroying
      if (this.programmatic) {
        this.isActive = false
        setTimeout(() => {
          this.$destroy()
          removeElement(this.$el)
        }, 150)
      }
    },
    /**
     * Key press event to hide on ESC.
     *
     * @param event
     */
    keyPress (event) {
      // todo keyCode is deprecated
      if (event.keyCode === 27) {
        this.cancel()
      }
    }
  }
}
</script>
