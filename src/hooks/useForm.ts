// import { Form } from 'ant-design-vue'
// import { Props } from 'ant-design-vue/lib/form/useForm'
// import { ref, Ref } from 'vue'

// export type FormRefType = ReturnType<typeof Form.useForm>

// export function useForm(modelRef: Props | Ref<Props>, rules?: Props | undefined) {
//   //Form.useForm 两个参数必传  必须是proxy对象
//   const { resetFields, validate } = Form.useForm(modelRef, ref(rules))

//   return { resetFields, validate }
// }
export type FormRefType = any
export function useForm(modelRef: any, rules?: any) {
  return { resetFields: {}, validate: {} }
}
