<script setup lang="ts">
import { getSystemSettings } from '@/api/home'
import { onMounted } from 'vue'


onMounted(async () => {
    const data= await getSystemSettings()
    console.log(data);
})
</script>

<template>
  <h1 class="">Home</h1>
</template>
