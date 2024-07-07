import { DLCard } from "./getHTML";
import { MyCard } from "./parseBinder";
import { Binder } from "../app";

export default function calculateTrades(
  binder: Binder,
  myCards: MyCard[],
  DLCards: DLCard[][]
) {
  if (DLCards.length < myCards.length) return;

  myCardsLoop: for (let i = 0; i < myCards.length; i++) {
    let myTradeInStock = myCards[i].count;

    DLCardsLoop: for (let DLCard of DLCards[i]) {
      // general exceptions
      if (
        DLCard.tradeInValue === null ||
        DLCard.currentStock === undefined ||
        DLCard.maxStock === undefined ||
        (myCards[i].set != "" && DLCard.set != myCards[i].set)
      )
        continue DLCardsLoop;
      // HAVES loop
      if (binder === Binder.Haves) {
        if (DLCard.name != myCards[i].name || DLCard.set != myCards[i].set)
          continue DLCardsLoop;
        if (DLCard.maxStock - DLCard.currentStock <= 0) {
          continue DLCardsLoop;
        } else {
          const DLTradeOutStock = DLCard.maxStock - DLCard.currentStock;
          while (myTradeInStock > DLTradeOutStock) {
            myTradeInStock--;
          }
          const tradeValue = myTradeInStock * DLCard.tradeInValue;
          console.log(
            `${myTradeInStock} ${DLCard.name} from ${DLCard.set} for ${tradeValue}`
          );
        }
      }

      // WANTS loop
      if (binder === Binder.Wants) {
        if (
          DLCard.currentStock === 0 ||
          (myCards[i].set != "" && DLCard.set != myCards[i].set)
        ) {
          continue DLCardsLoop;
        } else {
          while (myTradeInStock > DLCard.currentStock) {
            myTradeInStock--;
          }
          const tradeValue = myTradeInStock * DLCard.tradeOutValue;
          console.log(
            `${myTradeInStock} ${DLCard.name} from ${DLCard.set} for ${tradeValue}`
          );
        }
      }
    }
  }
}
