import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(prop) {
    return () => (
      <>
        {prop.icon ? <svg-icon name={prop.icon} /> : ''}
        <span>{prop.title}</span>
      </>
    )
  }
})
