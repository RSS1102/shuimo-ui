/**
 * @description popover api
 * @author 阿怪
 * @date 2023/4/23 11:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '@shuimo-design/types';
import { PopoverProps } from './index';
import { Placement } from '../../../composition/popper/usePopper';


export const props: MCOPO<PopoverProps> = {
  placement: {
    type: String as MPropType<Placement>,
    default: 'bottom'
    // validator: (value: string) =>
    //   [
    //     'auto',
    //     'auto-start',
    //     'auto-end',
    //     'top',
    //     'top-start',
    //     'top-end',
    //     'bottom',
    //     'bottom-start',
    //     'bottom-end',
    //     'right',
    //     'right-start',
    //     'right-end',
    //     'left',
    //     'left-start',
    //     'left-end'
    //   ].includes(value)
  },
  disableClickAway: { type: Boolean, default: false },
  offsetSkid: { type: String, default: '0' },
  offsetDistance: { type: String, default: '0' },
  hover: { type: Boolean, default: false },
  show: { type: Boolean, default: null },
  disabled: { type: Boolean, default: false },
  openDelay: { type: Number, default: 0 },
  closeDelay: { type: Number, default: 0 },
  interactive: { type: Boolean, default: true },
  locked: { type: Boolean, default: false },
  content: { type: String, default: '' }
};