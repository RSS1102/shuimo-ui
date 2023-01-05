/**
 * @description shuimo menu-item web component
 * @author 阿怪
 * @date 2023/1/5 01:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useMenuItem } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';
import { MenuItemProps } from '@shuimo-design/core/lib/template/menu';

const { template, props, style, initProps } = useMenuItem();

@createMElement({
  name: 'm-menu-item',
  template,
  props,
  style
})
export default class MMenuItem extends MElement implements MenuItemProps {
  active?: boolean;

  constructor() {super();}

  initTemplate(t: MMenuItem) {
    super.initTemplate(t);
    initProps(t);
  }

}
