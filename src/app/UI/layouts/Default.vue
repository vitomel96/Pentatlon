<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <h2 class="sidebar-title">PENTATLON</h2>
      <nav class="sidebar-nav">
        <router-link to="/" class="nav-link" active-class="active-link">Lista de Héroes</router-link>
        <router-link to="/simulator" class="nav-link" active-class="active-link">Simulador</router-link>
      </nav>
    </aside>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #34495e;
}

.active-link {
  background-color: #1abc9c;
  color: white;
}

.main-content {
  flex: 1;
  background-color: #ecf0f1;
  padding: 20px;
  overflow-y: auto;
  background-image: url(/images/textures/texture1.jpg);
  background-size: cover;
}
</style>
