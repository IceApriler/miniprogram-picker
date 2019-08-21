/* 参考文档: https://github.com/IceApriler/miniprogram-picker */

function isExist(field: any) {
  return field !== null && field !== undefined
}

interface TData {
  /** Picker当前所选择的索引数组 => 比如:[0, 0, 2]，表示第一列选择第0项，第二列选择第0项，第三列选择第2项。 */
  multiIndex: number[],
  /** Picker当前所展示的数组 => 比如:[['河北', '山东'], ['石家庄', '保定'], ['桥西区', '裕华区', '长安区']]。 */
  multiArray: string[]
  /**
   * 用户点击确定后，所选择的值数组 => 比如:
   * [{name: '河北', id: '3110'}, {name: '石家庄', id: '3110xx'}, {name: '长安区', id: '3110xxx'}]。
   */
  selectedArray: object[]
}

interface TProperty {
  /** 初始化时，是否需要自动返回结果给开发者 */
  autoSelect: {
    type: typeof Boolean
    value: boolean
  }
  /** 源数组，sourceData有几维，Picker就可以有几阶 */
  sourceData: {
    type: typeof Array
    value: object[]
    observer(newVal: object[], oldVal: object[], changedPath: string[]): void
  }
  /** 阶数 */
  steps: {
    type: typeof Number
    value: number
  }
  /** 展示数据的字段名称 */
  shownFieldName: {
    type: typeof String
    value: string
  }
  /** 子节点名称 */
  subsetFieldName: {
    type: typeof String
    value: string
  }
  /** 其他需要返回的字段 */
  otherNeedFieldsName: {
    type: typeof Array
    value: string[]
  },
  /** 选择了第n列后，是否将大于n的列的选择值自动初始化为0 */
  initColumnSelectedIndex: {
    type: typeof Boolean
    value: boolean
  },
  /** 默认选中项的下标数组 */
  defaultIndex: {
    type: typeof Array
    value: number[]
  },
  /** 默认选中项的值数组 */
  defaultValue: {
    type: typeof Array
    value: number[]
  },
  /** 默认选中项的值数组的唯一字段，用来和源数组进行比对 */
  defaultValueUniqueField: {
    type: typeof String
    value: string
  },
  /** 是否禁用 */
  disabled: {
    type: typeof Boolean
    value: boolean
  }
  [key: string]: any
}

interface TMethod {
  /** 监听源数组更新变化 */
  sourceDataChange(newSourceData: object[]): void
  /** 获取默认值index */
  getDefaultIndex(newSourceData: object[]): any
  /** 校验源数组是否正确 */
  checkSourceData(sourceData: object[]): any
  /** 用户点击了确认 */
  pickerChange(e: event.PickerChange<IAnyObject>): void
  /** 用户滚动了某一列 */
  pickerColumnChange(e: event.PickerChange<IAnyObject>): void
  /** 用户点击了取消触发 */
  pickerCancel(e: event.PickerChange<IAnyObject>): void
  /** 处理最终数据，将返回给开发者。 */
  processData(): void
  /** 绑定console.error */
  consoleError(...arg: any[]): void
  [key: string]: any
}

