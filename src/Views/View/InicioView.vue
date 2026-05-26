<script setup>
import { onMounted, ref } from 'vue'
import { useSatelliteStore } from '@/stores/satelliteStore'

const store = useSatelliteStore()
const categoria = ref("0")

const filtrar = () => {
  store.cargarCategoria(categoria.value)
}

onMounted(() => store.cargarCategoria(0))
</script>

<template>
  <div class="monitor-container">
    <div class="header">
      <h1>RIEDEL SAT</h1>
      <div class="header-controls">
        <select v-model="categoria" @change="filtrar">
          <option value="0">Todos</option>
          <option value="3">Clima</option>
          <option value="52">Starlink</option>
        </select>
        <router-link to="/eleccion" class="nav-link">Elegir satélites</router-link>
      </div>
    </div>

    <div v-if="store.cargando" class="loader">Buscando satélites...</div>

    <div v-else class="grid">
      <div v-for="sat in store.satelites" :key="sat.id" class="card">
        <h3>{{ sat.name }}</h3>
        <p class="coordenadas">LAT: {{ sat.lat }} | LNG: {{ sat.lng }}</p>
        <p class="altitud">ALT: {{ sat.alt }} km</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.monitor-container {
  min-height: 100vh;
  padding: 24px;
  color: #f8fafc;
  background: linear-gradient(180deg, #020617 0%, #111827 100%);
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
.header h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  letter-spacing: 0.05em;
  font-weight: 700;

}
.header select {
  min-width: 160px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
  padding: 10px 14px;
  border-radius: 14px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.header-controls{display:flex;align-items:center;gap:12px}
.nav-link{padding:8px 12px;border-radius:10px;background:rgba(59,130,246,0.12);color:#bfdbfe;text-decoration:none}
.nav-link:hover{background:rgba(59,130,246,0.2);color:#fff}
.header select:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.8);
  transform: translateY(-1px);
}
.loader {
  width: 100%;
  text-align: center;
  padding: 40px 0;
  color: #cbd5e1;
  font-size: 1rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  align-items: stretch;
}
.card {
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.12);
  padding: 22px;
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(8, 15, 26, 0.18);
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.28);
  background: rgba(15, 23, 42, 0.98);
}
.card h3 {
  margin: 0 0 12px;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
}
.card p {
  margin: 8px 0 0;
  line-height: 1.6;
}
.coordenadas {
  color: #93c5fd;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}
.altitud {
  font-size: 0.95rem;
  color: #cbd5e1;
}
@media (max-width: 640px) {
  .monitor-container {
    padding: 18px;
  }
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header select {
    width: 100%;
  }
}
</style>
