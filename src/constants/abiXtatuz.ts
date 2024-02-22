export const abiXtatuz = [
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
      {
        internalType: 'address',
        name: '_usdt',
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
        indexed: true,
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'investorAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bookingTotalPrice',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'propertyAddress',
        type: 'address',
      },
    ],
    name: 'BookingSuccess',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum EPropertyStatus',
        name: 'status',
        type: 'uint8',
      },
    ],
    name: 'CheckPropertyStatus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'isOwner',
        type: 'bool',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenAmount',
        type: 'uint256',
      },
    ],
    name: 'Claim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'investorAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ClaimYieldSuccess',
    type: 'event',
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
        indexed: true,
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dateTimestamp',
        type: 'uint256',
      },
    ],
    name: 'EventOwnerDepositYield',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'OwnerClaim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Refund',
    type: 'event',
  },
  {
    inputs: [],
    name: 'adminAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
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
    name: 'checkPropertyStatus',
    outputs: [
      {
        internalType: 'enum EPropertyStatus',
        name: '',
        type: 'uint8',
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
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
    ],
    name: 'claimYield',
    outputs: [],
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
          {
            internalType: 'uint256',
            name: 'tokenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalToken',
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
    name: 'getAmountYield',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
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
      {
        internalType: 'address',
        name: 'investorAddress',
        type: 'address',
      },
    ],
    name: 'getBookingDetail',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'totalPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaim',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isRefund',
            type: 'bool',
          },
        ],
        internalType: 'struct HolderDetail',
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
    name: 'getProject',
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
          {
            internalType: 'string',
            name: 'projectName',
            type: 'string',
          },
        ],
        internalType: 'struct ProjectDetail',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'totalSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalBought',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenPrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct TokenDetail',
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
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'projectId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bookingPrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct BookingDetail',
        name: '_bookingDetail',
        type: 'tuple',
      },
    ],
    name: 'investorBooking',
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
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
    ],
    name: 'investorProjects',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
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
    name: 'ownerClaim',
    outputs: [],
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
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ownerDepositYield',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'projectCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'projectList',
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
          {
            internalType: 'string',
            name: 'projectName',
            type: 'string',
          },
        ],
        internalType: 'struct ProjectDetail[]',
        name: '',
        type: 'tuple[]',
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
    name: 'refund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokens',
    outputs: [
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
