<template>
  <div
    className="fixed inset-0 z-10 overflow-y-auto overscroll-contain"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      className="flex items-center justify-center w-full min-h-screen px-4 pt-4 pb-20 text-center sm:p-0"
    >
      <div
        @click="toggleModal"
        className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
        aria-hidden="true"
      ></div>

      <div
        v-if="showMainModal"
        className="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
      >
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold text-neutral-800">Event Detail</h1>
        </div>
        <div className="mb-8">
          <p className="text-sm text-neutral-600 text-justify mb-2">
            Event Name: {{ this.event.event_name }}
          </p>
          <p className="text-sm text-neutral-600 text-justify mb-2">
            Vendor Name: {{ this.event.vendor_name }}
          </p>
          <p className="text-sm text-neutral-600 text-justify mb-2">
            Proposed Date:
            {{
              `${this.formatDate(
                this.event.proposed_date_1
              )}, ${this.formatDate(
                this.event.proposed_date_2
              )}, ${this.formatDate(this.event.proposed_date_3)} `
            }}
          </p>
          <p className="text-sm text-neutral-600 text-justify mb-2">
            Confirmed date by vendor:
            {{
              this.event.confirm_date
                ? this.formatDate(this.event.confirm_date)
                : "Not confirmed yet by the vendor"
            }}
          </p>
          <p className="text-sm text-neutral-600 text-justify mb-2">
            Current Status: {{ this.event.status }}
          </p>
          <p className="text-sm text-neutral-600 text-justify mb-2">
            Location: {{ this.event.location ? this.event.location : "-" }}
          </p>
          <p className="text-sm text-neutral-600 text-justify mb-2">
            Note: {{ this.event.note ? this.event.note : "-" }}
          </p>
        </div>
        <div
          className="flex space-x-4 items-end"
          v-if="this.event.status == 'active'"
        >
          <div
            @click="toggleModalApprove(true)"
            className="bg-green-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p className="font-bold text-neutral-50">Approve</p>
          </div>

          <div
            @click="toggleModalReject(true)"
            className="bg-red-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p className="font-bold text-neutral-50">Reject</p>
          </div>
        </div>
      </div>

      <div
        v-if="showApprove"
        className="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
      >
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold text-neutral-800">Approve Event</h1>
        </div>
        <p className="text-sm text-neutral-600 text-justify mb-8">
          Choose one of the proposed dates below
        </p>
        <div className="mb-6">
          <div className="mb-4">
            <p className="mb-2">Proposed Date 1</p>
            <div className="flex justify-between">
              <div
                className="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                {{ this.formatDate(this.event.proposed_date_1) }}
              </div>
              <div
                @click="
                  approve(new Date(JSON.parse(this.event.proposed_date_1)))
                "
                className="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p className="font-bold text-neutral-50">Approve</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">Proposed Date 2</p>
            <div className="flex justify-between">
              <div
                className="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                {{ this.formatDate(this.event.proposed_date_2) }}
              </div>
              <div
                @click="
                  approve(new Date(JSON.parse(this.event.proposed_date_2)))
                "
                className="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p className="font-bold text-neutral-50">Approve</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">Proposed Date 3</p>
            <div className="flex justify-between">
              <div
                className="w-3/5 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4"
              >
                {{ this.formatDate(this.event.proposed_date_3) }}
              </div>
              <div
                @click="
                  approve(new Date(JSON.parse(this.event.proposed_date_3)))
                "
                className="bg-green-800 flex justify-center items-center border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
              >
                <p className="font-bold text-neutral-50">Approve</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            @click="toggleModalApprove(false)"
            className="bg-blue-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p className="font-bold text-neutral-50">Cancel</p>
          </div>
        </div>
      </div>

      <div
        v-if="showReject"
        className="w-2/5 px-8 py-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl "
      >
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold text-neutral-800">Reject Event</h1>
        </div>
        <p className="text-sm text-neutral-600 text-justify mb-8">
          Fill the form below the reason why the event being rejected
        </p>
        <div className="mb-6">
          <textarea
            className="w-full p-4 border-2 bg-neutral-50 rounded-lg text-neutral-600 text-sm"
            placeholder="Please fill this form"
            v-model="note"
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <div
            @click="reject"
            className="bg-red-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p className="font-bold text-neutral-50">Reject</p>
          </div>
          <div
            @click="toggleModalReject(false)"
            className="bg-blue-800 border-2 border-neutral-600 rounded-full py-2 px-8 cursor-pointer w-fit"
          >
            <p className="font-bold text-neutral-50">Cancel</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventRepository from "../../repositories/event_repository";

export default {
  name: "ModalDetailEvent",
  data() {
    return {
      showApprove: false,
      showReject: false,
      showMainModal: true,
      note: "Test",
    };
  },
  props: ["showModalDetail", "event", "getEvents"],
  methods: {
    formatDate(dateData) {
      let date = new Date(JSON.parse(dateData));
      return date.toLocaleDateString("en-US");
    },
    toggleModal() {
      this.$emit("toggleModalDetail");
    },
    async approve(date) {
      let submittedData = {
        id: this.event._id,
        status: "accepted",
        confirm_date: JSON.stringify(date),
      };

      const res = await EventRepository.updateEvent(submittedData);
      this.showApprove = false;
      this.showMainModal = true;
      this.toggleModal();
      this.$emit("getEvents");
    },
    async reject() {
      let submittedData = {
        id: this.event._id,
        status: "rejected",
        note: this.note,
      };

      const res = await EventRepository.updateEvent(submittedData);
      this.showReject = false;
      this.showMainModal = true;
      this.toggleModal();
      this.$emit("getEvents");
    },
    toggleModalApprove(type) {
      if (type) {
        this.showMainModal = false;
        this.showApprove = true;
      } else {
        this.showApprove = false;
        this.showMainModal = true;
      }
    },
    toggleModalReject(type) {
      if (type) {
        this.showMainModal = false;
        this.showReject = true;
      } else {
        this.showReject = false;
        this.showMainModal = true;
      }
    },
    toggleMainModal(type) {
      this.showMainModal = type;
    },
  },
};
</script>
