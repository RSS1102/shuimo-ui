import { defineComponent, resolveComponent, h } from 'vue'
import { treeNodeProps } from "@shuimo-design/core/lib/base/tree/api";
import MCheckbox from "../checkbox/MCheckbox";
import '@shuimo-design/core/lib/base/tree/tree-node.css';
export default defineComponent({
  name: 'MTreeNode',
  props: treeNodeProps,
  inheritAttrs: false,
  components: {
    MCheckbox,
  },
  setup: (props, { attrs }) => {
    return () => {
      const { label: l, key: k, children: c } = props.config

      const MTreeNode = resolveComponent('MTreeNode')
      return <>
        {
          props.data.map((d) => {
            const children = d[c] ?? []
            const cKeys = children.map((it) => it[k])
            const childNodes = props.getNodesByKeys(cKeys)
            const hasChild = childNodes.length > 0

            return <div key={d[k]} {...attrs} class="m-tree-node">
              {
                hasChild ?   <span class={{'m-tree-icon': true, 'm-tree-icon__expand': d.expand}}
                                   onClick={(e) => props.handleExpand(d, e)}></span> : null
              }
              {props.checkable ? <MCheckbox class="m-tree-checkbox" indeterminate={d.indeterminate} modelValue={d.checked}
                                             onChange={(checked: boolean) => props.handleCheck(d, checked)} >
                    <slot name="default">
                      <span class="m-tree-default-label" onClick={(e: MouseEvent) => props.handleItemClick(d, e)}>{d[l]}</span>
                    </slot>
                  </MCheckbox>
                  : <slot name="default" {...{ node: d }}>
                    <span class="m-tree-default-label" onClick={(e: MouseEvent) => props.handleItemClick(d, e)}>{d[l]}</span>
                  </slot>
              }
              {
                (childNodes.length > 0 && d.expand)?
                  <div class={{
                    'm-tree-node-child': true,
                  }} >
                    {
                      h(MTreeNode, {
                        ...props,
                        data: childNodes
                      })
                    }
                  </div>
                  : null
              }
            </div>
          })
        }
        </>
    }
  }
})
