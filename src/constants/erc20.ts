export const erc20 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factoryAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_adminAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'propertyAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
    ],
    name: 'CreateProjectSuccess',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'propjectId',
        type: 'uint256',
      },
    ],
    name: 'claim',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startSellingDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endSellingDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct PropertyDetail',
        name: '_propertyDetail',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
        ],
        internalType: 'struct PropertyTokenDetail',
        name: '_tokenDetail',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: '_ownerAddress',
        type: 'address',
      },
    ],
    name: 'createProject',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
    ],
    name: 'getProperty',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'ownerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'propertyAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
        ],
        internalType: 'struct ProjectDetail',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
    ],
    name: 'getPropertyExpired',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
