<template>
  <div class="container">
    <UserAuthForm submitText="S'inscrire" :submitForm="signUpUser" />
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
    async signUpUser(registerInfo) {
        await this.$axios.post("/api/auth/signup", registerInfo);
        swal("Confirmation de création", "Votre compte a bien été créé. Vous allez être automatiquement connecté(e).");
        this.$auth.loginWith("local", {
          data: registerInfo,
        }).catch((err) =>
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