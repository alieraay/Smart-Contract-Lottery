import { useEffect } from 'react';
import { ethers } from 'ethers';

const useEventWatcher = (lotteryAddress: string, abi: any[], eventName:string, callback: (...args: any[])=> void) => {
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    const contract = new ethers.Contract(lotteryAddress, abi, provider);

    contract.on(eventName, callback);

    // Cleaning up the effect
    return () => {
      contract.removeAllListeners(eventName);
    };
  }, [lotteryAddress, abi, eventName, callback]);
};

export default useEventWatcher;
