import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'dashboard',
    icon: 'monitoring',
    role: '',
  },
  {
    state: 'category',
    name: 'Quản lý danh mục',
    icon: 'dashboard',
    role: 'admin',
  },
  {
    state: 'product',
    name: 'Quản lý sản phẩm',
    icon: 'restaurant',
    role: 'admin',
  }
];

@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEMS;
  }
}
