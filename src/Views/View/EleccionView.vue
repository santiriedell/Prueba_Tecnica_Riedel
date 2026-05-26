<script setup>
import { onMounted, ref } from 'vue'
import { useSatelliteStore } from '@/stores/satelliteStore'

const store = useSatelliteStore()
const mensaje = ref('')
const userName = ref('')

onMounted(() => {
  if (!store.satelites.length) store.cargarCategoria(0)
})

const toggle = (sat) => store.toggleSeleccion(sat)

const guardar = async () => {
  if (!userName.value || userName.value.trim().length === 0) {
    mensaje.value = 'Ingresá un nombre de usuario antes de guardar.'
    return
  }
  if (store.seleccionados.length === 0) {
    mensaje.value = 'Seleccioná al menos un satélite.'
    return
  }
  mensaje.value = 'Guardando...'
  try {
    const res = await store.guardarSeleccion(userName.value.trim()) // envía a backend
    if (res && res.success) {
      mensaje.value = 'Guardado correctamente.'

      store.seleccionados.splice(0)
      userName.value = ''
    } else {
      mensaje.value = res && res.message ? res.message : 'Error al guardar.'
    }
  } catch (e) {
    console.error('Error guardando selección:', e)
    mensaje.value = e.response?.data?.message || 'Error al guardar.'
  }
}
</script>

<template>
  <div class="eleccion-container">
    <div class="top">
      <div>
        <h2>Elegí hasta 5 satélites</h2>
        <p class="hint">Seleccionados: {{ store.seleccionados.length }} / 5</p>
      </div>
      <div class="user-input">
        <input v-model="userName" placeholder="Tu nombre (requerido)" />
      </div>
    </div>

    <div class="list">
      <div v-for="sat in store.satelites" :key="sat.id" class="row">
        <div class="info">
          <strong>{{ sat.name }}</strong>
          <div class="meta">LAT: {{ sat.lat }} · LNG: {{ sat.lng }} · ALT: {{ sat.alt }} km</div>
        </div>
        <div>
          <button @click="toggle(sat)" :disabled="!store.seleccionados.find(x=>x.id===sat.id) && store.seleccionados.length>=5" :class="{'selected': store.seleccionados.find(x=>x.id===sat.id)}">
            {{ store.seleccionados.find(x=>x.id===sat.id) ? 'Seleccionado' : 'Seleccionar' }}
          </button>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="save" :disabled="!store.seleccionados.length || !userName.trim()" @click="guardar">Guardar selección</button>
      <button class="clear" @click="store.seleccionados.splice(0)">Limpiar selección</button>
      <p class="mensaje">{{ mensaje }}</p>
    </div>
  </div>
</template>

<style scoped>
.eleccion-container{padding:20px;max-width:1000px;margin:0 auto}
.top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:12px}
.user-input input{
  padding:8px 10px;
  border-radius:8px;
  border:1px solid white;
  background: white;
  color:#e2e8f0}
.hint{
  color:#93c5fd
}
.list{
  display:flex;
  flex-direction:column;
  gap:12px
}
.row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px;
  border-radius:10px;
  background:rgba(255,255,255,0.02);
  border:1px solid rgba(148,163,184,0.04)
}
.info strong{
  display:block
}
.meta{
  font-size:0.85rem;
  color:#cbd5e1
}
button{
  padding:8px 12px;
  border-radius:10px;
  border:none;
  background:rgba(148,163,184,0.08);
  color:#e2e8f0;
  cursor:pointer}
button.selected{
  background:linear-gradient(90deg,#3b82f6,#06b6d4);
  color:white}
.actions{
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:16px}
.save{
  background:linear-gradient(90deg,#06b6d4,#3b82f6);
  padding:10px 16px;
  border-radius:12px;color:white}
.mensaje{
  color:#cbd5e1}
.top{
  color:white
}
@media(max-width:600px){
  .row{
    flex-direction:column;
    align-items:flex-start}
  .actions{
      flex-direction:column;
      align-items:flex-start}
}
</style>
