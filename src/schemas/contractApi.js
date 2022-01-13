const contractApi = {
  title: "Contract API",
  endpoints: [
    {
      method: "contract_getStake",
      title: "Get contract stake",
      params: [{ title: "Contract", name: "contract" }],
    },
    {
      method: "contract_estimateDeploy",
      title: "Estimate Deploy Contract",
      paramsAsObject: true,
      params: [
        { title: "From", name: "from" },
        { title: "Code hash", name: "codeHash" },
        { title: "Contract stake", name: "amount" },
        { title: "Args", name: "args", type: "json" },
      ],
    },
    {
      method: "contract_estimateCall",
      title: "Estimate Call Contract",
      paramsAsObject: true,
      params: [
        { title: "From", name: "from" },
        { title: "Contract addr", name: "contract" },
        { title: "Method", name: "method" },
        { title: "Amount", name: "amount", type: "float" },
        { title: "Args", name: "args", type: "json" },
      ],
    },
    {
      method: "contract_estimateTerminate",
      title: "Estimate Terminate Contract",
      paramsAsObject: true,
      params: [
        { title: "From", name: "from" },
        { title: "Contract addr", name: "contract" },
        { title: "Args", name: "args", type: "json" },
      ],
    },
    {
      method: "contract_deploy",
      title: "Deploy Contract",
      paramsAsObject: true,
      params: [
        { title: "From", name: "from" },
        { title: "Code hash", name: "codeHash" },
        { title: "Contract stake", name: "amount", type: "float" },
        { title: "Args", name: "args", type: "json" },
        {
          title: "Max Fee",
          type: "float",
          name: "maxFee",
          defaultValue: 0,
        },
      ],
    },
    {
      method: "contract_call",
      title: "Call Contract",
      paramsAsObject: true,
      params: [
        { title: "From", name: "from" },
        { title: "Contract addr", name: "contract" },
        { title: "Method", name: "method" },
        { title: "Amount", name: "amount", type: "float" },
        { title: "Args", name: "args", type: "json" },
        {
          title: "Max Fee",
          type: "float",
          name: "maxFee",
          defaultValue: 0,
        },
        {
          title: "Broadcast in block",
          type: "int",
          name: "broadcastBlock",
        },
      ],
    },
    {
      method: "contract_terminate",
      title: "Terminate Contract",
      paramsAsObject: true,
      params: [
        { title: "From", name: "from" },
        { title: "Contract addr", name: "contract" },
        { title: "Args", name: "args", type: "json" },
        {
          title: "Max Fee",
          type: "float",
          name: "maxFee",
          defaultValue: 0,
        },
      ],
    },
    {
      method: "contract_readData",
      title: "Read contract data",
      params: [
        { title: "Contract", name: "contract", required: true },
        { title: "Key", name: "key", type: "string" },
        { title: "Format", name: "format", type: "string" },
      ],
    },
    {
      method: "contract_readMap",
      title: "Read contract map value",
      params: [
        { title: "Contract", name: "contract", required: true },
        { title: "Map", name: "map", type: "string" },
        { title: "Key", name: "key", type: "string" },
        { title: "Format", name: "format", type: "string" },
      ],
    },
    {
      method: "contract_iterateMap",
      title: "Iterate contract map values",
      params: [
        { title: "Contract", name: "contract", required: true },
        { title: "Map", name: "map", type: "string" },
        {
          title: "Continuation Token",
          name: "continuationToken",
          type: "string",
        },
        { title: "Key Format", name: "keyFormat", type: "string" },
        { title: "Value Format", name: "valyeFormat", type: "string" },
        { title: "Limit", name: "limit", type: "int" },
      ],
    },
    {
      method: "contract_readonlyCall",
      title: "Readonly call contract",
      paramsAsObject: true,
      params: [
        { title: "Contract addr", name: "contract" },
        { title: "Method", name: "method" },
        { title: "Format", name: "format", type: "string" },
        { title: "Args", name: "args", type: "json" },
      ],
    },
    {
      method: "contract_subscribeToEvent",
      title: "Subscribe to contract event",
      paramsAsObject: false,
      params: [
        { title: "Contract addr", name: "contract" },
        { title: "Event", name: "event" },
      ],
    },
    {
      method: "contract_unsubscribeFromEvent",
      title: "Unsubscribe from contract event",
      paramsAsObject: false,
      params: [
        { title: "Contract addr", name: "contract" },
        { title: "Event", name: "event" },
      ],
    },
    {
      method: "contract_events",
      title: "Read events",
      paramsAsObject: true,
      params: [{ title: "Contract", name: "contract" }],
    },
  ],
};
export default contractApi;
