import http_request from "@/utils/http_request";

const event_repository = {
  fetchEvents: async function () {
    try {
      const response = await http_request.get(`/events`);
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
  createEvent: async function (query = {}) {
    try {
      const response = await http_request.post("/events", query);
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
  updateEvent: async function (query = {}) {
    try {
      const response = await http_request.put("/events", query);
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
  deleteEvent: async function (query = {}) {
    try {
      const response = await http_request.post("/events/delete", query);
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

export default event_repository;
