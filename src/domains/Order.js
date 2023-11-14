import Menu from './Menu.js';
import Promotion from './Promotion.js';

class Order {
  #order;
  #date;
  #applyPromotion;
  #totalPayment = [];
  #totalPromotion = [];

  setDate(date) {
    this.#date = date;
  }
  setOrder(order) {
    this.#order = order;
    this.#totalPayment = this.caculateOrder();
    this.#applyPromotion = Promotion.isApply(this.#totalPayment);
  }

  getOrderMenu() {
    return this.#order;
  }

  // 계산
  caculateOrder() {
    let totalPayment = 0;

    this.#order.forEach((item) => {
      totalPayment += item.count * Menu.getPrice(item.name);
    });

    return totalPayment;
  }

  // 증정 메뉴
  getGiveawayPromotion() {
    return this.#applyPromotion && Promotion.giveaway(this.#totalPayment);
  }

  // 혜택 내역
  getPromotionDetail() {
    if (!this.#applyPromotion) return false;

    const promotionDetail = [];
    promotionDetail.push(Promotion.christmasDiscount(this.#date));
    promotionDetail.push(Promotion.weekdayDessert(this.#date, this.#order));
    promotionDetail.push(Promotion.weekendMain(this.#date, this.#order));
    promotionDetail.push(Promotion.specialDate(this.#date, this.#order));
    promotionDetail.push(Promotion.giveaway(this.#totalPayment));

    const applyPromotionDetail = promotionDetail.filter((item) => item);

    this.#totalPromotion = applyPromotionDetail;
    return applyPromotionDetail;
  }

  // 총 혜택 금액
  getTotalPromotionAmount() {
    const totalPromotionAmount = this.#totalPromotion.reduce((acc, cur) => {
      return acc + cur.discount;
    }, 0);

    return totalPromotionAmount;
  }

  // 할인 후 예상 결제 금액
  getPaymentAfterDiscount() {
    return this.#totalPayment - this.getTotalPromotionAmount();
  }

  getEventBadge() {
    if (!this.#applyPromotion) return false;

    const badge = Promotion.EventBadge();
    return badge;
  }
}

export default Order;
