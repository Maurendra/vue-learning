<template>
  <div>
    <div className="max-w-6xl mx-auto py-8">
      <table className="shadow-lg bg-white w-full">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">
              Event Name
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              Vendor Name
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              Confirmed Date
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">Status</th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              Date Created
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, idx) in events" :key="idx">
            <td className="border px-8 py-4">{{ event.event_name }}</td>
            <td className="border px-8 py-4">{{ event.vendor_name }}</td>
            <td className="border px-8 py-4">
              {{
                event.confirm_date
                  ? `${this.formatDate(event.confirm_date)}`
                  : `${this.formatDate(event.proposed_date_1)} (Proposed Date)`
              }}
            </td>
            <td className="border px-8 py-4">{{ event.status }}</td>
            <td className="border px-8 py-4">
              {{ this.formatDate(event.created_at) }}
            </td>
            <td className="border px-8 py-4 flex space-x-2">
              <div
                @click="showDetail(event)"
                className="bg-blue-400 hover:bg-blue-800 text-white border-2 border-white rounded-lg py-2 px-4 cursor-pointer w-fit"
              >
                <p className="font-bold">View</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal-detail-event
      @toggleModalDetail="toggleModalDetail"
      :event="selectedEvent"
      v-if="showDetailModal"
    />
  </div>
</template>

<script>
import EventRepository from "../../repositories/event_repository";
import ModalDetailEvent from "../../components/vendor/ModalDetailEvent.vue";

export default {
  name: "VendorDashboard",
  components: {
    ModalDetailEvent,
  },
  data() {
    return {
      events: [],
      auth: this.$store.state.user,
      showDetailModal: false,
    };
  },
  methods: {
    async getEvents() {
      const res = await EventRepository.fetchEvents();
      console.log(res);
      if (res.data) {
        let ev = res.data;
        let data = [];
        ev.map((event, index) => {
          if (event.vendor_id == this.auth.id) {
            data.push(event);
          }
        });
        if (data.length > 0) {
          this.events = data;
        }
      }
    },
    formatDate(dateData) {
      let date = new Date(JSON.parse(dateData));
      return date.toLocaleDateString("en-US");
    },
    toggleModalDetail() {
      this.showDetailModal = !this.showDetailModal;
    },
    showDetail(ev) {
      this.selectedEvent = ev;
      this.toggleModalDetail();
    },
  },
  async mounted() {
    await this.getEvents();
  },
};
</script>
