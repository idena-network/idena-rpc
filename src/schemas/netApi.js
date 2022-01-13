const netApi = {
  title: "Net API",
  endpoints: [
    {
      method: "net_peers",
      title: "Get peers",
    },
    {
      method: "net_addPeer",
      title: "Add peer",
      params: [{ title: "Url", name: "url", required: true }],
    },
    {
      method: "net_ipfsAddress",
      title: "Get ipfs addr",
    },
  ],
};
export default netApi;
