<template>
  <div>
    <manager v-if="$auth.loggedIn" />
    <div v-else class="container">
      <div class="row mt-5">
        <div class="col-md-12">
          <div class="card">
            <div class="card-tilte">
              <h1 class="text-center p-3">Bienvenue sur l'application de gestion d'objets.</h1>
            </div>
            <div class="card-body text-center">
              <p>Afin de pouvoir commencer à utiliser l'application, veuillez vous connecter ou vous inscrire.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    
  </div>
  
</template>

<script>
import manager from '@/components/manager'

export default {
  auth: false,
  components: {
    manager
  }
}
</script>
