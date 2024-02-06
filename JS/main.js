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
  },

  methods: {
    fetchMail() {
      axios.get("https://flynn.boolean.careers/exercises/api/random/mail").then((res) => {
        this.mailList.push(res.data.response);
        // console.log(this.mailList.length);
      });
    },

    getMailList() {
      for (let i = 0; i < this.mailListLength; i++) {
        this.fetchMail();
      }
      //   while (this.mailList.length < 10) {
      //     console.log(this.mailList.length);
      //   }

      //   return this.mailList;
    },
  },

  created() {
    // ...
    this.getMailList();
  },
});

app.mount("#app");
