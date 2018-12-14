# miniprogram-picker

### 简介

- 微信小程序的Picker组件只是**半成品**组件，在启用多级联动时需要监听`bindcolumnchange`事件，来手动更改`range`和`value`的值，从而完成Picker的联动变化，比较麻烦，不利于在不同的业务逻辑中的复用。
- 本组件为了解决以上痛点，对微信小程序Picker组件进行了第二次封装。开发者只需要提供固定数据结构的`sourceData`，在进行一些必要配置，本组件就可以自动帮助开发者处理联动逻辑。

## API

#### 属性

|          属性           |                             说明                             |  类型   |  默认值  | 是否必填 |
| :---------------------: | :----------------------------------------------------------: | :-----: | :------: | :------: |
|       sourceData        | 源数组，sourceData有几维，Picker就可以有几阶。格式必须为数组和对象的集合，参考示例 |  Array  |    []    |   true   |
|          steps          |                         Picker的阶数                         | Number  |    1     |   true   |
|     shownFieldName      |                      展示数据的字段名称                      | String  |  'name'  |  false   |
|     subsetFieldName     |           子节点的字段名称，值为Picker下一阶的数组           | String  | 'subset' |  false   |
|   otherNeedFieldsName   |         其他需要返回的字段，开发者可以根据需求自定义         |  Array  |    []    |  false   |
|      defaultIndex       |           默认选中项的下标数组，优先于defaultValue           |  Array  |    []    |  false   |
|      defaultValue       | 默认选中项的值数组，此属性启用时defaultValueUniqueField为必填项 |  Array  |    []    |  false   |
| defaultValueUniqueField |      默认选中项的值数组的唯一字段，用来和源数组进行比对      | String  |    ''    |    -     |
|       autoSelect        |   初始化时，是否需要自动调用bindchange事件返回结果给开发者   | Boolean |  false   |  false   |
| initColumnSelectedIndex |     选择了第n列后，是否将大于n的列的选择值自动初始化为0      | Boolean |  false   |  false   |

#### 方法

|    方法    |                             说明                             |    类型     |                            返回值                            |
| :--------: | :----------------------------------------------------------: | :---------: | :----------------------------------------------------------: |
| bindchange | 用户点击确认后的change事件，event.detail = {selectedIndex, selectedArray} | EventHandle | selectedIndex：Picker选择项的索引数组； multiArray：Picker选择项的值数组； |


### 规则

- `sourceData`为源数组，是一个数组对象结构的集合，`sourceData`有几维，Picker就可以有几阶。
- `steps`，你需要明确指定Picker的阶数，比如三级联动则设置`steps: 3`。
- 需要注意的是，比如`steps`设置了`3`，那么`sourceData`务必要满足这个阶数。
- `initColumnSelectedIndex`属性启用后，开发者调试工具上会有失效情况，但是真机目前没有发现问题，所以是否开启请开发者自行决定。

## 示例

```xml
<comp
  sourceData="{{sourceData_2}}"
  steps="{{2}}"
  shownFieldName="{{'name'}}"
  subsetFieldName="{{'nextLevel'}}"
  otherNeedFieldsName="{{['code']}}"
  defaultValue="{{[{code: '0110'}, {code: '011002'}]}}"
  defaultValueUniqueField="{{'code'}}"
  autoSelect="{{true}}"
  initColumnSelectedIndex
  bindchange="pickerChange_2">
    <view class="picker">
      当前选择：<text wx:for="{{result_2}}" wx:key="index">{{item['name']}}，</text>
    </view>
</comp>
```

```js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result_2: [],
    sourceData_2: [
      { name: '河北', code: '0311', nextLevel: [{ name: '石家庄', code: '031101' }, { name: '保定', code: '031102' }]},
      { name: '北京', code: '0110', nextLevel: [{ name: '朝阳', code: '011001' }, { name: '海淀', code: '011002' }]},
    ]
  },
  /**
   * Picker的确认回调函数
   *
   * @param {Object} e.detail.selectedIndex 用户选择的数据在数组中所在的下标
   * @param {Object} e.detail.selectedArray 用户选择的数据
   */
  pickerChange_2(e) {
    const { selectedIndex, selectedArray } = e.detail
    console.log('多级联动结果:', selectedIndex, selectedArray)
    this.setData({
      result_2: selectedArray
    })
  }
})
```

