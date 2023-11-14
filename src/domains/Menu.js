import { menu } from '../data/menu.js';

class Menu {
  static hasItemInMenu(item) {
    const allMenu = Object.values(menu).flat();

    return allMenu.some((menuItem) => menuItem.name === item);
  }

  static isOnlyDrink(order) {
    const drinks = menu.drink.map((item) => item.name);

    return order.every((item) => drinks.includes(item.name));
  }

  static getPrice(itemName) {
    const allMenu = Object.values(menu).flat();
    const selectedItem = allMenu.find((item) => item.name === itemName);

    return selectedItem.price;
  }
}

export default Menu;
