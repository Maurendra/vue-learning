<script setup>
import {
  RouterLink,
  RouterView
} from "vue-router";
import http_request from "@/utils/http_request";
import Header from "./components/Header.vue";
</script>

<template>
<Header/>
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
