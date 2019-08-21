declare namespace event {
  interface ITarget {
    /** 事件组件的id */
    id: string
    /** 当前组件的类型 */
    tagName?: string
    /** 事件组件上由data-开头的自定义属性组成的集合 */
    dataset: Record<string, any>
    /** 距离页面顶部的偏移量 */
    offsetTop: number
    /** 距离页面左边的偏移量 */
    offsetLeft: number
  }

  /**
   * base事件参数
   */
  interface IBase {
    /** 事件类型 */
    type: string
    /** 页面打开到触发事件所经过的毫秒数 */
    timeStamp: number
    /** 触发事件的源组件 */
    target: ITarget
    /** 事件绑定的当前组件 */
    currentTarget: ITarget
  }

  /**
   * 自定义事件
   */
  interface ICustom<P extends Record<string, any> = Record<string, any>> extends IBase {
    /** 额外的信息 */
    detail: P
  }

  /**
   * 键盘输入时触发，event.detail = {value, cursor, keyCode}，处理函数可以直接 return 一个字符串，将替换输入框的内容。
   */
  type Input = ICustom<{
    /** 输入框内容 */
    value: string
    /** 光标位置 */
    cursor: number
    /** keyCode 为键值 (目前工具还不支持返回keyCode参数) `2.1.0` 起支持 */
    keyCode?: number
  }>

  /**
   * 输入框聚焦时触发，event.detail = { value, height }
   */
  type InputFocus = ICustom<{
    /** 输入框内容 */
    value: string
    /** 键盘高度, 在基础库 `1.9.90` 起支持 */
    height?: number
  }>

  /**
   * 输入框失去焦点时触发，event.detail = {value: value}
   */
  type InputBlur = ICustom<{
    /** 输入框内容 */
    value: string
  }>

  /**
   * 点击完成按钮时触发，event.detail = {value: value}
   */
  type InputConfirm = ICustom<{
    /** 输入框内容 */
    value: string
  }>

  /**
   * 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}
   *
   * __tip__: 键盘高度发生变化，keyboardheightchange事件可能会多次触发，开发者对于相同的height值应该忽略掉
   *
   * 最低基础库: `2.7.0`
   */
  type InputKeyboardHeightChange = ICustom<{
    /** 键盘高度 */
    height: number
    duration: number
  }>

  /**
   * 取消选择时触发
   *
   * 最低基础库: 1.9.90
   */
  type PickerCancel = ICustom<{}>

  /**
   * value 改变时触发 change 事件，event.detail = {value}
   *
   * 当 mode = region 时 (最低基础库: 1.4.0)
   *
   * value 改变时触发 change 事件，event.detail = {value, code, postcode}，其中字段 code 是统计用区划代码，postcode 是邮政编码
   */
  type PickerChange<D> = ICustom<
    D & {
      /**
       * 当 mode = selector 时, 返回当前选择的 value
       *
       * 当 mode = multiSelector 时, 返回一个索引数组
       *
       * 当 mode = time | date 时, 返回 `"12:01"` | `"2016-09-01"`
       *
       * 当 mode = region 时, 返回 `["广东省", "广州市", "海珠区"]`
       */
      value: string | number[] | [string, string, string]
      /** 统计用区划代码 当 mode = region 时有效 (最低基础库: 1.4.0) */
      code: [string, string, string]
      /** 邮政编码 当 mode = region 时有效 (最低基础库: 1.4.0) */
      postcode: string
    }
  >

  /**
   * 列改变时触发 当 mode = multiSelector 时有效
   */
  type PickerColumnChange = ICustom<{
    /** 修改的列 */
    column: number
    value: number
  }>

  /**
   * 滚动选择时触发change事件，event.detail = {value}
   */
  type PickerViewChange = ICustom<{
    /** value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始） */
    value: number[]
  }>

  /**
   * 当滚动选择开始时候触发事件
   *
   * 最低基础库: 2.3.1
   */
  type PickerViewPickStart = ICustom<{}>

  /**
   * 当滚动选择结束时候触发事件
   *
   * 最低基础库: 2.3.1
   */
  type PickerViewPickEnd = ICustom<{}>
}
