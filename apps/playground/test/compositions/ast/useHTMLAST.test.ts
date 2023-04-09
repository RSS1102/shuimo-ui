/**
 * @description html ast test
 * @author 阿怪
 * @date 2023/4/7 20:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import useHTMLAst from '../../../src/compositions/ast/useHTMLAST';

describe('html ast test', () => {

  const { parse } = useHTMLAst();

  describe('only dom', () => {

    test('empty dom', () => {
      expect(parse('<div></div>')).toEqual([{ name: 'div' }]);
    });

    test('with attr', () => {
      expect(parse('<div class="hi"></div>')).toEqual([{
        name: 'div',
        attrs: {
          class: 'hi'
        }
      }]);
    });

    test('with innerHTML', () => {
      expect(parse('<div>hi</div>')).toEqual([{
        name: 'div',
        innerHTML: 'hi'
      }]);
    });

    test('with children', () => {
      expect(parse('<div><span>hi</span></div>')).toEqual([{
        name: 'div',
        children: [{
          name: 'span',
          innerHTML: 'hi'
        }]
      }]);
    });

    test('multiple dom', () => {
      expect(parse(`<m-button>{{val}}</m-button>
                          <m-button type="primary">{{val}}</m-button>
                          <m-input v-model="val"></m-input>
                          <MButton>hi</MButton>
                          <MDivider></MDivider>
                          <MLoading></MLoading>`)).toMatchInlineSnapshot(`
                            [
                              {
                                "innerHTML": "{{val}}",
                                "name": "m-button",
                              },
                              {
                                "attrs": {
                                  "type": "primary",
                                },
                                "innerHTML": "{{val}}",
                                "name": "m-button",
                              },
                              {
                                "attrs": {
                                  "v-model": "val",
                                },
                                "name": "m-input",
                              },
                              {
                                "innerHTML": "hi",
                                "name": "MButton",
                              },
                              {
                                "name": "MDivider",
                              },
                              {
                                "name": "MLoading",
                              },
                            ]
                          `);
    });
  });

});
