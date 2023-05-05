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
    name: 'Dashboard',
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
  },
  {
    state: 'order',
    name: 'Quản lý đơn đặt hàng',
    icon: 'list_alt',
    role: '',
  },
  {
    state: 'bill',
    name: 'Quản lý hóa đơn',
    icon: 'import_contacts',
    role: '',
  },
  {
    state: 'user',
    name: 'Quản lý nhân viên',
    icon: 'people',
    role: 'admin',
  },
  {
    state: 'contact',
    name: 'Quản lý liên lạc',
    icon: 'mail',
    role: '',
  },
  {
    state: 'category-sales',
    name: 'Quản lý danh mục bán hàng',
    icon: 'receipt_long',
    role: 'admin',
  },
  {
    state: 'product-sales',
    name: 'Quản lý sản phẩm bán hàng',
    icon: 'coffee',
    role: 'admin',
  },
  {
    state: 'live-chat',
    name: 'Tin nhắn',
    icon: 'forum',
    role: '',
  },

];

@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEMS;
  }
}
