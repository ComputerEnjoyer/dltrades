import { DLCard } from "./getHTML";
import { MyCard } from "./parseBinder";

export default function calculateTrades(
  myCards: MyCard[],
  DLCards: DLCard[][]
) {
  for (let i = 0; i < myCards.length; i++) {
    for (let DLCard of DLCards[i]) {
      if (
        DLCard.tradeInValue === null ||
        DLCard.currentStock === undefined ||
        DLCard.currentStock === 0 ||
        DLCard.maxStock === undefined
      )
        continue;
      if (myCards[i].set != "" && DLCard.set != myCards[i].set) continue;

      let myTradeInStock = myCards[i].count;
      while (myTradeInStock > DLCard.currentStock) {
        myTradeInStock--;
      }
      const tradeValue = myTradeInStock * DLCard.tradeOutValue;
      console.log(
        `${myTradeInStock} ${DLCard.name} from ${DLCard.set} for ${tradeValue}`
      );
    }
  }
  // for (let i = 0; i < myCards.length; i++) {
  //   for (let DLCard of DLCards[i]) {
  //     if (
  //       DLCard.name != myCards[i].name ||
  //       DLCard.set != myCards[i].set ||
  //       DLCard.tradeInValue === null ||
  //       DLCard.currentStock === undefined ||
  //       DLCard.maxStock === undefined
  //     )
  //       continue;
  //     if (DLCard.maxStock - DLCard.currentStock <= 0) continue;

  //     const tradeableStock = DLCard.maxStock - DLCard.currentStock;
  //     let myTradeInStock = myCards[i].count;
  //     while (myTradeInStock > tradeableStock) {
  //       myTradeInStock--;
  //     }
  //     const tradeValue = myTradeInStock * DLCard.tradeInValue;
  //     console.log(
  //       `${myTradeInStock} ${DLCard.name} from ${DLCard.set} for ${tradeValue}`
  //     );
  //   }
  // }
}
