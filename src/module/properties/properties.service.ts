import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ContractEventPayload, EventLog, Log, ethers } from 'ethers';
import { erc20 } from 'src/constants/erc20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PropertiesService {
  constructor(private readonly config: ConfigService) {}
  create(createPropertyDto: CreatePropertyDto) {
    return 'This action adds a new property';
  }

  findAll() {
    return `This action returns all properties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }

  async getEventLog(merchantAddress: string) {
    const provider = new ethers.JsonRpcProvider(process.env.API_RPC_PROVIDER);

    const wallet = new ethers.Wallet(process.env.API_PRIVATE_KEY);
    const signer = wallet.connect(provider);
    const token = new ethers.Contract(
      process.env.API_CONTRACT_ADDRESS,
      erc20,
      signer,
    );
    console.log('11112');

    return new Promise(async (resolve, reject) => {
      //to do filter by ownerAddress
      const filter = await token.filters.CreateProjectSuccess(
        null,
        null,
        null,
        null,
      );

      await token.on(filter, (txEvent: ContractEventPayload) => {
        console.log('into token.on');
        const log: EventLog = txEvent.log;
        console.log('argument', log.args);
        const [_projectId, _ownerAddress, _propertyAddress, _tokenAddress] =
          log.args;
        console.log(
          `id: ${_projectId}`,
          `from: ${_ownerAddress}, propertyAddress: ${_propertyAddress}, tokenAddress: ${_tokenAddress}`,
        );
        if (_ownerAddress == merchantAddress) {
          resolve(txEvent.log);
        }
      });
    });
  }

  async getHistoryEvent(
    merchantAddress: string,
    fromBlock: number,
    toBlock: number,
  ) {
    const provider = new ethers.JsonRpcProvider(process.env.API_RPC_PROVIDER);

    const wallet = new ethers.Wallet(process.env.API_PRIVATE_KEY);
    const signer = wallet.connect(provider);
    const token = new ethers.Contract(
      process.env.API_CONTRACT_ADDRESS,
      erc20,
      signer,
    );
    const filter = token.filters.CreateProjectSuccess(null, null, null, null);
    await token
      .queryFilter(filter, Number(fromBlock), Number(toBlock))
      .then((res: (EventLog | Log)[]) => {
        console.log('res ::: ', res);
      });
  }
}
