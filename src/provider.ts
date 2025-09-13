import { Provider as EthersProvider } from '@ethersproject/abstract-provider';
import { all } from './call';
import { getEthBalance } from './calls';
import { ContractCall } from './types';

export class Provider {
  private _provider: EthersProvider;

  private _multicallAddress: string;

  constructor(provider: EthersProvider, chainId?: number) {
    this._provider = provider;
    this._multicallAddress = getAddressForChainId(chainId);
  }

  public async init() {
    // Only required if `chainId` was not provided in constructor
    this._multicallAddress = await getAddress(this._provider);
  }

  public getEthBalance(address: string) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return getEthBalance(address, this._multicallAddress);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async all<T extends any[] = any[]>(calls: ContractCall[]) {
    if (!this._provider) {
      throw new Error('Provider should be initialized before use.');
    }
    return all<T>(calls, this._multicallAddress, this._provider);
  }
}

const multicallAddresses = {
  1: '0xcA11bde05977b3631167028862bE2a173976CA11',
  3: '0xcA11bde05977b3631167028862bE2a173976CA11',
  4: '0xcA11bde05977b3631167028862bE2a173976CA11',
  5: '0xcA11bde05977b3631167028862bE2a173976CA11',
  10: '0xcA11bde05977b3631167028862bE2a173976CA11',
  25: '0xcA11bde05977b3631167028862bE2a173976CA11',
  42: '0xcA11bde05977b3631167028862bE2a173976CA11',
  56: '0xcA11bde05977b3631167028862bE2a173976CA11',
  66: '0xcA11bde05977b3631167028862bE2a173976CA11',
  69: '0xcA11bde05977b3631167028862bE2a173976CA11',
  97: '0xcA11bde05977b3631167028862bE2a173976CA11',
  100: '0xcA11bde05977b3631167028862bE2a173976CA11',
  128: '0xcA11bde05977b3631167028862bE2a173976CA11',
  137: '0xcA11bde05977b3631167028862bE2a173976CA11',
  250: '0xcA11bde05977b3631167028862bE2a173976CA11',
  288: '0xcA11bde05977b3631167028862bE2a173976CA11',
  338: '0xcA11bde05977b3631167028862bE2a173976CA11',
  420: '0xcA11bde05977b3631167028862bE2a173976CA11',
  1088: '0xcA11bde05977b3631167028862bE2a173976CA11',
  1284: '0xcA11bde05977b3631167028862bE2a173976CA11',
  1285: '0xcA11bde05977b3631167028862bE2a173976CA11',
  1287: '0xcA11bde05977b3631167028862bE2a173976CA11',
  1337: '0xcA11bde05977b3631167028862bE2a173976CA11',
  4002: '0xcA11bde05977b3631167028862bE2a173976CA11',
  8453: '0xcA11bde05977b3631167028862bE2a173976CA11',
  9000: '0xcA11bde05977b3631167028862bE2a173976CA11',
  9001: '0xcA11bde05977b3631167028862bE2a173976CA11',
  42161: '0xcA11bde05977b3631167028862bE2a173976CA11',
  42220: '0xcA11bde05977b3631167028862bE2a173976CA11',
  43113: '0xcA11bde05977b3631167028862bE2a173976CA11',
  43114: '0xcA11bde05977b3631167028862bE2a173976CA11',
  44787: '0xcA11bde05977b3631167028862bE2a173976CA11',
  80001: '0xcA11bde05977b3631167028862bE2a173976CA11',
  84532: '0xcA11bde05977b3631167028862bE2a173976CA11',
  421613: '0xcA11bde05977b3631167028862bE2a173976CA11',
  11142220: '0xcA11bde05977b3631167028862bE2a173976CA11',
  1313161554: '0xcA11bde05977b3631167028862bE2a173976CA11',
};

export function setMulticallAddress(chainId: number, address: string) {
  multicallAddresses[chainId] = address;
}

function getAddressForChainId(chainId: number) {
  return multicallAddresses[chainId];
}

async function getAddress(provider: EthersProvider) {
  const { chainId } = await provider.getNetwork();
  return getAddressForChainId(chainId);
}
