const generateDeployParams = (codeHash) => {
  return [
    { title: 'From', name: 'from' },
    {
      title: 'CodeHash',
      name: 'codeHash',
      defaultValue: codeHash,
      hidden: true,
    },
    {
      title: 'Amount',
      name: 'amount',
      type: 'float',
      defaultValue: 0,
      required: true,
    },
    {
      title: 'Max fee',
      name: 'maxFee',
      type: 'float',
      defaultValue: 0,
    },
  ];
};

const generateCallParams = (method) => {
  return [
    { title: 'From', name: 'from' },
    { title: 'Contract', name: 'contract', required: true },
    {
      title: 'Method',
      name: 'method',
      defaultValue: method,
      required: true,
      hidden: true,
    },
    {
      title: 'Amount',
      name: 'amount',
      type: 'float',
      defaultValue: 0,
    },
    {
      title: 'Max fee',
      name: 'maxFee',
      type: 'float',
      defaultValue: 0,
    },
    {
      title: 'Broadcast block',
      name: 'broadcastBlock',
      type: 'int',
    },
  ];
};

const generateTerminateParams = () => {
  return [
    { title: 'From', name: 'from' },
    { title: 'Contract', name: 'contract', required: true },
    {
      title: 'Max fee',
      name: 'maxFee',
      type: 'float',
      defaultValue: 0,
    },
  ];
};

