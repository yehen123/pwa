<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    jsx: {
      type: Object,
    },
  },
  setup(props) {
    return () => {
      return props.jsx
    }
  },
})
</script>
