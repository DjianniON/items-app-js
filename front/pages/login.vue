<template>
  <div class="container">
    <UserAuthForm submitText="Se connecter" :submitForm="loginUser" />
  </div>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";
import swal from "sweetalert";

export default {
  components: {
    UserAuthForm,
  },
  methods: {
    loginUser(loginInfo) {
      this.$auth
        .loginWith("local", {
          data: loginInfo,
        })
        .catch((err) =>
          swal(
            "Erreur de connexion",
            "Veuillez vérifier vos identifiants et réessayez.",
            "error"
          )
        );
    },
  },
};
</script>