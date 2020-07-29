<template>
  <section class="mt-5">
    <div class="container">
      <div class="container mb-4">
        <div class="row">
          <div class="col-md-12">
            <div class="card" v-if="addState">
              <div class="card-body">
                <div class="card-title mb-4">
                  <h4>Ajouter un objet</h4>
                </div>
                <form @submit.prevent="addNewItem">
                  <div class="form-group">
                    <label for="name">Nom</label>
                    <input type="text" class="form-control" v-model="itemDetails.name" required />
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" v-model="itemDetails.description" rows="3" required></textarea>
                  </div>
                  <div class="form-group">
                    <label for="foundDate">Date</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="itemDetails.foundDate"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="img">Photo</label>
                    <div class="custom-file">
                      <input
                        type="file"
                        id="customFile"
                        ref="file"
                        v-on:change="handleFileUpload()"
                        class="custom-file-input"
                        required
                      />
                      <label class="custom-file-label" for="customFile">Choisir une image</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary" :disabled="isDisabled">
                      <span
                        class="spinner-border spinner-border-sm"
                        v-if="addLoading"
                        role="status"
                        aria-hidden="true"
                      ></span>Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card bg-light p-1 showdow-sm">
            <div class="card-title text-center p-3">
              <h2>Liste des objets</h2>
              <button
                class="btn btn-primary m-3"
                @click="initForm"
              >{{addState?"Fermer la création d'objets":"Ajouter un nouvel objet"}}</button>
            </div>
            <div class="card-body">
              <p class="text-center" v-if="allItems.length === 0">
                    Il n'a pas encore d'objet disponible. Veuillez en ajouter un nouveau avec le bouton "Ajouter un objet".
                  </p>
              <table v-else class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date de dépôt</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <div
                  v-if="itemLoading"
                  class="spinner-border text-center"
                  style="width: 3rem; height: 3rem;"
                  role="status"
                >
                  <span class="sr-only">Chargement...</span>
                </div>
                <tbody v-else>
                  <tr v-for="(item, index) in allItems" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <img class="img-fluid" :src="path + item.img.path" :alt="item.img.filename" />
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ formatDate(item.foundDate) }}</td>
                    <td>
                      <button class="btn btn-danger" @click="deleteItem(item._id)">Supprimer</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      itemDetails: {
        name: "",
        description: "",
        item: "",
        foundDate: "",
      },
      addState: false,
      allItems: [],
      itemLoading: false,
      addLoading: false,
      path: "http://localhost:3001/",
    };
  },
  computed: {
    isDisabled: function () {
      if (
        this.itemDetails.name === "" ||
        this.itemDetails.description === "" ||
        this.itemDetails.item === "" ||
        this.itemDetails.foundDate === ""
      ) {
        return !this.isValid;
      }
    },
  },
  methods: {
    initForm() {
      this.addState = !this.addState;
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('fr', options)
    },
    resetForm() {
      this.itemDetails.name = "";
      this.itemDetails.description = "";
      this.itemDetails.foundDate = "";
      this.itemDetails.item = "";
    },
    async getAllItems() {
      this.itemLoading = true;
      try {
        const data = await this.$axios.$get("/api/item");
        this.allItems = data;
        this.itemLoading = false;
      } catch (err) {
        this.itemLoading = false;
        swal("Error", "Erreur dans le chargement des objets.", "error");
      }
    },
    handleFileUpload() {
      this.itemDetails.item = this.$refs.file.files[0];
      console.log(this.itemDetails.item.type);
    },
    addNewItem() {
      const types = /(\.|\/)(jpg|jpeg|png)$/i;
      if (
        types.test(this.itemDetails.item.type) ||
        types.test(this.itemDetails.item.name)
      ) {
        const formData = new FormData();
        formData.append("name", this.itemDetails.name);
        formData.append("description", this.itemDetails.description);
        formData.append("img", this.itemDetails.item);
        formData.append("foundDate", this.itemDetails.foundDate);
        this.addLoading = true;
        this.$axios
          .$post("/api/item", formData)
          .then((response) => {
            this.addLoading = false;
            this.itemDetails = {};
            this.getAllItems();
            swal("Opération réussie", "Nouvel objet ajouté.", "success");
            this.resetForm();
          })
          .catch((err) => {
            this.addLoading = false;
            swal("Opération échouée", "Une erreur est apparue.", "error");
          });
      } else {
        swal(
          "Erreur",
          "Type de fichier invalide (Fichiers JPG et PNG acceptés).",
          "error"
        );
        return !this.isValid;
      }
    },
    deleteItem(id) {
      swal({
        title: "Etes-vous sûr ?",
        text: "Une fois supprimé, l'objet ne pourra être récupéré !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .$delete("/api/item/" + id)
            .then((response) => {
              this.getAllItems();
              swal("Votre objet a bien été supprimé.", {
                icon: "success",
              });
            })
            .catch((err) => {
              swal("Error", "Une erreur est apparue.", "error");
            });
        } else {
          swal("Votre objet n'a pas été modifié.");
        }
      });
    },
  },
  created() {
    this.getAllItems();
  },
};
</script>

<style scoped>
  img {
    max-height: 200px;
  }
</style>