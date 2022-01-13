const ipfsApi = {
  title: "IPFS API",
  endpoints: [
    {
      method: "ipfs_cid",
      title: "Calculate ipfs cid",
      params: [{ title: "Data", name: "data", required: true }],
    },
    {
      method: "ipfs_add",
      title: "Add data to ipfs",
      params: [
        { title: "Data", name: "data", required: true },
        { title: "Pin", name: "pin", type: "bool", inputType: "checkbox" },
      ],
    },
    {
      method: "ipfs_get",
      title: "Get ipfs data",
      params: [{ title: "Cid", name: "cid", required: true }],
    },
  ],
};

export default ipfsApi;