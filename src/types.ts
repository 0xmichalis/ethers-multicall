import { ParamType } from '@ethersproject/abi';

export interface ContractCall {
  contract: {
    address: string;
  };
  name: string;
  inputs: ParamType[];
  outputs: ParamType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any[];
}
