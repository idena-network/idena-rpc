const contracts = [
  {
    name: 'Voting',
    methods: [
      {
        name: 'deploy',
        params: [
          { title: 'From', name: 'from' },
          {
            title: 'CodeHash',
            name: 'codeHash',
            defaultValue: '0x02',
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
        ],
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
          { title: 'Max options', type: 'int', format: 'uint64' },
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
        name: 'terminate',
      },
    ],
  },
];

export default contracts;
