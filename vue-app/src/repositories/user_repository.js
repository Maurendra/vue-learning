import http_request from "@/utils/http_request";

const user_repository = {
  fetchUsers: async function () {
    const response = await http_request.get(`/users`);
    try {
      const response = await http_request.get(`/users`);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: http_request.readError(error),
      };
    }
  },
  fetchVendor: async function () {
    try {
      const response = await http_request.get(`/users/vendor`);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: http_request.readError(error),
      };
    }
  },
};

export default user_repository;
