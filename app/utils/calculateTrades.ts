import { DLCard } from "./getHTML";
import { MyCard } from "./parseBinder";

export default function calculateTrades(myCards: MyCard[], DLCards: DLCard[]) {
  // main loop
  for (let myCard of myCards) {
    for (let DLCard of DLCards) {
      // Exclude mismatches or instances where DL does not accept a card.
      if (
        DLCard.name != myCard.name ||
        DLCard.set != myCard.set ||
        DLCard.tradeInValue === null ||
        DLCard.tradeOutValue === null ||
        DLCard.currentStock === null ||
        DLCard.maxStock === null ||
        DLCard.maxStock === undefined
      )
        return;
      const tradeableStock = DLCard.maxStock - DLCard.currentStock;
      let myTradeInStock = myCard.count;
      while (myTradeInStock > tradeableStock) {
        myTradeInStock--;
      }
      const tradeValue = myTradeInStock * DLCard.tradeInValue;
      console.log(
        `${tradeableStock} ${DLCard.name} from ${DLCard.set} for ${tradeValue}`
      );
    }
  }
}
