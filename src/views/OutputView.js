import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printError(error) {
    Console.print(error);
  },
  printWelcomeMessage() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n');
  },
  printMenu() {
    Console.print('<주문 메뉴>');
    // ...
  },
  // ...
};
export default OutputView;
