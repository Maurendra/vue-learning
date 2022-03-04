<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import http_request from "@/utils/http_request";
</script>

<template>
  <RouterView />
</template>

<style>
</style>

<script>
export default {
  mounted(){
    http_request.init()
  }
}
</script>
