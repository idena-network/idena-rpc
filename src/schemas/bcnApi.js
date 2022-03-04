const bcnApi = {
  title: "Blockchain API",
  endpoints: [
    {
      method: "bcn_lastBlock",
      title: "Get last block",
    },
    {
      method: "bcn_blockAt",
      title: "Get block by height",
      params: [
        { title: "Height", type: "int", name: "height", required: true },
      ],
    },
    {
      method: "bcn_block",
      title: "Get block by hash",
      params: [{ title: "Hash", name: "hash", required: true }],
    },
    {
      method: "bcn_transaction",
      title: "Get transaction",
      params: [{ title: "Hash", name: "hash", required: true }],
    },
    {
      method: "bcn_mempool",
      title: "Get mempool",
    },
    {
      method: "bcn_syncing",
      title: "Check sync",
    },
    {
      method: "bcn_transactions",
      paramsAsObject: true,
      title: "Get address txs",
      params: [
        { title: "Address", name: "address", required: true },
        { title: "Count", name: "count", type: "int", defaultValue: 0 },
        { title: "Token", name: "token" },
      ],
    },
    {
      method: "bcn_pendingTransactions",
      paramsAsObject: true,
      title: "Get address pending txs",
      params: [{ title: "Address", name: "address", required: true }],
    },
    {
      method: "bcn_burntCoins",
      title: "Get burnt coins",
    },
    {
      method: "bcn_sendRawTx",
      title: "Send raw TX",
      params: [{ title: "Tx", name: "tx", required: true }],
    },
    {
      method: "bcn_getRawTx",
      title: "Get raw TX",
      paramsAsObject: true,
      params: [
        {
          title: "Type",
          name: "type",
          type: "int",
          inputType: "select",
          values: [
            { value: 0, title: "SendTx" },
            { value: 1, title: "ActivationTx" },
            { value: 2, title: "InviteTx" },
            { value: 3, title: "KillTx" },
            { value: 4, title: "SubmitFlipTx" },
            { value: 5, title: "SubmitAnswersHashTx" },
            { value: 6, title: "SubmitShortAnswersTx" },
            { value: 7, title: "SubmitLongAnswersTx" },
            { value: 8, title: "EvidenceTx" },
            { value: 9, title: "OnlineStatusTx" },
            { value: 10, title: "KillInviteeTx" },
            { value: 11, title: "ChangeGodAddressTx" },
            { value: 12, title: "BurnTx" },
            { value: 13, title: "ChangeProfileTx" },
          ],
          defaultValue: 0,
        },
        { title: "From", name: "from", required: true },
        { title: "To", name: "to" },
        { title: "Amount", name: "amount", type: "float", defaultValue: 0 },
        {
          title: "Max Fee",
          type: "float",
          name: "maxFee",
          defaultValue: 0,
        },
        {
          title: "Tips",
          type: "float",
          name: "tips",
          defaultValue: 0,
        },
        { title: "Nonce", type: "int", name: "nonce", defaultValue: 0 },
        { title: "Epoch", type: "int", name: "epoch", defaultValue: 0 },
        { title: "Payload", name: "payload" },
      ],
    },
    {
      method: "bcn_estimateTx",
      title: "Estimate fee and hash of tx",
      paramsAsObject: true,
      params: [
        {
          title: "Type",
          name: "type",
          type: "int",
          inputType: "select",
          values: [
            { value: 0, title: "SendTx" },
            { value: 1, title: "ActivationTx" },
            { value: 2, title: "InviteTx" },
            { value: 3, title: "KillTx" },
            { value: 4, title: "SubmitFlipTx" },
            { value: 5, title: "SubmitAnswersHashTx" },
            { value: 6, title: "SubmitShortAnswersTx" },
            { value: 7, title: "SubmitLongAnswersTx" },
            { value: 8, title: "EvidenceTx" },
            { value: 9, title: "OnlineStatusTx" },
            { value: 10, title: "KillInviteeTx" },
            { value: 11, title: "ChangeGodAddressTx" },
            { value: 12, title: "BurnTx" },
            { value: 13, title: "ChangeProfileTx" },
          ],
          defaultValue: 0,
        },
        { title: "From", name: "from", required: true },
        { title: "To", name: "to" },
        { title: "Amount", name: "amount", type: "float", defaultValue: 0 },
        {
          title: "Max Fee",
          type: "float",
          name: "maxFee",
          defaultValue: 0,
        },
        {
          title: "Tips",
          type: "float",
          name: "tips",
          defaultValue: 0,
        },
        { title: "Nonce", type: "int", name: "nonce", defaultValue: 0 },
        { title: "Epoch", type: "int", name: "epoch", defaultValue: 0 },
        { title: "Payload", name: "payload" },
      ],
    },
    {
      method: "bcn_estimateRawTx",
      title: "Estimate raw TX",
      params: [{ title: "Tx", name: "tx", required: true }],
    },
    {
      method: "bcn_feePerGas",
      title: "Get fee rate",
    },
    {
      method: "bcn_txReceipt",
      title: "Get tx receipt",
      params: [{ title: "Tx hash", name: "hash", required: true }],
    },
    {
      method: "bcn_keyWord",
      title: "Get flip keyword",
      params: [
        { title: "Key word index", name: "index", required: true, type: "int" },
      ],
    },
  ],
};
export default bcnApi;