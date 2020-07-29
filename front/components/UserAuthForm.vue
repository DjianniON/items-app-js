<template>
  <form @submit.prevent="formPrevent">
    <div class="form-group">
      <label for="email">Adresse e-mail</label>
      <input type="email" class="form-control" v-model="userInfo.email" required />
    </div>
    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input type="password" class="form-control" v-model="userInfo.password" required />
    </div>
    <button class="btn btn-primary" @click="submitForm(userInfo)" :disabled="isDisabled">{{ submitText }}</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        email: "",
        password: "",
      },
    };
  },
  props: ["submitForm", "submitText"],
  computed: {
    isDisabled: function () {
      if (this.userInfo.email === "" || this.userInfo.password === "") {
        return !this.isValid;
      }
    },
  },
  methods: {
        formPrevent() {
            return !this.isValid;
        }
    },
};
</script>