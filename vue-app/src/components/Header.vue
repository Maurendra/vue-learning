<template>
<div className="py-4 bg-white border-b" v-if="isAuthenticated">
  <div className="flex items-center max-w-6xl mx-auto justify-between px-4">
    <router-link to="/">
      <p className="text-primary cursor-pointer text-base font-semibold">
        {{ this.$store?.state?.user ? this.$store?.state?.user.name : "TSP" }}
      </p>
    </router-link>
    <div className="flex space-x-4 items-center">
      <router-link to="/">
        <p className="text-neutral-600 cursor-pointer text-xs">
          EVENTS
        </p>
      </router-link>

      <div className="py-2">
        <p className="text-neutral-600 cursor-pointer text-xs" @click="logout">
          LOGOUT
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isAuthenticated() {
      return this.$store.state.user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({
        path: "/"
      });
    }
  }
}
</script>
