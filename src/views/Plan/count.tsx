import { defineComponent, reactive } from 'vue'
export default defineComponent({
  props: {
    initValue: {
      type: Number,
      required: true
    }
  },
  setup(prop) {
    console.log('prop', prop)
    const state = reactive({
      count: prop.initValue || 0
    })
    const inc = () => state.count++
    const dec = () => state.count--
    // const dec = () => state.count!--
    return () => (
      <div>
        <p>{state.count}</p>
        <button onClick={inc}>inc</button>
        <button onClick={dec}>dec</button>
      </div>
    )
  }
})
