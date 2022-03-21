<template>
  <div>
    <div
      className="w-screen h-screen flex flex-col items-center justify-center"
    >
      <div className="w-2/6 mb-4">
        <p className="text-2xl font-bold">Vue App</p>
        <p className="mb-4 text-xs">Event Organizer</p>
        <form
          className="bg-blue-900 p-8 rounded-lg border-2"
          v-on:submit="(e) => onSubmit(e)"
        >
          <h1 className="font-bold text-4xl text-white mb-4">Sign In</h1>
          <div className="mb-4">
            <div className="mb-4">
              <div
                className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                <input
                  type="text"
                  className="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                  placeholder="Username"
                  v-model="username"
                />
              </div>
            </div>
            <div>
              <div
                className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                <input
                  type="password"
                  className="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center w-full justify-center"
          >
            <div
              className="bg-white hover:bg-blue-400 hover:text-white border-2 border-neutral-600 rounded-lg py-4 px-12 cursor-pointer w-fit"
            >
              <p className="font-bold">Sign In</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import user_repository from "@/repositories/user_repository";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      this.getUsers();
    },

    async getUsers() {
      const res = await user_repository.fetchUsers();
      if (res.data) {
        let users = res.data;
        users.map((user, index) => {
          if (
            user.username == this.username &&
            user.password == this.password
          ) {
            let auth = {
              id: user._id,
              role: user.type,
              name: user.name,
            };
            // console.log(auth);
            this.$store.commit("setUser", auth);
            if (auth.role == "vendor") {
              this.$router.push({
                name: "vendor-dashboard",
              });
            } else {
              this.$router.push({
                name: "company-dashboard",
              });
            }
          }
        });
      }
    },
  },
};
</script>