const contracts = [
  {
    name: 'OracleVoting',
    methods: [
      {
        name: 'deploy',
        method: 'deploy',
        params: generateDeployParams('0x02'),
        args: [
          {
            title: 'Content',
            type: 'jsonToHex',
            format: 'hex',
            defaultValue:
              '{"title": "Question", "desc": "Description", "options": [{"value":"first"}, {"value": "second"}]}',
          },
          {
            title: 'Start voting',
            type: 'int',
            format: 'uint64',
            placeholder: 'Unix timestamp',
            required: true,
          },
          {
            title: 'Duration',
            type: 'int',
            format: 'uint64',
            placeholder: 'Blocks',
          },
          {
            title: 'Public Duration',
            type: 'int',
            format: 'uint64',
            placeholder: 'Blocks',
          },
          {
            title: 'Winner threshold',
            type: 'int',
            format: 'byte',
            placeholder: '51-100',
          },
          {
            title: 'Quorum',
            type: 'int',
            format: 'byte',
            placeholder: '20-100',
          },
          {
            title: 'ComitteeSize',
            type: 'int',
            format: 'uint64',
            placeholder: '>0',
          },
          { title: 'Min payment', type: 'int', format: 'dna' },
          {
            title: 'Owner fee',
            type: 'int',
            format: 'byte',
            placeholder: '0-100',
          },
        ],
      },
      {
        name: 'startVoting',
        method: 'call',
        params: generateCallParams('startVoting'),
      },
      {
        name: 'sendVoteProof',
        method: 'call',
        params: generateCallParams('sendVoteProof'),
        args: [
          {
            title: 'Vote Hash',
            format: 'hex',
            required: true,
          },
        ],
      },
      {
        name: 'sendVote',
        method: 'call',
        params: generateCallParams('sendVote'),
        args: [
          {
            title: 'Vote',
            format: 'byte',
            required: true,
            type: 'int',
            placeholder: '[0..255]',
          },
          {
            title: 'Salt',
            format: 'hex',
            required: true,
          },
        ],
      },
      {
        name: 'finishVoting',
        method: 'call',
        params: generateCallParams('finishVoting'),
      },
      {
        name: 'prolongVoting',
        method: 'call',
        params: generateCallParams('prolongVoting'),
      },
      {
        name: 'terminate',
        method: 'terminate',
        params: generateTerminateParams(),
      },
    ],
  },
  {
    name: 'TimeLock',
    methods: [
      {
        name: 'deploy',
        method: 'deploy',
        params: generateDeployParams('0x01'),
        args: [
          {
            title: 'Unlock time',
            type: 'int',
            format: 'uint64',
            placeholder: 'Unix timestamp',
            required: true,
          },
        ],
      },
      {
        name: 'transfer',
        method: 'call',
        params: generateCallParams('transfer'),
        args: [
          {
            title: 'Destination',
            format: 'hex',
            placeholder: 'address',
            required: true,
          },
          {
            title: 'Amount',
            format: 'dna',
            placeholder: '>0',
            required: true,
          },
        ],
      },
      {
        name: 'terminate',
        method: 'terminate',
        params: generateTerminateParams(),
        args: [
          {
            title: 'Destination',
            format: 'hex',
            placeholder: 'address',
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: 'Multisig',
    methods: [
      {
        name: 'deploy',
        method: 'deploy',
        params: generateDeployParams('0x05'),
        args: [
          {
            title: 'Max votes',
            type: 'int',
            format: 'byte',
            placeholder: '[1..32]',
            required: true,
          },
          {
            title: 'Min votes',
            type: 'int',
            format: 'byte',
            placeholder: '[1..maxvotes]',
            required: true,
          },
        ],
      },
      {
        name: 'Add voter',
        method: 'call',
        params: generateCallParams('add'),
        args: [
          {
            title: 'Address',
            format: 'hex',
            required: true,
          },
        ],
      },
      {
        name: 'Vote for send',
        method: 'call',
        params: generateCallParams('send'),
        args: [
          {
            title: 'Destination',
            format: 'hex',
            placeholder: 'address',
            required: true,
          },
          {
            title: 'Amount',
            format: 'dna',
            placeholder: '>0',
            required: true,
          },
        ],
      },
      {
        name: 'Push',
        method: 'call',
        params: generateCallParams('push'),
        args: [
          {
            title: 'Destination',
            format: 'hex',
            placeholder: 'address',
            required: true,
          },
          {
            title: 'Amount',
            format: 'dna',
            placeholder: '>0',
            required: true,
          },
        ],
      },
      {
        name: 'terminate',
        method: 'terminate',
        params: generateTerminateParams(),
        args: [
          {
            title: 'Destination',
            format: 'hex',
            placeholder: 'address',
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: 'OracleLock',
    methods: [
      {
        name: 'deploy',
        method: 'deploy',
        params: generateDeployParams('0x03'),
        args: [
          {
            title: 'Oracle voting address',
            format: 'hex',
            required: true,
          },
          {
            title: 'Expected value',
            type: 'int',
            format: 'byte',
            placeholder: '[0..255]',
            required: true,
          },
          {
            title: 'Success address',
            format: 'hex',
            required: true,
          },
          {
            title: 'Fail address',
            format: 'hex',
            required: true,
          },
        ],
      },
      {
        name: 'Push',
        method: 'call',
        params: generateCallParams('push'),
      },
      {
        name: 'CheckOracleVoting',
        method: 'call',
        params: generateCallParams('checkOracleVoting'),
      },
      {
        name: 'terminate',
        method: 'terminate',
        params: generateTerminateParams(),
        args: [
          {
            title: 'Destination',
            format: 'hex',
            placeholder: 'address',
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: 'RefundableOracleLock',
    methods: [
      {
        name: 'deploy',
        method: 'deploy',
        params: generateDeployParams('0x04'),
        args: [
          {
            title: 'Oracle voting address',
            format: 'hex',
            required: true,
          },
          {
            title: 'Expected value',
            type: 'int',
            format: 'byte',
            placeholder: '[0..255]',
            required: true,
          },
          {
            title: 'Success address',
            format: 'hex',
          },
          {
            title: 'Fail address',
            format: 'hex',
          },
          {
            title: 'Refund delay',
            type: 'int',
            format: 'uint64',
          },
          {
            title: 'Deposit deadline',
            type: 'int',
            format: 'uint64',
            required: true,
          },
          {
            title: 'Oracle voting fee',
            type: 'int',
            format: 'uint64',
            placeholder: '[1..100]',
            required: true,
          },
        ],
      },
      {
        name: 'Deposit',
        method: 'call',
        params: generateCallParams('deposit'),
      },
      {
        name: 'Push',
        method: 'call',
        params: generateCallParams('push'),
      },
      {
        name: 'Refund',
        method: 'call',
        params: generateCallParams('refund'),
      },
      {
        name: 'terminate',
        method: 'terminate',
        params: generateTerminateParams(),
        args: [
          {
            title: 'Destination',
            format: 'hex',
            placeholder: 'address',
            required: true,
          },
        ],
      },
    ],
  },
];

export default contracts;
