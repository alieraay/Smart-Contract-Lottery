function handleErrorMessage(error: any, entryPrice: string ){
    let message = "";
    if (error.message.includes("EnterLottery__NotEnoughEntryPrice")) {
      message = "You need more ETH";
    } else if (error.message.includes("EnterLottery__AlreadyParticipated")) {
      message = "You already participated in the lottery";
    } else if (error.message.includes("Lottery__TransferFailed")) {
      message = "There is a significant problem that causes preventing the transfer of the reward";
    } else if (error.message.includes("GodMode__OnlyOwner")) {
      message = "Only owner can act like a god";
    } else if (error.message.includes("Lottery__IsNotActive")) {
      message = "The lottery is not active. Please contact the owner";
    } else if (error.message.includes("GetYourId__IdIsNotValid")) {
      message = "You have not participated in the lottery";
    } else {
      message = error.message;
    }
    return message;
}

export {handleErrorMessage}