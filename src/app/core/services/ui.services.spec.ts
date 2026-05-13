import { CartStateService } from './ui.services';

describe('CartStateService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('tracks cart count and total from the current snapshot', () => {
    const service = new CartStateService();

    service.setCart([
      { itemId: 1, menuItemId: 101, name: 'Burger', price: 50, quantity: 2 },
      { itemId: 2, menuItemId: 102, name: 'Fries', price: 30, quantity: 1 }
    ] as any);

    expect(service.count).toBe(3);
    expect(service.total).toBe(130);
  });

  it('clears the stored cart state', () => {
    localStorage.setItem('qb_cart_items', JSON.stringify([
      { itemId: 1, menuItemId: 101, name: 'Burger', price: 50, quantity: 1 }
    ]));

    const service = new CartStateService();
    expect(service.count).toBe(1);

    service.clear();

    expect(service.snapshot).toEqual([]);
    expect(localStorage.getItem('qb_cart_items')).toBeNull();
  });
});
