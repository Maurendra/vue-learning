<template>
<div className="fixed inset-0 z-10 overflow-y-auto overscroll-contain" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-center justify-center w-full min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
    <div @click="toggleModal" className="fixed inset-0 transition-opacity bg-black bg-opacity-75" aria-hidden="true"></div>

    <div className="w-3/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl ">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-bold text-neutral-800">
          Create New Event
        </h1>
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <p className="mb-2">Company Name</p>
          <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
            <input type="text" :value="this.$store.state.user.name" className="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none" disabled />
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">Proposed Date 1</p>
          <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
            <Datepicker v-model="date1"></Datepicker>
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">Proposed Date 2</p>
          <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
            <Datepicker v-model="date2"></Datepicker>
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">Proposed Date 3</p>
          <div className="w-full py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
            <Datepicker v-model="date3"></Datepicker>
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">Proposed Locations</p>
          <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
            <input v-model="location" type="text" className="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none" />
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">Event Name</p>
          <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
            <input v-model="eventName" type="text" className="text-black placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none" />
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">Vendor</p>
          <select @change="handleChangeVendor" className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
            <option v-for="(ven, idx) in vendors" :key="idx" :value="JSON.stringify(ven)">
              {{ven.name}}
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col items-end" @click="submitData">
        <div className="bg-neutral-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit">
          <p className="font-bold text-neutral-50">Submit</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import UserRepository from "../repositories/user_repository";
import EventRepository from "../repositories/event_repository";

export default {
  name: "ModalAddEvent",
  data() {
    return {
      date1: new Date(),
      date2: new Date(),
      date3: new Date(),
      vendors: [],
      vendor: {},
      companyName: this.$store.state.user.name,
      location: "",
      eventName: ""
    }
  },
  props: ['showModalAdd'],
  methods: {
    toggleModal() {
      this.$emit('toggleModalAdd')
    },
    async getVendors() {
      let res = await UserRepository.fetchVendor();
      if (res.data) {
        if (res.data.length > 0) {
          this.vendors = res.data;
          this.vendor = res.data[0];
        }
      }
    },
    handleChangeVendor(e) {
      this.vendor = JSON.parse(e.target.value)
    },
    async submitData() {
      let submittedData = {
        company_id: this.$store.state.user.id,
        vendor_id: this.vendor._id,
        vendor_name: this.vendor.name,
        event_name: this.eventName,
        proposed_date_1: JSON.stringify(this.date1),
        proposed_date_2: JSON.stringify(this.date2),
        proposed_date_3: JSON.stringify(this.date3),
        confirm_date: null,
        status: "active",
        created_at: JSON.stringify(new Date()),
        location: this.location,
      };
      let res = await EventRepository.createEvent(submittedData);
      this.toggleModal();
      this.$emit("getEvents");
    }
  },
  async mounted() {
    await this.getVendors()
  },
}
</script>
