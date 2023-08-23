/**
 * @description vue version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo fix when header codes more then one line
 */
import { Comment, defineComponent, Fragment } from 'vue';
import { props } from '@shuimo-design/core/lib/template/table/api';
import { useTable } from '@shuimo-design/core/lib/template/table/useTable';

// todo use i18n

export default defineComponent({
  name: 'MTable',
  props,
  setup: (props, { slots }) => {
    const { initTable, error } = useTable();

    return () => {


      // todo empty return ?
      const columns: any[] = [];
      // todo fix any
      const defaultSlot: any[] = slots.default?.() ?? [];
      defaultSlot.forEach(s => {
        // If it is a Fragment type, there is a high probability that it is generated by v-for,
        // and other scenarios cannot be judged temporarily
        if (s.type === Fragment) {
          // if (!Array.isArray(s.children)) {
          //   console.error('unknown children type');
          //   return;
          // }
          s.children.forEach((c) => {
            columns.push(c);
          });
          return;
        }
        if (s.type === Comment && s.type.name === undefined) {
          return;
        }
        if (s.type.name !== 'MTableColumn') {
          error(`传入子节点：${s.type.name}，列表子节点必须传入m-table-column，否则将会被过滤。`);
          return;
        }
        columns.push(s);
      });

      const toString = (data: any) => {
        // todo fix this
        if (typeof data === 'object') {
          return JSON.stringify(data);
        }
        return data;
      };

      const paramClass = (preFix: string, param: string) => {
        if (!props.paramClass) {return null;}
        return `m-${preFix}-${param}`;
      };

      const { thead, tbody } = initTable({
        empty: <tbody class="m-table-empty">
        <tr>
          <th colspan={columns.length}>{
            slots && slots.empty ? slots.empty() : '暂无数据'
          }</th>
        </tr>
        </tbody>,
        tbodyTr: ({ data, param, slot, slotInfo }) => <td class={['m-td', paramClass('td', param)]}>
          {slot ? slot({ data: slotInfo?.data, index: slotInfo?.index }) : data}
        </td>,
        theadTh: ({ label, param, slot, style }) => <th class={['m-th', paramClass('th', param)]}
                                                        style={style}>{slot ? slot() : label}</th>,
        thead: ths => <thead class="m-thead">
        <tr class="m-tr">{ths}</tr>
        </thead>,
        tbody: trs => <tbody class="m-tbody">{trs}</tbody>,
        tbodyTrs: (tds, i) => <tr class="m-tr">{...tds}
          <td class="m-table-tbody-img"/>
        </tr>,
        initSlot: tableColumn => {
          const children = tableColumn.children;
          let body, head;
          if (!children) {return;}
          if (Array.isArray(children) || typeof children !== 'object') {
            // unknown children type
            error('unknown children type');
            return;
          }
          if (children.default) {
            body = children.default;
          }
          if (children.head) {
            head = children.head;
          }
          return { body, head };
        }
      }, columns, props.data);


      const table = <table class="m-table-inner">
        {thead}
        {tbody}
      </table>;

      return <div class="m-table">
        <div class="m-table-header-img-top"/>
        <div class="m-table-header-img-bottom"/>
        <div class="m-table-wrap">
          {table}
        </div>
        <div class="m-table-border-img-bottom"/>
      </div>;

    };
  }
});
