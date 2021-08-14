<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email" @blur="eBlur"/>
      <small>{{ eError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" name="password" v-model="password" @blur="pBlur"/>
      <small>{{ pError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <span class="text-danger" v-if="isTooManyAttempts">
      Слишком много попыток входа. Попробуйте позже
    </span>

  </form>
</template>

<script>
import {useLoginForm} from "../use/login-form";

export default {
  name: "Auth",
  setup() {
    return {...useLoginForm()}
  }
}
</script>
