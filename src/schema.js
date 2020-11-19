const sсhema = {
  apis: [
    {
      title: 'Blockchain API',
      endpoints: [
        {
          method: 'bcn_lastBlock',
          title: 'Get last block',
        },
        {
          method: 'bcn_blockAt',
          title: 'Get block by height',
          params: [
            { title: 'Height', type: 'int', name: 'height', required: true },
          ],
        },
        {
          method: 'bcn_block',
          title: 'Get block by hash',
          params: [{ title: 'Hash', name: 'hash', required: true }],
        },
        {
          method: 'bcn_transaction',
          title: 'Get transaction',
          params: [{ title: 'Hash', name: 'hash', required: true }],
        },
        {
          method: 'bcn_mempool',
          title: 'Get mempool',
        },
        {
          method: 'bcn_syncing',
          title: 'Check sync',
        },
        {
          method: 'bcn_transactions',
          paramsAsObject: true,
          title: 'Get address txs',
          params: [
            { title: 'Address', name: 'address', required: true },
            { title: 'Count', name: 'count', type: 'int', defaultValue: 0 },
            { title: 'Token', name: 'token' },
          ],
        },
        {
          method: 'bcn_pendingTransactions',
          paramsAsObject: true,
          title: 'Get address pending txs',
          params: [{ title: 'Address', name: 'address', required: true }],
        },
        {
          method: 'bcn_burntCoins',
          title: 'Get burnt coins',
        },
        {
          method: 'bcn_sendRawTx',
          title: 'Send raw TX',
          params: [{ title: 'Tx', name: 'tx', required: true }],
        },
        {
          method: 'bcn_getRawTx',
          title: 'Get raw TX',
          paramsAsObject: true,
          params: [
            {
              title: 'Type',
              name: 'type',
              type: 'int',
              inputType: 'select',
              values: [
                { value: 0, title: 'SendTx' },
                { value: 1, title: 'ActivationTx' },
                { value: 2, title: 'InviteTx' },
                { value: 3, title: 'KillTx' },
                { value: 4, title: 'SubmitFlipTx' },
                { value: 5, title: 'SubmitAnswersHashTx' },
                { value: 6, title: 'SubmitShortAnswersTx' },
                { value: 7, title: 'SubmitLongAnswersTx' },
                { value: 8, title: 'EvidenceTx' },
                { value: 9, title: 'OnlineStatusTx' },
                { value: 10, title: 'KillInviteeTx' },
                { value: 11, title: 'ChangeGodAddressTx' },
                { value: 12, title: 'BurnTx' },
                { value: 13, title: 'ChangeProfileTx' },
              ],
              defaultValue: 0,
            },
            { title: 'From', name: 'from', required: true },
            { title: 'To', name: 'to' },
            { title: 'Amount', name: 'amount', type: 'float', defaultValue: 0 },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
            {
              title: 'Tips',
              type: 'float',
              name: 'tips',
              defaultValue: 0,
            },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
            { title: 'Payload', name: 'payload' },
          ],
        },
        {
          method: 'bcn_feePerByte',
          title: 'Get fee rate',
        },
      ],
    },
    {
      title: 'Flip API',
      endpoints: [
        {
          method: 'flip_submit',
          title: 'Submit flip',
          paramsAsObject: true,
          params: [
            { title: 'PublicHex', name: 'publicHex', required: true },
            { title: 'PrivateHex', name: 'privateHex', required: true },
            { title: 'Pair', type: 'int', name: 'pairId', required: true },
          ],
        },
        {
          method: 'flip_shortHashes',
          title: 'Get short flip hashes',
        },
        {
          method: 'flip_longHashes',
          title: 'Get long flip hashes',
        },
        {
          method: 'flip_get',
          title: 'Get flip',
          params: [{ title: 'Hash', name: 'hash', required: true }],
        },
        {
          method: 'flip_submitShortAnswers',
          title: 'Submit short answers',
          paramsAsObject: true,
          params: [
            { title: 'Answers', name: 'answers', type: 'json', required: true },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'flip_submitLongAnswers',
          title: 'Submit long answers',
          paramsAsObject: true,
          params: [
            { title: 'Answers', name: 'answers', type: 'json', required: true },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'flip_words',
          title: 'Flip words',
          params: [{ title: 'Hash', name: 'hash', required: true }],
        },
        {
          method: 'flip_delete',
          title: 'Delete flip',
          params: [{ title: 'Hash', name: 'hash', required: true }],
        },
      ],
    },
    {
      title: 'Net API',
      endpoints: [
        {
          method: 'net_peers',
          title: 'Get peers',
        },
        {
          method: 'net_addPeer',
          title: 'Add peer',
          params: [{ title: 'Url', name: 'url', required: true }],
        },
        {
          method: 'net_ipfsAddress',
          title: 'Get ipfs addr',
        },
      ],
    },
    {
      title: 'Dna API',
      endpoints: [
        {
          method: 'dna_identities',
          title: 'Get identities',
        },
        {
          method: 'dna_identity',
          title: 'Get identity',
          params: [{ title: 'Address', name: 'addr' }],
        },
        {
          method: 'dna_state',
          title: 'Get current process',
        },
        {
          method: 'dna_getCoinbaseAddr',
          title: 'Get coinbase address',
        },
        {
          method: 'dna_getBalance',
          title: 'Get balance',
          params: [{ title: 'Address', name: 'addr', required: true }],
        },
        {
          method: 'dna_sendTransaction',
          title: 'Send DNA',
          paramsAsObject: true,
          params: [
            {
              title: 'Type',
              name: 'type',
              type: 'int',
              defaultValue: 0,
              hidden: true,
            },
            { title: 'From', name: 'from', required: true },
            { title: 'To', name: 'to', required: true },
            { title: 'Amount', name: 'amount' },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_sendInvite',
          title: 'Send invite',
          paramsAsObject: true,
          params: [
            { title: 'To', name: 'to' },
            { title: 'Amount', name: 'amount' },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_activateInvite',
          title: 'Activate invite',
          paramsAsObject: true,
          params: [
            { title: 'Key', name: 'key' },
            { title: 'To', name: 'to', required: true },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_sendTransaction',
          title: 'Kill identity',
          paramsAsObject: true,
          params: [
            {
              title: 'Type',
              name: 'type',
              type: 'int',
              defaultValue: 3,
              hidden: true,
            },
            { title: 'From', name: 'from', required: true },
            { title: 'To', name: 'to', required: true },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_sendTransaction',
          title: 'Kill invitee',
          paramsAsObject: true,
          params: [
            {
              title: 'Type',
              name: 'type',
              type: 'int',
              defaultValue: 10,
              hidden: true,
            },
            { title: 'From', name: 'from', required: true },
            { title: 'To', name: 'to', required: true },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_sendTransaction',
          title: 'Send TX',
          paramsAsObject: true,
          params: [
            {
              title: 'Type',
              name: 'type',
              type: 'int',
              inputType: 'select',
              values: [
                { value: 0, title: 'SendTx' },
                { value: 1, title: 'ActivationTx' },
                { value: 2, title: 'InviteTx' },
                { value: 3, title: 'KillTx' },
                { value: 4, title: 'SubmitFlipTx' },
                { value: 5, title: 'SubmitAnswersHashTx' },
                { value: 6, title: 'SubmitShortAnswersTx' },
                { value: 7, title: 'SubmitLongAnswersTx' },
                { value: 8, title: 'EvidenceTx' },
                { value: 9, title: 'OnlineStatusTx' },
                { value: 10, title: 'KillInviteeTx' },
                { value: 11, title: 'ChangeGodAddressTx' },
                { value: 12, title: 'BurnTx' },
                { value: 13, title: 'ChangeProfileTx' },
              ],
              defaultValue: 0,
            },
            { title: 'From', name: 'from', required: true },
            { title: 'To', name: 'to' },
            { title: 'Amount', name: 'amount', type: 'float', defaultValue: 0 },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
            {
              title: 'Tips',
              type: 'float',
              name: 'tips',
              defaultValue: 0,
            },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
            { title: 'Payload', name: 'payload' },
          ],
        },
        {
          method: 'dna_becomeOnline',
          title: 'Become online',
          paramsAsObject: true,
          params: [
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_becomeOffline',
          title: 'Become offline',
          paramsAsObject: true,
          params: [
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_sendTransaction',
          title: 'Change god address',
          paramsAsObject: true,
          params: [
            {
              title: 'Type',
              name: 'type',
              type: 'int',
              defaultValue: 11,
              hidden: true,
            },
            { title: 'From', name: 'from', required: true },
            { title: 'To', name: 'to', required: true },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_epoch',
          title: 'Get epoch',
        },
        {
          method: 'dna_ceremonyIntervals',
          title: 'Get ceremony intervals',
        },
        {
          method: 'dna_exportKey',
          title: 'Export key',
          params: [{ title: 'Password', name: 'pasword', required: true }],
        },
        {
          method: 'dna_burn',
          title: 'Burn DNA',
          paramsAsObject: true,
          params: [
            { title: 'From', name: 'from', required: true },
            { title: 'Amount', name: 'amount', type: 'float', defaultValue: 0 },
            { title: 'Key', name: 'key' },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
        {
          method: 'dna_changeProfile',
          title: 'Change profile',
          paramsAsObject: true,
          params: [
            { title: 'Info', name: 'info' },
            { title: 'Nickname', name: 'nickname' },
            {
              title: 'Max Fee',
              type: 'float',
              name: 'maxFee',
              defaultValue: 0,
            },
          ],
        },
        {
          method: 'dna_profile',
          title: 'Get profile',
          params: [{ title: 'Address', name: 'address' }],
        },
        {
          method: 'dna_activateInviteToRandAddr',
          title: 'Activate invite to random address',
          paramsAsObject: true,
          params: [
            { title: 'Key', name: 'key', required: true },
            { title: 'Nonce', type: 'int', name: 'nonce', defaultValue: 0 },
            { title: 'Epoch', type: 'int', name: 'epoch', defaultValue: 0 },
          ],
        },
      ],
    },
    {
      title: 'Account API',
      endpoints: [
        {
          method: 'account_list',
          title: 'Get accounts',
        },
        {
          method: 'account_create',
          title: 'Add account',
          params: [{ title: 'Password', name: 'passPhrase' }],
        },
        {
          method: 'account_unlock',
          title: 'Unlock account',
          params: [
            { title: 'Address', name: 'addr' },
            { title: 'Password', name: 'passPhrase' },
            { title: 'Time', name: 'time', defaultValue: 0, type: 'int' },
          ],
        },
        {
          method: 'account_lock',
          title: 'Lock account',
          params: [{ title: 'Address', name: 'addr' }],
        },
      ],
    },
  ],
  contracts: [
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
  ],
};

export default sсhema;
