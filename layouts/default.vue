<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-warning text-light">
        <div class="container">
          <a class="navbar-brand" href="#">Gestionnaire d'objets</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul v-if="$auth.loggedIn" class="navbar-nav">
              <li class="nav-item">
                <span class="nav-link">{{ $auth.user.email }}</span>
              </li>
              <li>
                <a @click="$auth.logout()" class="nav-link">Se déconnecter</a>
              </li>
            </ul>
            <ul class="navbar-nav" v-else>
              <li class="nav-item">
                <a class="nav-link" href="/signup">S'inscrire</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">Se connecter</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <Nuxt />
  </div>
</template>
