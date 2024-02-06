const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      title: "Print my mails",
      mailList: [],
      mailListLength: 10,
      // ...
    };
  },

  computed: {
    table() {
      return objectToTable(this.mailList);
    },

    isListReady() {
      return this.mailList.length >= this.mailListLength;
    },
  },

  methods: {
    fetchMail() {
      axios.get("https://flynn.boolean.careers/exercises/api/random/mail").then((res) => {
        this.mailList.push(res.data.response);
        // console.log(this.mailList.length);
      });
    },

    getMailList(n) {
      for (let i = 0; i < n; i++) {
        this.fetchMail();
      }
    },
  },

  created() {
    // ...
    this.getMailList(this.mailListLength);
  },
});

app.mount("#app");