Component<TData, TProperty, TMethod>({
  externalClasses: ['picker-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    autoSelect: {
      type: Boolean,
      value: false
    },
    sourceData: {
      type: Array,
      value: [],
      observer: function(newVal: []) {
        this.sourceDataChange(newVal)
      }
    },
    steps: {
      type: Number,
      value: 1
    },
    // 展示数据的字段名称
    shownFieldName: {
      type: String,
      value: 'name'
    },
    // 子节点名称，
    subsetFieldName: {
      type: String,
      value: 'subset'
    },
    // 其他需要返回的字段
    otherNeedFieldsName: {
      type: Array,
      value: []
    },
    // 选择了第n列后，是否将大于n的列的选择值自动初始化为0
    initColumnSelectedIndex: {
      type: Boolean,
      value: false,
    },
    // 默认选中项的下标数组
    defaultIndex: {
      type: Array,
      value: []
    },
    // 默认选中项的值数组
    defaultValue: {
      type: Array,
      value: []
    },
    // 默认选中项的值数组的唯一字段，用来和源数组进行比对
    defaultValueUniqueField: {
      type: String,
      value: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // Picker当前所选择的索引数组 => 比如:[0, 0, 2]，表示第一列选择第0项，第二列选择第0项，第三列选择第2项。
    multiIndex: [],
    // Picker当前所展示的数组 => 比如:[['河北', '山东'], ['石家庄', '保定'], ['桥西区', '裕华区', '长安区']]。
    multiArray: [],
    // 用户点击确定后，所选择的值数组 => 比如:
    // [{name: '河北', id: '3110'}, {name: '石家庄', id: '3110xx'}, {name: '长安区', id: '3110xxx'}]。
    selectedArray: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sourceDataChange(newSourceData: any) {
      const { shownFieldName, subsetFieldName, steps } = this.data
      // 源数组更新，则需要更新multiIndex、multiArray
      const multiIndex: number[] = []
      const multiArray: any[] = []
      newSourceData = this.checkSourceData(newSourceData)

      console.warn(newSourceData)

      const defaultIndex = this.getDefaultIndex(newSourceData)
      const handle = (source = [], columnIndex = 0) => {
        // 当前遍历Picker的第columnIndex列，
        // 当columnIndex = 0时，source表示sourceData，其它则表示子集subset
        const _multiArrayColumn0 = []

        source.forEach((item, index) => {
          if (columnIndex === 0) {
            // newSourceData的第0维要单独处理，最后unshift到multiArray中
            _multiArrayColumn0.push(item[shownFieldName])
          }

          if (isExist(item[shownFieldName]) && index === (defaultIndex[columnIndex] || 0)) {
            // 选中的索引和值，默认取每列的第0个
            multiIndex.push(index)

            if (columnIndex < steps - 1) {
              if (isExist(item[subsetFieldName])) {
                // 开始处理下一维的数据
                const _subsetArr = item[subsetFieldName].map(sub => sub[shownFieldName])
                multiArray.push(_subsetArr)
                handle(item[subsetFieldName], columnIndex + 1)
              }
            }
          }
        })

        if (columnIndex === 0) {
          multiArray.unshift(_multiArrayColumn0)
        }
      }

      handle(newSourceData)

      this.setData({
        multiIndex,
        multiArray
      })

      if (this.data.autoSelect) {
        this.processData()
      }
    },
    getDefaultIndex(newSourceData: any) {
      const {
        defaultIndex,
        defaultValue,
        defaultValueUniqueField,
        steps,
        subsetFieldName
      } = this.data
      if (defaultIndex.length) {
        return defaultIndex
      } else if (defaultValue.length) {
        if (defaultValue.length !== steps) {
          this.consoleError(new Error('你设置的"defaultValue"字段阶数与"steps"不符，请修改后再试。'))
          return []
        } else if (!defaultValueUniqueField) {
          this.consoleError(new Error('你设置了"defaultValue"字段, 但是没有设置defaultValueUniqueField，这将无法识别默认选项，请补充后再试。'))
          return []
        } else {
          defaultValue.forEach((def, key) => {
            if (!def[defaultValueUniqueField]) {
              this.consoleError(def, new Error(`"defaultValue"中第${key}项(从0开始计算)的对象中缺少"${defaultValueUniqueField}"字段`))
            }
          })

          const _defaultIndex = []
          const handle = (source = [], columnIndex = 0) => {
            // 默认值
            _defaultIndex[columnIndex] = 0

            source.forEach((item, index) => {
              if (!item[defaultValueUniqueField]) {
                this.consoleError(item, new Error(`源数组第${columnIndex}维(从0开始计算)的对象中缺少"${defaultValueUniqueField}"字段`))
              } else if (
                (defaultValue[columnIndex][defaultValueUniqueField]) ===
                (item[defaultValueUniqueField])
              ) {
                _defaultIndex[columnIndex] = index

                if (columnIndex < steps - 1) {
                  if (item[subsetFieldName]) {
                    // 开始处理下一维的数据
                    handle(item[subsetFieldName], columnIndex + 1)
                  }
                }
              }
            })
          }
          handle(newSourceData)
          return _defaultIndex
        }
      } else {
        return []
      }
    },
    checkSourceData(sourceData: any) {
      const { shownFieldName, subsetFieldName, steps } = this.data
      const handle = (source = [], columnIndex = 0) => {
        // 当前遍历Picker的第columnIndex列，
        // 当columnIndex = 0时，source表示sourceData，其它则表示子集subset
        if (!source.length) {
          const temp = {}
          temp[shownFieldName] = ''
          temp[subsetFieldName] = []
          source.push(temp)
        }
        return source.map((item) => {
          if (!isExist(item[shownFieldName])) {
            this.consoleError(item, new Error(`源数组第${columnIndex}维(从0开始计算)的对象中缺少"${shownFieldName}"字段`))
            item[shownFieldName] = ''
          }

          // 有shownFieldName字段才会去遍历subsetFieldName字段
          if (columnIndex < steps - 1) {
            if (!isExist(item[subsetFieldName])) {
              this.consoleError(item, new Error(`源数组第${columnIndex}维(从0开始计算)的对象中缺少"${subsetFieldName}"字段`))
            }
            // 开始处理下一维的数据
            item[subsetFieldName] = handle(item[subsetFieldName], columnIndex + 1)
          }
          return item
        })
      }
      return handle(sourceData)
    },

    /**
     * @param {Object} e 事件对象，具体参考微信小程序api。
     * @param {Array} e.detail.value 用户选择的下标数组。
     */
    pickerChange(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)

      this.setData({
        multiIndex: e.detail.value
      })
      this.processData()
    },
    processData() {
      const {
        sourceData,
        shownFieldName,
        subsetFieldName,
        otherNeedFieldsName,
        multiIndex
      } = this.data
      const selectedArray = []

      const handle = (source = [], columnIndex = 0) => {
        source.forEach((item, index) => {
          if (index === multiIndex[columnIndex]) {
            const selectedItem = {}
            selectedItem[shownFieldName] = item[shownFieldName]
            otherNeedFieldsName.forEach(key => {
              selectedItem[key] = item[key]
            })
            selectedArray.push(selectedItem)
            if (columnIndex < this.data.steps - 1) {
              handle(item[subsetFieldName], columnIndex + 1)
            }
          }
        })
      }
      handle(sourceData)

      this.setData({
        selectedArray
      })

      const detail = {
        selectedIndex: this.data.multiIndex,
        selectedArray: this.data.selectedArray
      }
      this.triggerEvent('change', detail)
    },
    pickerColumnChange(e) {
      const {
        shownFieldName,
        subsetFieldName,
        multiArray,
        sourceData,
        steps,
        initColumnSelectedIndex
      } = this.data
      let { multiIndex } = this.data
      const { column, value: changeIndex } = e.detail

      // console.log(`修改了Picker的第${column}列(从0开始计算)，选中了第${changeIndex}个值(从0开始计算)`)

      // multiIndex变化了，所以也要同步更新multiArray
      multiIndex[column] = changeIndex

      if (initColumnSelectedIndex) {
        // 每次重置之后的index为0，但是有bug，待定。 => 经检查，是编辑器的问题，真机上是没有问题的。
        const _multiIndex = multiIndex.map((item, index) => {
          if (column >= index) {
            return item
          } else {
            return 0
          }
        })
        multiIndex = _multiIndex
      }

      const handle = (source = [], columnIndex = 0) => {
        // 当前遍历第 columnIndex 列
        source.forEach((item, index) => {
          if (index === multiIndex[columnIndex]) {
            if (columnIndex < steps - 1) {
              if (!item[subsetFieldName]) {
                item[subsetFieldName] = []
              }
              const multiArrayItem = item[subsetFieldName].map((sub) => sub[shownFieldName])
              // 从第1列开始，才有可能变化
              multiArray[columnIndex + 1] = multiArrayItem

              handle(item[subsetFieldName], columnIndex + 1)
            }
          }
        })
      }
      handle(sourceData)

      this.setData({
        multiArray,
        multiIndex,
      })
      this.triggerEvent('columnchange', e)
    },
    pickerCancel(e) {
      this.triggerEvent('cancel', e)
    },
    consoleError(...arg) {
      console.error(...arg)
      console.warn('参考文档：https://github.com/IceApriler/miniprogram-picker')
    }
  },
  attached() {
    if (this.data.autoSelect) {
      this.processData()
    }
  }
})
