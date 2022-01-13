const accountApi = {
  title: "Account API",
  endpoints: [
    {
      method: "account_list",
      title: "Get accounts",
    },
    {
      method: "account_create",
      title: "Add account",
      params: [{ title: "Password", name: "passPhrase" }],
    },
    {
      method: "account_unlock",
      title: "Unlock account",
      params: [
        { title: "Address", name: "addr" },
        { title: "Password", name: "passPhrase" },
        { title: "Time", name: "time", defaultValue: 0, type: "int" },
      ],
    },
    {
      method: "account_lock",
      title: "Lock account",
      params: [{ title: "Address", name: "addr" }],
    },
  ],
};

export default accountApi;
