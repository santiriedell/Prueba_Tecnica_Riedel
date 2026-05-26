<template>
  <div>
    <header class="topbar">
      <div class="brand">RIEDEL SAT</div>
      <nav class="menu">
        <router-link to="/" class="link">Inicio</router-link>
        <router-link to="/eleccion" class="link">Elección</router-link>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { RouterLink } from 'vue-router'
</script>

<style>

body {
  margin: 0;
  padding: 0;
  background-color: #020617;
}
main{padding:12px}
.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 20px;
  background:linear-gradient(90deg,#07102a,#0b1220);
  color:#fff
}
.brand{
  font-weight:700
}
.menu{
  display:flex;
  gap:12px
}
.link{
  color:#cfe8ff;
  text-decoration:none;
  padding:6px 10px;
  border-radius:6px
}
.link.router-link-active{
  background:rgba(59,130,246,0.18);
  color:#fff
}
</style>
