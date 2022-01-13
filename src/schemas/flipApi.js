const flipApi = {
  title: "Flip API",
  endpoints: [
    {
      method: "flip_submit",
      title: "Submit flip",
      paramsAsObject: true,
      params: [
        { title: "PublicHex", name: "publicHex", required: true },
        { title: "PrivateHex", name: "privateHex", required: true },
        { title: "Pair", type: "int", name: "pairId", required: true },
      ],
    },
    {
      method: "flip_shortHashes",
      title: "Get short flip hashes",
    },
    {
      method: "flip_longHashes",
      title: "Get long flip hashes",
    },
    {
      method: "flip_get",
      title: "Get flip",
      params: [{ title: "Hash", name: "hash", required: true }],
    },
    {
      method: "flip_submitShortAnswers",
      title: "Submit short answers",
      paramsAsObject: true,
      params: [
        { title: "Answers", name: "answers", type: "json", required: true },
        { title: "Nonce", type: "int", name: "nonce", defaultValue: 0 },
        { title: "Epoch", type: "int", name: "epoch", defaultValue: 0 },
      ],
    },
    {
      method: "flip_submitLongAnswers",
      title: "Submit long answers",
      paramsAsObject: true,
      params: [
        { title: "Answers", name: "answers", type: "json", required: true },
        { title: "Nonce", type: "int", name: "nonce", defaultValue: 0 },
        { title: "Epoch", type: "int", name: "epoch", defaultValue: 0 },
      ],
    },
    {
      method: "flip_words",
      title: "Flip words",
      params: [{ title: "Hash", name: "hash", required: true }],
    },
    {
      method: "flip_delete",
      title: "Delete flip",
      params: [{ title: "Hash", name: "hash", required: true }],
    },
    {
      method: "flip_getKeys",
      title: "Get flip keys",
      params: [
        { title: "Address", name: "address", required: true },
        { title: "Hash", name: "hash", required: true },
      ],
    },
    {
      method: "flip_getRaw",
      title: "Get raw flip",
      params: [{ title: "Hash", name: "hash", required: true }],
    },
  ],
};

export default flipApi;