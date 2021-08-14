import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";

export function useLoginForm() {

  const {handleSubmit, isSubmitting, submitCount} = useForm()
  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Введите Email')
      .email('Необходимо ввести корректный Email')
  );

  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Введите пароль')
      .min(6, 'Длина пароля не менее 6 символов')
  );

  const isTooManyAttempts = computed(() => submitCount.value >= 5)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 3000)
    }
  })

  const onSubmit = handleSubmit(values => {
    console.log('Forms: ', values)
  })

  return {
    email, password, eError, eBlur, pError, pBlur, onSubmit, isSubmitting, isTooManyAttempts
  }
}