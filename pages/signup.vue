<template>
  <div class="container">
    <h1>S'inscrire</h1>

    <UserAuthForm submitText="S'inscrire" :submitForm="signUpUser" />
  </div>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";
import swal from "sweetalert";

export default {
  auth: false,
  components: {
    UserAuthForm,
  },
  methods: {
    async signUpUser(registerInfo) {
      try {
        await this.$axios.post("/api/auth/signup", registerInfo);
        //swal("Confirmation de création", "Votre compte a bien été créé.");
        this.$auth.loginWith("local", {
          data: registerInfo,
        });
      } catch (err) {
        swal("Error", "Erreur à l'inscription.", "error");
      }
    },
  },
};
</script>